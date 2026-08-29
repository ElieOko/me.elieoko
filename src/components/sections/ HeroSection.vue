<template>
  <section id="home" class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container hero-shell">
      <article class="hero-copy">
        <p class="section-eyebrow reveal">Ingénieur logiciel · Kinshasa</p>
        <h1 class="hero-brand reveal reveal-delay-1">
          Construire des logiciels utiles, fiables et faciles à faire évoluer.
        </h1>
        <p class="hero-tagline reveal reveal-delay-2">
          Je conçois et déploie des applications web, mobiles et systèmes métier
          pour les entreprises. Mon travail relie architecture, delivery et
          qualité produit, avec une progression active vers le cloud et la
          cybersécurité.
        </p>
        <dl class="hero-meta reveal reveal-delay-2">
          <div>
            <dt>Actuellement</dt>
            <dd>Ingénieur logiciel chez Soficom Transfert RDC</dd>
          </div>
          <div>
            <dt>Orientation</dt>
            <dd>Cloud, sécurité, systèmes distribués et conformité</dd>
          </div>
        </dl>
        <div class="hero-cta reveal reveal-delay-3">
          <button class="btn btn-primary" @click="go('#projects')">
            Lire les projets
            <i class="fas fa-arrow-right"></i>
          </button>
          <a
            class="btn btn-secondary"
            href="https://github.com/ElieOko"
            target="_blank"
            rel="noopener"
          >
            <i class="fab fa-github"></i>
            GitHub
          </a>
        </div>
      </article>

      <aside class="author-card reveal reveal-delay-2" aria-label="Profil d'Elie Oko">
        <div class="photo-frame">
          <img
            src="https://avatars.githubusercontent.com/u/109554173?v=4"
            alt="Elie Oko"
            class="hero-photo"
          />
          <p class="photo-caption">Elie Oko</p>
        </div>
        <div class="author-note">
          <span class="note-label">Note de terrain</span>
          <p>
            Des produits en production, des prototypes d’apprentissage et une
            veille continue sur l’architecture logicielle.
          </p>
        </div>
        <ul class="quick-links">
          <li><span>01</span> Applications web & mobile</li>
          <li><span>02</span> Backend, API & intégrations</li>
          <li><span>03</span> Déploiement et opérations</li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const go = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding: 8rem 0 5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(90deg, rgba(180, 55, 34, 0.09) 0, rgba(180, 55, 34, 0.09) 7px, transparent 7px),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 96px,
      rgba(55, 44, 35, 0.045) 96px,
      rgba(55, 44, 35, 0.045) 97px
    );
  background-size: 100% 100%, 100% 100%;
  opacity: 0.75;
}

.hero-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
  gap: clamp(2.5rem, 6vw, 5.5rem);
  align-items: center;
}

.hero-copy {
  max-width: 49rem;
}

.hero-brand {
  font-size: clamp(3.2rem, 8vw, 6.4rem);
  margin-bottom: 1.35rem;
  color: var(--ink);
}

.hero-tagline {
  max-width: 43rem;
  font-size: clamp(1.2rem, 2.3vw, 1.5rem);
  line-height: 1.58;
  color: var(--ink-soft);
  margin-bottom: 1.8rem;
}

.hero-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  max-width: 44rem;
  margin: 0 0 2.1rem;
}

.hero-meta div {
  border-top: 2px solid var(--line-strong);
  padding-top: 0.85rem;
}

.hero-meta dt {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  margin-bottom: 0.28rem;
  text-transform: uppercase;
}

.hero-meta dd {
  color: var(--ink);
  font-size: 1rem;
  line-height: 1.45;
  margin: 0;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.author-card {
  align-self: end;
  background: var(--paper-elevated);
  border: 1px solid var(--line-strong);
  box-shadow: var(--shadow);
  padding: 1rem;
}

.photo-frame {
  position: relative;
  border-bottom: 1px solid var(--line);
  padding-bottom: 0.95rem;
}

.hero-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.08;
  object-fit: cover;
  object-position: center top;
  filter: saturate(0.88) contrast(1.04);
  animation: photoIn 0.8s var(--ease) both;
}

.photo-caption {
  margin-top: 0.6rem;
  color: var(--muted);
  font-size: 0.83rem;
  font-style: italic;
}

.author-note {
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--line);
}

.note-label {
  display: block;
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  margin-bottom: 0.45rem;
  text-transform: uppercase;
}

.author-note p {
  color: var(--ink-soft);
  font-size: 1rem;
  line-height: 1.55;
}

.quick-links {
  list-style: none;
  display: grid;
  gap: 0.7rem;
  padding-top: 1rem;
}

.quick-links li {
  color: var(--ink);
  font-size: 0.92rem;
  font-weight: 700;
}

.quick-links span {
  color: var(--accent);
  display: inline-block;
  font-family: var(--font-display);
  font-size: 1.05rem;
  margin-right: 0.45rem;
}

@keyframes photoIn {
  from {
    opacity: 0;
    transform: scale(1.06) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-photo {
    animation: photoIn 0.6s var(--ease) both;
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 7rem 0 3.5rem;
  }

  .hero-shell {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .author-card {
    max-width: 390px;
  }

  .hero-meta {
    grid-template-columns: 1fr;
  }
}
</style>
