<template>
  <section id="expertise" class="section expertise">
    <div class="container editorial-grid">
      <aside class="section-aside">
        <span class="section-number">02</span>
        <p class="section-eyebrow">Compétences</p>
        <p>
          Les domaines que je pratique au quotidien et ceux que j’approfondis
          pour construire des systèmes plus durables.
        </p>
      </aside>

      <div class="expertise-content">
        <header class="expertise-header">
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
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <ul>
                <li v-for="tech in item.tech" :key="tech">{{ tech }}</li>
              </ul>
            </div>
          </div>
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
  margin-bottom: 2.7rem;
  max-width: 46rem;
}

.expertise-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border-top: 1px solid var(--line);
}

.expertise-item {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 1.25rem;
  padding: 1.45rem 0;
  border-bottom: 1px solid var(--line);
}

.expertise-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  background: var(--paper-elevated);
  border: 1px solid var(--line-strong);
  color: var(--accent);
  border-radius: 50%;
  font-size: 1.1rem;
}

.expertise-item h3 {
  font-size: 1.28rem;
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
  font-weight: 700;
  color: var(--ink-soft);
  border: 1px solid var(--line);
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 250, 241, 0.56);
}

@media (max-width: 700px) {
  .expertise-item {
    grid-template-columns: 1fr;
  }
}
</style>
