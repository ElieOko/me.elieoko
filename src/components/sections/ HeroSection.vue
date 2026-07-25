<template>
  <section id="home" class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="section-eyebrow reveal">Ingénieur logiciel · Soficom Transfert RDC</p>
        <h1 class="hero-brand reveal reveal-delay-1">Elie Oko</h1>
        <p class="hero-tagline reveal reveal-delay-2">
          Je conçois et déploie des applications web et mobiles fiables pour les
          entreprises — de la banque aux opérations métier. En reconversion vers
          le cloud et la cybersécurité.
        </p>
        <p class="hero-role reveal reveal-delay-2">
          Actuellement ingénieur logiciel chez
          <strong>Soficom Transfert RDC</strong>.
        </p>
        <div class="hero-cta reveal reveal-delay-3">
          <button class="btn btn-primary" @click="go('#projects')">
            Voir les projets
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
      </div>

      <div class="hero-visual reveal reveal-delay-2">
        <div class="photo-frame">
          <div class="photo-ring" aria-hidden="true"></div>
          <div class="photo-glow" aria-hidden="true"></div>
          <img
            src="@/assets/images/elie.jpeg"
            alt="Elie Oko"
            class="hero-photo"
          />
        </div>
      </div>
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 7rem 0 4rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(135deg, transparent 40%, rgba(26, 107, 92, 0.06) 100%),
    repeating-linear-gradient(
      -12deg,
      transparent,
      transparent 48px,
      rgba(12, 25, 41, 0.025) 48px,
      rgba(12, 25, 41, 0.025) 49px
    );
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3.5rem;
  align-items: center;
}

.hero-copy {
  max-width: 36rem;
}

.hero-brand {
  font-size: clamp(3.2rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 1.25rem;
  color: var(--ink);
}

.hero-tagline {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  line-height: 1.55;
  color: var(--muted);
  margin-bottom: 0.85rem;
}

.hero-role {
  font-size: 1rem;
  color: var(--ink-soft);
  margin-bottom: 2rem;
}

.hero-role strong {
  color: var(--accent);
  font-weight: 700;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.photo-frame {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.photo-ring {
  position: absolute;
  inset: -10px;
  border: 1.5px solid rgba(26, 107, 92, 0.35);
  border-radius: 8px;
  animation: ringPulse 4s ease-in-out infinite;
  pointer-events: none;
}

.photo-glow {
  position: absolute;
  inset: 12% 8%;
  background: radial-gradient(circle, rgba(26, 107, 92, 0.22), transparent 70%);
  filter: blur(28px);
  animation: glowBreathe 5s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

.hero-photo {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
  border-radius: 4px;
  box-shadow: var(--shadow);
  animation: photoFloat 6s ease-in-out infinite, photoIn 1s var(--ease) both;
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

@keyframes photoFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes ringPulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.015);
  }
}

@keyframes glowBreathe {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-photo,
  .photo-ring,
  .photo-glow {
    animation: photoIn 0.6s var(--ease) both;
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 6.5rem 0 3rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-visual {
    justify-content: center;
  }

  .photo-frame {
    max-width: 340px;
  }
}
</style>
