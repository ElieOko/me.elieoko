export interface SentryProject {
  id: string
  slug: string
  name: string
  platform?: string | null
  environments?: string[]
}

export interface SentryConfig {
  org: string
  apiBaseUrl: string
  projects: SentryProject[]
  environments: string[]
  defaultProjectSlug: string | null
  hasDsn: boolean
}

export interface SentryTimelinePoint {
  timestamp: string
  transactions: number
  errors: number
}

export interface SentryIssue {
  id: string
  shortId?: string
  title: string
  culprit?: string
  level?: string
  status?: string
  count: number
  userCount: number
  firstSeen?: string
  lastSeen?: string
  permalink?: string
}

export interface SentryRelease {
  version: string
  shortVersion: string
  dateCreated?: string
  dateReleased?: string
  lastEvent?: string
  newGroups?: number
  commitCount?: number
  url?: string
}

export interface SentrySummary {
  org: string
  period: SentryPeriod
  project: string
  environment: string
  projects: Pick<SentryProject, 'id' | 'slug' | 'name'>[]
  generatedAt: string
  metrics: {
    traffic: {
      transactions: number
      users: number
    }
    errors: {
      events: number
      issues: number
      affectedUsers: number
      rate: number | null
    }
    performance: {
      averageDurationMs: number
      p75DurationMs: number
      p95DurationMs: number
    }
  }
  timeline: SentryTimelinePoint[]
  issues: SentryIssue[]
  releases: SentryRelease[]
}

export type SentryPeriod = '24h' | '7d' | '14d' | '30d' | '90d'

export const sentryPeriods: Array<{ label: string; value: SentryPeriod }> = [
  { label: '24 heures', value: '24h' },
  { label: '7 jours', value: '7d' },
  { label: '14 jours', value: '14d' },
  { label: '30 jours', value: '30d' },
  { label: '90 jours', value: '90d' },
]

export interface SentrySummaryFilters {
  period: SentryPeriod
  project: string
  environment: string
}

export async function fetchSentryConfig(): Promise<SentryConfig> {
  return fetchJson<SentryConfig>('/api/sentry/config')
}

export async function fetchSentrySummary(filters: SentrySummaryFilters): Promise<SentrySummary> {
  const params = new URLSearchParams({
    period: filters.period,
    project: filters.project,
  })

  if (filters.environment) {
    params.set('environment', filters.environment)
  }

  return fetchJson<SentrySummary>(`/api/sentry/summary?${params.toString()}`)
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  const payload = await response.json()

  if (!response.ok) {
    const message =
      payload?.error?.message || payload?.detail || payload?.message || 'Impossible de joindre Sentry.'
    throw new Error(message)
  }

  return payload as T
}
