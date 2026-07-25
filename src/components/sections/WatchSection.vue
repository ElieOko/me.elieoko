<template>
  <section id="veille" class="section veille">
    <div class="container">
      <header class="veille-header">
        <p class="section-eyebrow">Veille technologique</p>
        <h2 class="section-title">Ce que je suis</h2>
        <p class="section-lead">
          Cloud natif, cybersécurité, conformité, souveraineté numérique,
          architecture et outils d’observabilité — une sélection de références
          que je consulte régulièrement.
        </p>
      </header>

      <div class="veille-groups">
        <div v-for="group in groups" :key="group.title" class="veille-group">
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="link in group.links" :key="link.url">
              <a :href="link.url" target="_blank" rel="noopener">
                <span class="link-title">{{ link.label }}</span>
                <span class="link-note">{{ link.note }}</span>
                <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface WatchLink {
  label: string
  url: string
  note: string
}

interface WatchGroup {
  title: string
  links: WatchLink[]
}

const groups: WatchGroup[] = [
  {
    title: 'Actualité & architecture',
    links: [
      {
        label: 'Hacker News',
        url: 'https://news.ycombinator.com/',
        note: 'Veille tech quotidienne',
      },
      {
        label: 'Martin Fowler',
        url: 'https://martinfowler.com/',
        note: 'Architecture, patterns, SOLID',
      },
      {
        label: 'roadmap.sh',
        url: 'https://roadmap.sh/',
        note: 'Parcours cloud, devops, sécurité',
      },
    ],
  },
  {
    title: 'Cloud natif & distributed',
    links: [
      {
        label: 'Kubernetes',
        url: 'https://kubernetes.io/',
        note: 'Orchestration & cloud native',
      },
      {
        label: 'Kubernetes the Hard Way',
        url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way',
        note: 'Kelsey Hightower — fondations K8s',
      },
      {
        label: 'CNCF — Kelsey Hightower',
        url: 'https://www.cncf.io/blog/2024/01/22/kubernetes-and-beyond-a-year-end-reflection-with-kelsey-hightower/',
        note: 'Cloud native & observabilité',
      },
      {
        label: 'Kotlin Multiplatform',
        url: 'https://kotlinlang.org/docs/multiplatform.html',
        note: 'Articles & docs KMP',
      },
      {
        label: 'Stéphane Robert — Blog',
        url: 'https://blog.stephane-robert.info/',
        note: 'DevOps, Linux, cloud, infra',
      },
    ],
  },
  {
    title: 'Cybersécurité & conformité',
    links: [
      {
        label: 'TryHackMe',
        url: 'https://tryhackme.com/',
        note: 'Labs cybersécurité',
      },
      {
        label: 'Mastermind Assurance',
        url: 'https://mastermindassurance.com/',
        note: 'Conformité & assurance',
      },
      {
        label: 'ISO/IEC 27001',
        url: 'https://www.iso.org/standard/27001',
        note: 'SMSI — sécurité de l’information',
      },
      {
        label: 'ISO/IEC 27002',
        url: 'https://www.iso.org/standard/75652.html',
        note: 'Contrôles de sécurité',
      },
      {
        label: 'ISO 20022',
        url: 'https://www.iso20022.org/',
        note: 'Messagerie financière',
      },
      {
        label: 'AICPA — SOC 1 & SOC 2',
        url: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2',
        note: 'Contrôles & rapports SOC',
      },
    ],
  },
  {
    title: 'Souveraineté, DevOps & observabilité',
    links: [
      {
        label: 'Souveraineté cloud (DINUM)',
        url: 'https://www.numerique.gouv.fr/cloud/',
        note: 'Doctrine cloud & souveraineté',
      },
      {
        label: 'OpenTelemetry',
        url: 'https://opentelemetry.io/',
        note: 'Traces, métriques, logs',
      },
      {
        label: 'Prometheus',
        url: 'https://prometheus.io/',
        note: 'Monitoring & alerting',
      },
      {
        label: 'Grafana',
        url: 'https://grafana.com/',
        note: 'Dashboards & visualisation',
      },
      {
        label: 'SOLID — principes',
        url: 'https://martinfowler.com/bliki/PrinciplesOfOOD.html',
        note: 'Bonnes pratiques conception',
      },
    ],
  },
]
</script>

<style scoped>
.veille {
  background: var(--paper);
}

.veille-header {
  margin-bottom: 3rem;
  max-width: 40rem;
}

.veille-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.veille-group h3 {
  font-size: 1.05rem;
  margin-bottom: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
}

.veille-group ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.veille-group a {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: var(--paper-elevated);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink);
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}

.veille-group a:hover {
  border-color: rgba(26, 107, 92, 0.4);
  box-shadow: var(--shadow);
  color: var(--ink);
}

.link-title {
  grid-column: 1;
  font-weight: 700;
  font-size: 0.95rem;
}

.link-note {
  grid-column: 1;
  font-size: 0.82rem;
  color: var(--muted);
}

.veille-group a i {
  grid-column: 2;
  grid-row: 1 / 3;
  align-self: center;
  font-size: 0.8rem;
  color: var(--accent);
  opacity: 0.7;
}

@media (max-width: 800px) {
  .veille-groups {
    grid-template-columns: 1fr;
  }
}
</style>
