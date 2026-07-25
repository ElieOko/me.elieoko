<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner container">
      <a href="#home" class="brand" @click.prevent="scrollTo('#home')">
        <span class="brand-mark">EO</span>
        <span class="brand-name">Elie Oko</span>
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
        <button class="btn btn-primary nav-cta" @click="scrollTo('#contact')">
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
      <button class="btn btn-primary" @click="scrollTo('#contact')">Contact</button>
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
  padding: 1.1rem 0;
  transition: background 0.3s var(--ease), box-shadow 0.3s var(--ease), padding 0.3s var(--ease);
}

.nav.scrolled {
  background: rgba(243, 245, 248, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--line);
  padding: 0.7rem 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--ink);
  text-decoration: none;
}

.brand:hover {
  color: var(--ink);
}

.brand-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 8px;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 1.75rem;
}

.nav-link {
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 500;
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
  bottom: -2px;
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
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: var(--ink);
  font-size: 1.15rem;
  transition: background 0.2s var(--ease);
}

.github-link:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.nav-cta {
  padding: 0.6rem 1.15rem;
  font-size: 0.9rem;
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
    font-weight: 600;
    border-bottom: 1px solid var(--line);
  }

  .mobile-panel .btn {
    margin-top: 0.75rem;
  }
}
</style>
