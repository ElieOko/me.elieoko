<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="mark">EO</span>
        <div>
          <strong>Elie Oko</strong>
          <p>Ingénieur logiciel — Kinshasa</p>
        </div>
      </div>

      <nav class="footer-nav">
        <a href="#home">Accueil</a>
        <a href="#projects">Projets</a>
        <a href="#expertise">Expertise</a>
        <a href="#veille">Veille</a>
        <a href="#contact">Contact</a>
      </nav>

      <div class="footer-social">
        <a href="https://github.com/ElieOko" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="mailto:elieoko100@gmail.com" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
    <div class="container footer-copy">
      <p>&copy; {{ year }} Elie Oko. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #211c18;
  color: rgba(255, 250, 241, 0.72);
  padding: 3.4rem 0 1.6rem;
  margin-top: auto;
  border-top: 6px solid var(--accent);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.mark {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: var(--paper-elevated);
  color: var(--accent);
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 0.85rem;
  border-radius: 50%;
}

.footer-brand strong {
  display: block;
  color: var(--paper-elevated);
  font-family: var(--font-display);
  font-size: 1.08rem;
  letter-spacing: -0.04em;
}

.footer-brand p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}

.footer-nav {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-nav a {
  color: rgba(255, 250, 241, 0.72);
  font-size: 0.9rem;
  font-weight: 700;
}

.footer-nav a:hover {
  color: var(--paper-elevated);
}

.footer-social {
  display: flex;
  gap: 0.65rem;
}

.footer-social a {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 250, 241, 0.08);
  color: var(--paper-elevated);
  font-size: 1.1rem;
  transition: background 0.2s var(--ease);
}

.footer-social a:hover {
  background: var(--accent);
  color: #fff;
}

.footer-copy {
  padding-top: 1.25rem;
}

.footer-copy p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 250, 241, 0.45);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
