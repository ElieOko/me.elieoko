<template>
  <section id="projects" class="section projects">
    <div class="container">
      <header class="projects-header">
        <p class="section-eyebrow">En production</p>
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
          <div class="project-meta">
            <span class="project-type">{{ project.type }}</span>
            <span v-if="project.status" class="project-status">{{ project.status }}</span>
          </div>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
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
        <p>
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
  background: var(--paper-elevated);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.projects-header {
  margin-bottom: 3rem;
  max-width: 40rem;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.project {
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
  transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.project:hover {
  border-color: rgba(26, 107, 92, 0.35);
  box-shadow: var(--shadow);
}

.project.featured {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--accent-soft) 0%, var(--paper) 55%);
}

.project.featured .project-name {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.project.featured .project-desc {
  grid-column: 2;
  grid-row: 2 / 4;
  align-self: center;
  font-size: 1.05rem;
}

.project.featured .project-tags,
.project.featured .project-links {
  grid-column: 1;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.project-type {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.04em;
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
  border-radius: 4px;
}

.project-name {
  font-size: 1.35rem;
  margin: 0;
}

.project-desc {
  font-size: 0.98rem;
  line-height: 1.6;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-tags span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--ink-soft);
  background: var(--paper-elevated);
  border: 1px solid var(--line);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.25rem;
}

.projects-note {
  margin-top: 2.75rem;
  padding: 1.75rem;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.15rem;
}

.projects-note p {
  max-width: 38rem;
  margin: 0;
  font-size: 0.98rem;
}

@media (max-width: 768px) {
  .project-list {
    grid-template-columns: 1fr;
  }

  .project.featured {
    grid-template-columns: 1fr;
  }

  .project.featured .project-desc {
    grid-column: 1;
    grid-row: auto;
  }
}
</style>
