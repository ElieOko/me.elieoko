import { createServer } from 'node:http'
import { existsSync, createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')

const localEnvPath = join(rootDir, '.env')
if (typeof process.loadEnvFile === 'function' && existsSync(localEnvPath)) {
  process.loadEnvFile(localEnvPath)
}

const port = Number(process.env.PORT || 3000)
const sentryOrg = process.env.SENTRY_ORG
const configuredProjectSlug =
  process.env.SENTRY_PROJECT_SLUG || process.env.SENTRY_PROJECT_NAME || process.env.SENTRY_PROJECT
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN_SOMBA
const sentryDsn = process.env.SENTRY_DSN || process.env.SENTRY_DNS
const sentryApiBaseUrl = resolveSentryApiBaseUrl()

const allowedPeriods = new Map([
  ['24h', { statsPeriod: '24h', interval: '1h' }],
  ['7d', { statsPeriod: '7d', interval: '1d' }],
  ['14d', { statsPeriod: '14d', interval: '1d' }],
  ['30d', { statsPeriod: '30d', interval: '1d' }],
  ['90d', { statsPeriod: '90d', interval: '1w' }],
])

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
}

createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)

    if (requestUrl.pathname.startsWith('/api/sentry')) {
      await handleSentryApi(requestUrl, response)
      return
    }

    await serveStaticAsset(requestUrl.pathname, response)
  } catch (error) {
    const statusCode =
      error instanceof Error && Number.isInteger(error.statusCode) ? error.statusCode : 500

    sendJson(response, statusCode, {
      error: {
        code: statusCode === 400 ? 'invalid_request' : 'internal_server_error',
        message: error instanceof Error ? error.message : 'Unexpected server error.',
      },
    })
  }
}).listen(port, () => {
  console.log(`Portal server listening on http://localhost:${port}`)
})

async function handleSentryApi(requestUrl, response) {
  if (!sentryOrg || !sentryAuthToken) {
    sendJson(response, 500, {
      error: {
        code: 'missing_sentry_configuration',
        message:
          'Configure SENTRY_ORG and SENTRY_AUTH_TOKEN on the backend to load live Sentry data.',
      },
    })
    return
  }

  if (requestUrl.pathname === '/api/sentry/config') {
    const config = await getSentryConfig()
    sendJson(response, 200, config)
    return
  }

  if (requestUrl.pathname === '/api/sentry/summary') {
    const summary = await getSentrySummary(requestUrl.searchParams)
    sendJson(response, 200, summary)
    return
  }

  sendJson(response, 404, {
    error: {
      code: 'not_found',
      message: 'Unknown Sentry API route.',
    },
  })
}

async function getSentryConfig() {
  const projects = await fetchOrganizationProjects()
  const visibleProjects = configuredProjectSlug
    ? projects.filter((project) => project.slug === configuredProjectSlug)
    : projects

  if (configuredProjectSlug && visibleProjects.length === 0) {
    throw new Error(`Sentry project "${configuredProjectSlug}" was not found in organization "${sentryOrg}".`)
  }

  const projectIds = visibleProjects.map((project) => project.id)
  const environments = projectIds.length > 0 ? await fetchEnvironments(projectIds) : []

  return {
    org: sentryOrg,
    apiBaseUrl: sentryApiBaseUrl.replace(/\/api\/0\/?$/, ''),
    projects: visibleProjects.map((project) => ({
      id: project.id,
      slug: project.slug,
      name: project.name || project.slug,
      platform: project.platform || null,
      environments: uniqueSorted(
        environments
          .filter((environment) => hasProjectMatch(environment, project.id))
          .map((environment) => environment.name)
          .filter(Boolean),
      ),
    })),
    environments: uniqueSorted(environments.map((environment) => environment.name).filter(Boolean)),
    defaultProjectSlug: configuredProjectSlug || visibleProjects[0]?.slug || null,
    hasDsn: Boolean(sentryDsn),
  }
}

async function getSentrySummary(searchParams) {
  const period = searchParams.get('period') || '14d'
  const periodConfig = allowedPeriods.get(period)

  if (!periodConfig) {
    sendValidationError(`Unsupported period "${period}".`)
  }

  const projectSlug = searchParams.get('project') || configuredProjectSlug || ''
  const environment = searchParams.get('environment') || ''
  const projects = await fetchOrganizationProjects()
  const visibleProjects = configuredProjectSlug
    ? projects.filter((project) => project.slug === configuredProjectSlug)
    : projects
  const selectedProjects =
    projectSlug && projectSlug !== 'all'
      ? visibleProjects.filter((project) => project.slug === projectSlug)
      : visibleProjects

  if (projectSlug && projectSlug !== 'all' && selectedProjects.length === 0) {
    sendValidationError(`Sentry project "${projectSlug}" is not available.`)
  }

  if (selectedProjects.length === 0) {
    sendValidationError('No Sentry project is available for this backend configuration.')
  }

  const projectIds = selectedProjects.map((project) => project.id)
  const environments = environment ? [environment] : []

  const [
    trafficAggregate,
    errorAggregate,
    performanceAggregate,
    errorTimeline,
    trafficTimeline,
    issues,
    releases,
  ] = await Promise.all([
    discoverAggregate({
      projectIds,
      environments,
      statsPeriod: periodConfig.statsPeriod,
      query: 'event.type:transaction',
      fields: ['count()', 'count_unique(user)'],
    }),
    discoverAggregate({
      projectIds,
      environments,
      statsPeriod: periodConfig.statsPeriod,
      query: 'event.type:error',
      fields: ['count()', 'count_unique(user)', 'count_unique(issue)'],
    }),
    discoverAggregate({
      projectIds,
      environments,
      statsPeriod: periodConfig.statsPeriod,
      query: 'event.type:transaction',
      fields: [
        'avg(transaction.duration)',
        'p75(transaction.duration)',
        'p95(transaction.duration)',
      ],
    }),
    fetchEventsStats({
      projectIds,
      environments,
      statsPeriod: periodConfig.statsPeriod,
      interval: periodConfig.interval,
      query: 'event.type:error',
    }),
    fetchEventsStats({
      projectIds,
      environments,
      statsPeriod: periodConfig.statsPeriod,
      interval: periodConfig.interval,
      query: 'event.type:transaction',
    }),
    fetchIssues({ projectIds, environments, statsPeriod: periodConfig.statsPeriod }),
    fetchReleases({ projectIds, environments }),
  ])

  const transactions = numberFromAggregate(trafficAggregate, 'count()')
  const errors = numberFromAggregate(errorAggregate, 'count()')
  const affectedUsers = numberFromAggregate(errorAggregate, 'count_unique(user)')
  const transactionUsers = numberFromAggregate(trafficAggregate, 'count_unique(user)')
  const issueCount = numberFromAggregate(errorAggregate, 'count_unique(issue)')
  const errorRate = transactions + errors === 0 ? null : errors / (transactions + errors)

  return {
    org: sentryOrg,
    period,
    project: projectSlug || 'all',
    environment: environment || 'all',
    projects: selectedProjects.map((project) => ({
      id: project.id,
      slug: project.slug,
      name: project.name || project.slug,
    })),
    generatedAt: new Date().toISOString(),
    metrics: {
      traffic: {
        transactions,
        users: transactionUsers,
      },
      errors: {
        events: errors,
        issues: issueCount,
        affectedUsers,
        rate: errorRate,
      },
      performance: {
        averageDurationMs: numberFromAggregate(performanceAggregate, 'avg(transaction.duration)'),
        p75DurationMs: numberFromAggregate(performanceAggregate, 'p75(transaction.duration)'),
        p95DurationMs: numberFromAggregate(performanceAggregate, 'p95(transaction.duration)'),
      },
    },
    timeline: mergeTimeline(trafficTimeline, errorTimeline),
    issues: issues.map((issue) => ({
      id: issue.id,
      shortId: issue.shortId,
      title: issue.title,
      culprit: issue.culprit,
      level: issue.level,
      status: issue.status,
      count: toNumber(issue.count),
      userCount: toNumber(issue.userCount),
      firstSeen: issue.firstSeen,
      lastSeen: issue.lastSeen,
      permalink: issue.permalink,
    })),
    releases: releases.map((release) => ({
      version: release.version,
      shortVersion: release.shortVersion || release.version,
      dateCreated: release.dateCreated,
      dateReleased: release.dateReleased,
      lastEvent: release.lastEvent,
      newGroups: release.newGroups,
      commitCount: release.commitCount,
      url: release.url,
    })),
  }
}

async function fetchOrganizationProjects() {
  return fetchPaginated(`/organizations/${encodeURIComponent(sentryOrg)}/projects/`, {
    per_page: '100',
  })
}

async function fetchEnvironments(projectIds) {
  const params = { per_page: '100' }
  projectIds.forEach((id) => appendRepeatedParam(params, 'project', id))
  return fetchPaginated(`/organizations/${encodeURIComponent(sentryOrg)}/environments/`, params)
}

async function discoverAggregate({ projectIds, environments, statsPeriod, query, fields }) {
  const params = new URLSearchParams({
    query,
    statsPeriod,
    per_page: '1',
  })

  fields.forEach((field) => params.append('field', field))
  appendFilters(params, projectIds, environments)

  const payload = await sentryFetch(`/organizations/${encodeURIComponent(sentryOrg)}/events/`, params)
  return Array.isArray(payload.data) ? payload.data[0] || {} : {}
}

async function fetchEventsStats({ projectIds, environments, statsPeriod, interval, query }) {
  const params = new URLSearchParams({
    query,
    statsPeriod,
    interval,
    yAxis: 'count()',
  })

  appendFilters(params, projectIds, environments)

  const payload = await sentryFetch(
    `/organizations/${encodeURIComponent(sentryOrg)}/events/stats/`,
    params,
  )

  return normalizeStats(payload)
}

async function fetchIssues({ projectIds, environments, statsPeriod }) {
  const params = new URLSearchParams({
    query: 'is:unresolved',
    statsPeriod,
    per_page: '5',
    sort: 'freq',
  })

  appendFilters(params, projectIds, environments)

  return sentryFetch(`/organizations/${encodeURIComponent(sentryOrg)}/issues/`, params)
}

async function fetchReleases({ projectIds, environments }) {
  const params = new URLSearchParams({
    per_page: '5',
  })

  appendFilters(params, projectIds, environments)

  return sentryFetch(`/organizations/${encodeURIComponent(sentryOrg)}/releases/`, params)
}

async function fetchPaginated(pathname, initialParams) {
  const params = new URLSearchParams()
  Object.entries(initialParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry))
      return
    }
    params.set(key, value)
  })

  const results = []
  let cursor = null

  do {
    if (cursor) {
      params.set('cursor', cursor)
    }

    const { payload, linkHeader } = await sentryFetchWithHeaders(pathname, params)
    if (Array.isArray(payload)) {
      results.push(...payload)
    }

    cursor = getNextCursor(linkHeader)
  } while (cursor)

  return results
}

async function sentryFetch(pathname, params = new URLSearchParams()) {
  const { payload } = await sentryFetchWithHeaders(pathname, params)
  return payload
}

async function sentryFetchWithHeaders(pathname, params = new URLSearchParams()) {
  const url = new URL(`${sentryApiBaseUrl}${pathname}`)
  const normalizedParams =
    params instanceof URLSearchParams ? params : new URLSearchParams(Object.entries(params))

  normalizedParams.forEach((value, key) => url.searchParams.append(key, value))

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${sentryAuthToken}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    let message = `Sentry API returned ${response.status}.`
    try {
      const payload = await response.json()
      message = payload.detail || payload.error || payload.message || message
    } catch {
      message = await response.text()
    }
    throw new Error(message)
  }

  return {
    payload: await response.json(),
    linkHeader: response.headers.get('link'),
  }
}

function appendFilters(params, projectIds, environments) {
  projectIds.forEach((id) => params.append('project', id))
  environments.forEach((environment) => params.append('environment', environment))
}

function appendRepeatedParam(target, key, value) {
  if (!target[key]) {
    target[key] = []
  }
  target[key].push(value)
}

function normalizeStats(payload) {
  if (Array.isArray(payload?.timeSeries)) {
    const countSeries = payload.timeSeries.find((series) => series.yAxis === 'count()') || payload.timeSeries[0]

    return (countSeries?.values || []).map((point) => ({
      timestamp: toIsoTimestamp(point.timestamp),
      count: extractStatsCount(point.value),
    }))
  }

  const seriesPayload = payload?.['count()'] || payload
  const rawData = Array.isArray(seriesPayload?.data) ? seriesPayload.data : []

  return rawData.map((point) => {
    if (Array.isArray(point)) {
      const [timestamp, buckets] = point
      return {
        timestamp: toIsoTimestamp(timestamp),
        count: extractStatsCount(buckets),
      }
    }

    return {
      timestamp: toIsoTimestamp(point.timestamp || point.time || point.start),
      count: extractStatsCount(point),
    }
  })
}

function mergeTimeline(trafficTimeline, errorTimeline) {
  const byTimestamp = new Map()

  trafficTimeline.forEach((point) => {
    byTimestamp.set(point.timestamp, {
      timestamp: point.timestamp,
      transactions: point.count,
      errors: 0,
    })
  })

  errorTimeline.forEach((point) => {
    const existing = byTimestamp.get(point.timestamp) || {
      timestamp: point.timestamp,
      transactions: 0,
      errors: 0,
    }
    existing.errors = point.count
    byTimestamp.set(point.timestamp, existing)
  })

  return [...byTimestamp.values()].sort(
    (left, right) => new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime(),
  )
}

function extractStatsCount(value) {
  if (Array.isArray(value)) {
    return value.reduce((total, entry) => total + extractStatsCount(entry), 0)
  }

  if (!value || typeof value !== 'object') {
    return toNumber(value)
  }

  return toNumber(value.count ?? value['count()'] ?? value.value ?? value.sum ?? 0)
}

function numberFromAggregate(row, key) {
  return toNumber(row?.[key])
}

function toNumber(value) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

function toIsoTimestamp(timestamp) {
  if (typeof timestamp === 'number') {
    return new Date(timestamp * 1000).toISOString()
  }

  const parsed = new Date(timestamp)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

function hasProjectMatch(environment, projectId) {
  if (!Array.isArray(environment.projects) || environment.projects.length === 0) {
    return true
  }

  return environment.projects.some((project) => String(project.id) === String(projectId))
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

function getNextCursor(linkHeader) {
  if (!linkHeader) {
    return null
  }

  const nextLink = linkHeader
    .split(',')
    .map((part) => part.trim())
    .find((part) => part.includes('rel="next"') && part.includes('results="true"'))

  return nextLink?.match(/cursor="([^"]+)"/)?.[1] || null
}

function sendValidationError(message) {
  const error = new Error(message)
  error.statusCode = 400
  throw error
}

async function serveStaticAsset(pathname, response) {
  if (!existsSync(distDir)) {
    sendJson(response, 404, {
      error: {
        code: 'build_missing',
        message: 'Run npm run build before starting the production server.',
      },
    })
    return
  }

  const decodedPath = decodeURIComponent(pathname)
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '')
  const requestedPath = resolve(join(distDir, safePath))
  const filePath = requestedPath.startsWith(distDir) ? requestedPath : join(distDir, 'index.html')

  try {
    const fileStat = await stat(filePath)
    const resolvedFile = fileStat.isDirectory() ? join(filePath, 'index.html') : filePath
    createReadStream(resolvedFile)
      .on('error', async () => {
        await serveIndex(response)
      })
      .pipe(
        response.writeHead(200, {
          'Content-Type': mimeTypes[extname(resolvedFile)] || 'application/octet-stream',
        }),
      )
  } catch {
    await serveIndex(response)
  }
}

async function serveIndex(response) {
  const indexPath = join(distDir, 'index.html')
  try {
    const content = await readFile(indexPath)
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(content)
  } catch {
    sendJson(response, 404, {
      error: {
        code: 'index_missing',
        message: 'The production bundle is missing index.html.',
      },
    })
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(payload))
}

function resolveSentryApiBaseUrl() {
  if (process.env.SENTRY_API_BASE_URL) {
    return normalizeApiBaseUrl(process.env.SENTRY_API_BASE_URL)
  }

  if (sentryDsn) {
    try {
      const dsnUrl = new URL(sentryDsn)
      if (dsnUrl.hostname.includes('.de.sentry.io')) {
        return 'https://de.sentry.io/api/0'
      }
    } catch {
      // Ignore malformed DSNs here; SENTRY_API_BASE_URL can still be provided explicitly.
    }
  }

  return 'https://sentry.io/api/0'
}

function normalizeApiBaseUrl(value) {
  const trimmed = value.replace(/\/$/, '')
  return trimmed.endsWith('/api/0') ? trimmed : `${trimmed}/api/0`
}
