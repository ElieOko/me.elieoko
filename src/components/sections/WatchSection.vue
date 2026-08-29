<template>
  <section id="veille" class="section veille">
    <div class="container editorial-grid">
      <aside class="section-aside">
        <span class="section-number">03</span>
        <p class="section-eyebrow">Veille technologique</p>
        <p>
          Une bibliothèque personnelle pour rester proche des pratiques qui
          structurent le métier : architecture, delivery, sécurité et cloud.
        </p>
      </aside>

      <div class="veille-content">
        <header class="veille-header">
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
  background:
    linear-gradient(180deg, rgba(239, 228, 210, 0.7), rgba(247, 241, 231, 0.9)),
    var(--paper);
}

.veille-header {
  margin-bottom: 2.7rem;
  max-width: 48rem;
}

.veille-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.2rem 2.6rem;
}

.veille-group h3 {
  color: var(--accent);
  font-family: var(--font-body);
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
  text-transform: uppercase;
}

.veille-group ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--line);
}

.veille-group a {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  transition: color 0.2s var(--ease), padding-left 0.2s var(--ease);
}

.veille-group a:hover {
  color: var(--accent);
  padding-left: 0.3rem;
}

.link-title {
  grid-column: 1;
  font-weight: 700;
  font-size: 1rem;
}

.link-note {
  grid-column: 1;
  font-size: 0.86rem;
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
