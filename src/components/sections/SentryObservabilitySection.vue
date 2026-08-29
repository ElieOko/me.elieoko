<template>
  <section id="observability" class="section observability">
    <div class="container">
      <header class="observability-header">
        <div>
          <p class="section-eyebrow">Observabilité en production</p>
          <h2 class="section-title">Données Sentry en temps réel</h2>
          <p class="section-lead">
            Trafic, erreurs, performance, latence, utilisateurs affectés et releases
            sont chargés depuis l’API Sentry via le backend du portail.
          </p>
        </div>
        <div class="live-badge" :class="{ offline: statusLabel !== 'Connecté' }">
          <span class="pulse" aria-hidden="true"></span>
          {{ statusLabel }}
        </div>
      </header>

      <div class="observability-panel">
        <div class="filters" aria-label="Filtres Sentry">
          <label>
            <span>Période</span>
            <select v-model="selectedPeriod" :disabled="isLoadingConfig">
              <option v-for="period in sentryPeriods" :key="period.value" :value="period.value">
                {{ period.label }}
              </option>
            </select>
          </label>

          <label>
            <span>Projet</span>
            <select v-model="selectedProject" :disabled="isLoadingConfig || projectOptions.length === 0">
              <option v-if="projectOptions.length > 1" value="all">Tous les projets</option>
              <option v-for="project in projectOptions" :key="project.slug" :value="project.slug">
                {{ project.name }}
              </option>
            </select>
          </label>

          <label>
            <span>Environnement</span>
            <select v-model="selectedEnvironment" :disabled="isLoadingConfig || environmentOptions.length === 0">
              <option value="">Tous les environnements</option>
              <option v-for="environment in environmentOptions" :key="environment" :value="environment">
                {{ environment }}
              </option>
            </select>
          </label>

          <button class="btn btn-secondary refresh-button" :disabled="isLoading" @click="loadSummary">
            <i class="fas fa-rotate-right" :class="{ spinning: isLoading }" aria-hidden="true"></i>
            Actualiser
          </button>
        </div>

        <div v-if="errorMessage" class="state-message error-state" role="alert">
          <i class="fas fa-triangle-exclamation" aria-hidden="true"></i>
          <div>
            <strong>Connexion Sentry indisponible</strong>
            <p>{{ errorMessage }}</p>
          </div>
        </div>

        <div v-else-if="isLoadingConfig" class="state-message">
          <i class="fas fa-circle-notch spinning" aria-hidden="true"></i>
          Chargement de la configuration Sentry...
        </div>

        <div v-else-if="summary" class="observability-content" :aria-busy="isLoading">
          <div class="metrics-grid">
            <article class="metric-card accent">
              <span class="metric-label">Trafic</span>
              <strong>{{ formatCount(summary.metrics.traffic.transactions) }}</strong>
              <small>{{ formatCount(summary.metrics.traffic.users) }} utilisateurs uniques</small>
            </article>

            <article class="metric-card danger">
              <span class="metric-label">Erreurs</span>
              <strong>{{ formatCount(summary.metrics.errors.events) }}</strong>
              <small>{{ formatCount(summary.metrics.errors.issues) }} issues distinctes</small>
            </article>

            <article class="metric-card">
              <span class="metric-label">Taux d’erreur</span>
              <strong>{{ formatErrorRate(summary.metrics.errors.rate) }}</strong>
              <small>Calculé sur erreurs + transactions Sentry</small>
            </article>

            <article class="metric-card">
              <span class="metric-label">Performance p75</span>
              <strong>{{ formatDuration(summary.metrics.performance.p75DurationMs) }}</strong>
              <small>p95 {{ formatDuration(summary.metrics.performance.p95DurationMs) }}</small>
            </article>

            <article class="metric-card">
              <span class="metric-label">Latence moyenne</span>
              <strong>{{ formatDuration(summary.metrics.performance.averageDurationMs) }}</strong>
              <small>Transactions instrumentées</small>
            </article>

            <article class="metric-card danger-soft">
              <span class="metric-label">Utilisateurs affectés</span>
              <strong>{{ formatCount(summary.metrics.errors.affectedUsers) }}</strong>
              <small>Utilisateurs uniques touchés par des erreurs</small>
            </article>
          </div>

          <div class="insights-grid">
            <article class="insight-card timeline-card">
              <div class="card-heading">
                <div>
                  <span class="metric-label">Évolution</span>
                  <h3>Trafic et erreurs</h3>
                </div>
                <small>{{ selectedPeriodLabel }}</small>
              </div>

              <div v-if="summary.timeline.length" class="timeline-chart">
                <div
                  v-for="point in summary.timeline"
                  :key="point.timestamp"
                  class="timeline-point"
                  :title="`${formatDate(point.timestamp)} · ${point.transactions} transactions · ${point.errors} erreurs`"
                >
                  <div class="bars">
                    <span
                      class="bar traffic-bar"
                      :style="{ height: chartHeight(point.transactions) }"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="bar error-bar"
                      :style="{ height: chartHeight(point.errors) }"
                      aria-hidden="true"
                    ></span>
                  </div>
                  <span class="tick-label">{{ formatTick(point.timestamp) }}</span>
                </div>
              </div>
              <p v-else class="empty-copy">Aucun point de série retourné par Sentry pour ce filtre.</p>

              <div class="legend">
                <span><i class="traffic-dot"></i>Transactions</span>
                <span><i class="error-dot"></i>Erreurs</span>
              </div>
            </article>

            <article class="insight-card">
              <div class="card-heading">
                <div>
                  <span class="metric-label">Issues</span>
                  <h3>Erreurs actives</h3>
                </div>
                <small>{{ formatCount(summary.issues.length) }} lignes</small>
              </div>

              <ul v-if="summary.issues.length" class="issue-list">
                <li v-for="issue in summary.issues" :key="issue.id">
                  <a v-if="issue.permalink" :href="issue.permalink" target="_blank" rel="noopener">
                    {{ issue.shortId || issue.id }}
                  </a>
                  <strong v-else>{{ issue.shortId || issue.id }}</strong>
                  <p>{{ issue.title }}</p>
                  <span>{{ formatCount(issue.count) }} occurrences · {{ formatCount(issue.userCount) }} users</span>
                </li>
              </ul>
              <p v-else class="empty-copy">Aucune issue non résolue retournée par Sentry.</p>
            </article>

            <article class="insight-card">
              <div class="card-heading">
                <div>
                  <span class="metric-label">Releases</span>
                  <h3>Déploiements récents</h3>
                </div>
                <small>{{ formatCount(summary.releases.length) }} releases</small>
              </div>

              <ul v-if="summary.releases.length" class="release-list">
                <li v-for="release in summary.releases" :key="release.version">
                  <div>
                    <strong>{{ release.shortVersion || release.version }}</strong>
                    <span>{{ formatReleaseDate(release) }}</span>
                  </div>
                  <small>
                    {{ formatCount(release.newGroups || 0) }} nouvelles issues ·
                    {{ formatCount(release.commitCount || 0) }} commits
                  </small>
                </li>
              </ul>
              <p v-else class="empty-copy">Aucune release retournée par Sentry pour ce filtre.</p>
            </article>
          </div>

          <footer class="observability-footer">
            <span>
              Projet :
              <strong>{{ activeProjectLabel }}</strong>
            </span>
            <span>
              Environnement :
              <strong>{{ selectedEnvironment || 'Tous' }}</strong>
            </span>
            <span>
              Dernière synchronisation :
              <strong>{{ formatDate(summary.generatedAt) }}</strong>
            </span>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  fetchSentryConfig,
  fetchSentrySummary,
  sentryPeriods,
  type SentryConfig,
  type SentryPeriod,
  type SentryRelease,
  type SentrySummary,
} from '@/services/sentryObservability'

const config = ref<SentryConfig | null>(null)
const summary = ref<SentrySummary | null>(null)
const selectedPeriod = ref<SentryPeriod>('14d')
const selectedProject = ref('all')
const selectedEnvironment = ref('')
const isLoadingConfig = ref(true)
const isLoading = ref(false)
const errorMessage = ref('')

const projectOptions = computed(() => config.value?.projects || [])
const environmentOptions = computed(() => {
  if (!config.value) {
    return []
  }

  if (selectedProject.value === 'all') {
    return config.value.environments
  }

  return (
    config.value.projects.find((project) => project.slug === selectedProject.value)?.environments ||
    config.value.environments
  )
})

const selectedPeriodLabel = computed(
  () => sentryPeriods.find((period) => period.value === selectedPeriod.value)?.label || selectedPeriod.value,
)

const statusLabel = computed(() => {
  if (errorMessage.value) {
    return 'À configurer'
  }

  if (isLoading.value || isLoadingConfig.value) {
    return 'Synchronisation'
  }

  return summary.value ? 'Connecté' : 'En attente'
})

const activeProjectLabel = computed(() => {
  if (selectedProject.value === 'all') {
    return 'Tous les projets'
  }

  return projectOptions.value.find((project) => project.slug === selectedProject.value)?.name || selectedProject.value
})

const chartMax = computed(() => {
  if (!summary.value?.timeline.length) {
    return 0
  }

  return Math.max(
    ...summary.value.timeline.flatMap((point) => [point.transactions, point.errors]),
  )
})

onMounted(async () => {
  await loadConfig()
})

watch([selectedPeriod, selectedProject, selectedEnvironment], () => {
  if (!config.value || isLoadingConfig.value) {
    return
  }

  void loadSummary()
})

watch(environmentOptions, (options) => {
  if (selectedEnvironment.value && !options.includes(selectedEnvironment.value)) {
    selectedEnvironment.value = ''
  }
})

async function loadConfig() {
  isLoadingConfig.value = true
  errorMessage.value = ''

  try {
    config.value = await fetchSentryConfig()
    selectedProject.value = config.value.defaultProjectSlug || (config.value.projects.length > 1 ? 'all' : config.value.projects[0]?.slug || 'all')
    await loadSummary()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Configuration Sentry indisponible.'
  } finally {
    isLoadingConfig.value = false
  }
}

async function loadSummary() {
  if (!config.value) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    summary.value = await fetchSentrySummary({
      period: selectedPeriod.value,
      project: selectedProject.value,
      environment: selectedEnvironment.value,
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Impossible de charger les métriques Sentry.'
  } finally {
    isLoading.value = false
  }
}

function chartHeight(value: number) {
  if (chartMax.value <= 0 || value <= 0) {
    return '0%'
  }

  return `${Math.max(4, Math.round((value / chartMax.value) * 100))}%`
}

function formatCount(value: number) {
  return new Intl.NumberFormat('fr-FR').format(value || 0)
}

function formatErrorRate(value: number | null) {
  if (value === null) {
    return 'Aucune donnée'
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDuration(value: number) {
  if (!summary.value?.metrics.traffic.transactions) {
    return 'Aucune transaction'
  }

  if (value >= 1000) {
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value / 1000)} s`
  }

  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)} ms`
}

function formatDate(value?: string) {
  if (!value) {
    return 'Non renseigné'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatTick(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(value))
}

function formatReleaseDate(release: SentryRelease) {
  return formatDate(release.dateReleased || release.lastEvent || release.dateCreated)
}
</script>

<style scoped>
.observability {
  background:
    radial-gradient(circle at 20% 0%, rgba(26, 107, 92, 0.13), transparent 28%),
    linear-gradient(180deg, var(--paper) 0%, #e8edf2 100%);
  border-bottom: 1px solid var(--line);
}

.observability-header {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: rgba(26, 107, 92, 0.1);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.live-badge.offline {
  background: rgba(196, 92, 38, 0.12);
  color: var(--accent-warm);
}

.pulse {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 0 rgba(26, 107, 92, 0.42);
  animation: pulse 1.8s infinite;
}

.observability-panel {
  padding: 1.25rem;
  border: 1px solid rgba(12, 25, 41, 0.08);
  border-radius: calc(var(--radius) + 8px);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  gap: 0.9rem;
  align-items: end;
  margin-bottom: 1.25rem;
}

.filters label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filters select {
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper-elevated);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  text-transform: none;
  padding: 0.65rem 0.75rem;
}

.refresh-button {
  min-height: 44px;
  padding: 0.7rem 1rem;
  background: var(--paper-elevated);
}

.state-message {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
  background: var(--paper-elevated);
  color: var(--muted);
}

.state-message strong {
  display: block;
  color: var(--ink);
  margin-bottom: 0.15rem;
}

.error-state {
  border-color: rgba(196, 92, 38, 0.35);
  background: rgba(196, 92, 38, 0.08);
  color: var(--accent-warm);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.metric-card,
.insight-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper-elevated);
}

.metric-card {
  position: relative;
  overflow: hidden;
  padding: 1.25rem;
}

.metric-card::after {
  content: '';
  position: absolute;
  inset: auto 1rem 0;
  height: 3px;
  border-radius: 999px 999px 0 0;
  background: var(--line);
}

.metric-card.accent::after {
  background: var(--accent);
}

.metric-card.danger::after,
.metric-card.danger-soft::after {
  background: var(--accent-warm);
}

.metric-label {
  display: block;
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.metric-card strong {
  display: block;
  margin: 0.4rem 0 0.25rem;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 3vw, 2.25rem);
  line-height: 1;
}

.metric-card small,
.card-heading small,
.observability-footer,
.release-list small,
.issue-list span {
  color: var(--muted);
  font-size: 0.86rem;
}

.insights-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.insight-card {
  padding: 1.25rem;
}

.timeline-card {
  grid-row: span 2;
}

.card-heading {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-heading h3 {
  margin-top: 0.2rem;
  font-size: 1.15rem;
}

.timeline-chart {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(18px, 1fr);
  align-items: end;
  gap: 0.45rem;
  min-height: 260px;
  padding: 0.75rem 0 0.25rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  overflow-x: auto;
}

.timeline-point {
  min-width: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.45rem;
}

.bars {
  height: 210px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
}

.bar {
  width: 8px;
  border-radius: 999px 999px 0 0;
  transition: height 0.35s var(--ease);
}

.traffic-bar {
  background: linear-gradient(180deg, var(--accent), rgba(26, 107, 92, 0.22));
}

.error-bar {
  background: linear-gradient(180deg, var(--accent-warm), rgba(196, 92, 38, 0.22));
}

.tick-label {
  color: var(--muted);
  font-size: 0.68rem;
  text-align: center;
  transform: rotate(-35deg);
  transform-origin: center top;
  white-space: nowrap;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  color: var(--muted);
  font-size: 0.86rem;
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.traffic-dot,
.error-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
}

.traffic-dot {
  background: var(--accent);
}

.error-dot {
  background: var(--accent-warm);
}

.issue-list,
.release-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.issue-list li,
.release-list li {
  padding: 0.85rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
}

.issue-list a,
.issue-list strong {
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 800;
}

.issue-list p {
  margin: 0.15rem 0 0.25rem;
  color: var(--ink);
  font-weight: 700;
  line-height: 1.35;
}

.release-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.release-list strong {
  display: block;
  color: var(--ink);
  word-break: break-word;
}

.release-list span {
  color: var(--muted);
  font-size: 0.82rem;
}

.empty-copy {
  color: var(--muted);
  padding: 1rem;
  border: 1px dashed var(--line);
  border-radius: 10px;
  background: var(--paper);
}

.observability-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.observability-footer strong {
  color: var(--ink);
}

.spinning {
  animation: spin 0.9s linear infinite;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 8px rgba(26, 107, 92, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 107, 92, 0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 980px) {
  .observability-header,
  .card-heading,
  .release-list li {
    flex-direction: column;
  }

  .filters,
  .metrics-grid,
  .insights-grid {
    grid-template-columns: 1fr;
  }

  .timeline-card {
    grid-row: auto;
  }
}
</style>
