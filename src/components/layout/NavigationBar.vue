<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner container">
      <a href="#home" class="brand" @click.prevent="scrollTo('#home')">
        <span class="brand-name">Elie Oko</span>
        <span class="brand-subtitle">Software notes</span>
      </a>

      <div class="nav-links">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :class="{ active: active === link.href.slice(1) }"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="nav-actions">
        <a
          href="https://github.com/ElieOko"
          target="_blank"
          rel="noopener"
          class="github-link"
          aria-label="GitHub"
        >
          <i class="fab fa-github"></i>
        </a>
        <button class="nav-cta" @click="scrollTo('#contact')">
          Contact
        </button>
        <button
          class="menu-toggle"
          :class="{ open: menuOpen }"
          @click="menuOpen = !menuOpen"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div class="mobile-panel" :class="{ open: menuOpen }">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        @click.prevent="scrollTo(link.href)"
      >
        {{ link.label }}
      </a>
      <a href="https://github.com/ElieOko" target="_blank" rel="noopener">GitHub</a>
      <button class="nav-cta mobile-cta" @click="scrollTo('#contact')">Contact</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)
const active = ref('home')

const links = [
  { label: 'Accueil', href: '#home' },
  { label: 'Projets', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Veille', href: '#veille' },
  { label: 'Contact', href: '#contact' },
]

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  menuOpen.value = false
  active.value = href.slice(1)
}

const onScroll = () => {
  isScrolled.value = window.scrollY > 24
  const ids = links.map((l) => l.href.slice(1))
  const y = window.scrollY + 120
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
      active.value = id
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.95rem 0;
  background: rgba(255, 250, 241, 0.86);
  border-bottom: 1px solid rgba(55, 44, 35, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: background 0.3s var(--ease), box-shadow 0.3s var(--ease), padding 0.3s var(--ease);
}

.nav.scrolled {
  background: rgba(255, 250, 241, 0.95);
  box-shadow: 0 10px 28px rgba(65, 42, 24, 0.08);
  padding: 0.68rem 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.12rem;
  color: var(--ink);
  text-decoration: none;
}

.brand:hover {
  color: var(--ink);
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.18rem;
  letter-spacing: -0.05em;
  line-height: 1;
}

.brand-subtitle {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 1.45rem;
}

.nav-link {
  color: var(--muted);
  font-size: 0.91rem;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  padding: 0.25rem 0;
}

.nav-link:hover,
.nav-link.active {
  color: var(--ink);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.github-link {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--ink);
  font-size: 1.15rem;
  transition: background 0.2s var(--ease);
}

.github-link:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.nav-cta {
  border: 1.5px solid var(--accent);
  border-radius: 999px;
  background: transparent;
  color: var(--accent);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.86rem;
  font-weight: 800;
  padding: 0.48rem 1rem;
  transition: background 0.2s var(--ease), color 0.2s var(--ease), transform 0.2s var(--ease);
}

.nav-cta:hover {
  background: var(--accent);
  color: #fff;
  transform: translateY(-1px);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--ink);
  transition: transform 0.25s var(--ease), opacity 0.25s;
}

.menu-toggle.open span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.menu-toggle.open span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

.mobile-panel {
  display: none;
}

@media (max-width: 860px) {
  .nav-links,
  .nav-cta,
  .github-link {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.5rem 1.5rem;
    background: var(--paper-elevated);
    border-bottom: 1px solid var(--line);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.35s var(--ease), opacity 0.25s;
  }

  .mobile-panel.open {
    max-height: 360px;
    opacity: 1;
  }

  .mobile-panel a {
    padding: 0.85rem 0;
    color: var(--ink);
    font-weight: 700;
    border-bottom: 1px solid var(--line);
  }

  .mobile-cta {
    width: fit-content;
    margin-top: 0.75rem;
  }
}
</style>
