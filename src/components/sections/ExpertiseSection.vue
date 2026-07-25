<template>
  <section id="expertise" class="section expertise">
    <div class="container">
      <header class="expertise-header">
        <p class="section-eyebrow">Compétences</p>
        <h2 class="section-title">Ce que je construis</h2>
        <p class="section-lead">
          Développement, déploiement et opérations — avec une montée en
          compétences active vers le cloud et la cybersécurité.
        </p>
      </header>

      <div class="expertise-grid">
        <div v-for="item in areas" :key="item.title" class="expertise-item">
          <div class="expertise-icon" aria-hidden="true">
            <i :class="item.icon"></i>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <ul>
            <li v-for="tech in item.tech" :key="tech">{{ tech }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const areas = [
  {
    title: 'Backend & API',
    icon: 'fas fa-server',
    description:
      'APIs robustes, sécurité et intégrations pour des flux métier critiques.',
    tech: ['Spring Boot', 'Laravel', 'Node.js', 'Kotlin'],
  },
  {
    title: 'Applications web & mobile',
    icon: 'fas fa-mobile-screen-button',
    description:
      'Interfaces claires et apps natives pour back-offices, SaaS et usage terrain.',
    tech: ['Vue 3', 'TypeScript', 'Jetpack Compose', 'KMP'],
  },
  {
    title: 'Déploiement & ops',
    icon: 'fas fa-cloud',
    description:
      'Mise en production sur Linux et IIS Windows : serveurs, reverse proxy, CI et supervision.',
    tech: ['Linux', 'IIS', 'Docker', 'Nginx'],
  },
  {
    title: 'Cloud & cybersécurité',
    icon: 'fas fa-shield-halved',
    description:
      'En reconversion : cloud natif, durcissement, conformité et bonnes pratiques de sécurité.',
    tech: ['Cloud', 'SOC / ISO', 'K8s', 'TryHackMe'],
  },
]
</script>

<style scoped>
.expertise-header {
  margin-bottom: 3rem;
  max-width: 36rem;
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.expertise-item {
  padding: 1.75rem 1.5rem;
  border-top: 3px solid var(--accent);
  background: var(--paper-elevated);
  border-radius: 0 0 var(--radius) var(--radius);
  box-shadow: var(--shadow);
}

.expertise-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: 8px;
  margin-bottom: 1.15rem;
  font-size: 1.1rem;
}

.expertise-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}

.expertise-item p {
  font-size: 0.98rem;
  margin-bottom: 1.15rem;
  line-height: 1.55;
}

.expertise-item ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.expertise-item li {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--ink-soft);
  border: 1px solid var(--line);
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
}

@media (max-width: 700px) {
  .expertise-grid {
    grid-template-columns: 1fr;
  }
}
</style>
