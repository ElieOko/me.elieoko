<template>
  <section id="projects" class="section projects">
    <div class="container editorial-grid">
      <aside class="section-aside">
        <span class="section-number">01</span>
        <p class="section-eyebrow">En production</p>
        <p>
          Une sélection de produits utilisés au quotidien, présentés comme des
          notes de terrain plutôt que comme de simples vignettes.
        </p>
      </aside>

      <div class="projects-content">
        <header class="projects-header">
          <h2 class="section-title">Projets livrés</h2>
          <p class="section-lead">
            Produits utilisés au quotidien. Mon dépôt GitHub contient aussi de
            nombreux projets expérimentaux et d’apprentissage — comme la conception
            d’une API Gateway avec Node.js / Express.
          </p>
        </header>

        <div class="project-list">
          <article
            v-for="(project, index) in projects"
            :key="project.id"
            class="project"
            :class="{ featured: index === 0 }"
          >
            <div class="project-index">0{{ index + 1 }}</div>
            <div class="project-body">
              <div class="project-meta">
                <span class="project-type">{{ project.type }}</span>
                <span v-if="project.status" class="project-status">{{ project.status }}</span>
              </div>
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-desc">{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div v-if="project.live" class="project-links">
              <a
                :href="project.live"
                target="_blank"
                rel="noopener"
                class="btn btn-ghost"
              >
                Visiter le site <i class="fas fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </article>
        </div>

        <div class="projects-note">
        <p class="section-lead">
          D’autres réalisations (MCoreSystem, KCoreSystem, prototypes et labs)
          complètent mon parcours — certains en production, d’autres à titre
          expérimental ou pédagogique.
        </p>
        <a
          href="https://github.com/ElieOko"
          target="_blank"
          rel="noopener"
          class="btn btn-secondary"
        >
          <i class="fab fa-github"></i>
          Explorer mon référentiel GitHub
        </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Project {
  id: string
  name: string
  type: string
  status?: string
  description: string
  tags: string[]
  live?: string
}

const projects: Project[] = [
  {
    id: 'barua',
    name: 'Barua',
    type: 'Application mobile & plateforme',
    status: 'Prod',
    description:
      'Solution de messagerie et de communication déployée en production — expérience native et services associés.',
    tags: ['Mobile', 'Kotlin', 'Production'],
    live: 'https://baruaofficiel.com/',
  },
  {
    id: 'casanayo',
    name: 'CasaNayo',
    type: 'Plateforme web',
    status: 'Prod',
    description:
      'Écosystème immobilier en ligne : gestion, échanges et services métier pour les utilisateurs et opérateurs.',
    tags: ['Web', 'API', 'Production'],
    live: 'https://casanayo.com/',
  },
  {
    id: 'sololananga',
    name: 'Solola Na Nga',
    type: 'Plateforme & back-office',
    status: 'Prod',
    description:
      'Plateforme organisationnelle avec administration, chatbot et statistiques — suivi et pilotage opérationnel.',
    tags: ['Admin', 'Analytics', 'Production'],
    live: 'https://sololananga.org/',
  },
  {
    id: 'mcoresystem',
    name: 'MCoreSystem',
    type: 'Application mobile',
    status: 'Prod',
    description:
      'Application mobile cœur de système pour les opérations métier — architecture Kotlin native, pensée pour la fiabilité.',
    tags: ['Kotlin', 'Android', 'Mobile'],
  },
]
</script>

<style scoped>
.projects {
  background: linear-gradient(180deg, var(--paper-elevated), #fff6e9);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.projects-header {
  margin-bottom: 2.5rem;
  max-width: 48rem;
}

.project-list {
  display: grid;
  gap: 1rem;
}

.project {
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  gap: 1.4rem;
  align-items: start;
  padding: 1.55rem 0;
  border-top: 1px solid var(--line);
  transition: border-color 0.25s var(--ease), transform 0.25s var(--ease);
}

.project:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}

.project.featured {
  grid-template-columns: 4rem 1fr minmax(120px, auto);
  padding: 2rem 1.4rem;
  background: var(--paper);
  border: 1px solid var(--line-strong);
  box-shadow: var(--shadow);
}

.project.featured .project-name {
  font-size: clamp(1.7rem, 3vw, 2.25rem);
}

.project.featured .project-desc {
  font-size: 1.05rem;
}

.project-index {
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.project-type {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-status {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.project-name {
  font-size: 1.48rem;
  margin: 0;
}

.project-desc {
  font-size: 0.98rem;
  line-height: 1.6;
  max-width: 46rem;
  margin-top: 0.55rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.9rem;
}

.project-tags span {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--ink-soft);
  background: rgba(255, 250, 241, 0.68);
  border: 1px solid var(--line);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 0.45rem;
}

.projects-note {
  margin-top: 2.2rem;
  padding: 1.6rem 1.8rem;
  border-left: 4px solid var(--accent);
  background: var(--paper);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.15rem;
}

.projects-note p {
  max-width: 38rem;
  margin: 0;
  font-size: 0.98rem;
}

@media (max-width: 768px) {
  .project,
  .project.featured {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }

  .project-links {
    justify-content: flex-start;
  }

  .projects-note {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
