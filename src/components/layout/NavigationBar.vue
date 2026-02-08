<!-- src/components/NavigationBar.vue -->
<template>
  <nav class="navigation-bar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo" @click="scrollToTop">
        <div class="logo-icon animate-float">
          <span class="logo-letter">EO</span>
        </div>
        <div class="logo-text">
          <span class="logo-primary">Discover</span>
          <span class="logo-secondary">ElieOko</span>
        </div>
      </div>
      
      <!-- Navigation Links -->
      <div class="nav-links">
        <a 
          v-for="link in navLinks" 
          :key="link.id"
          :href="link.href"
          class="nav-link"
          @click.prevent="scrollToSection(link.href)"
          :class="{ active: activeSection === link.href.slice(1) }"
        >
          <span class="link-icon">
            <i :class="link.icon"></i>
          </span>
          <span class="link-text">{{ link.text }}</span>
          <span class="link-underline"></span>
        </a>
      </div>
      
      <!-- Actions -->
      <div class="nav-actions">
        <!-- Theme Toggle -->
        <!-- <button class="theme-toggle" @click="toggleTheme" title="Toggle theme">
          <div class="toggle-track">
            <div class="toggle-thumb" :class="{ 'light-mode': !isDark }">
              <i :class="themeIcon"></i>
            </div>
          </div>
        </button> -->
        
        <!-- Social Links -->
        <div class="social-links">
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.url"
            class="social-link"
            :title="social.name"
            target="_blank"
          >
            <i :class="social.icon"></i>
            <span class="social-tooltip">{{ social.name }}</span>
          </a>
        </div>
        
        <!-- Contact Button -->
        <button class="contact-button" @click="scrollToContact">
          <span class="button-text">Contact</span>
          <span class="button-icon">
            <i class="fas fa-paper-plane"></i>
          </span>
          <span class="button-glow"></span>
        </button>
        
        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-menu-toggle" 
          @click="toggleMobileMenu"
          :class="{ active: isMobileMenuOpen }"
        >
          <span class="menu-line"></span>
          <span class="menu-line"></span>
          <span class="menu-line"></span>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <div class="mobile-logo">ElieOko</div>
          <button class="mobile-close" @click="toggleMobileMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mobile-links">
          <a 
            v-for="link in navLinks" 
            :key="link.id"
            :href="link.href"
            class="mobile-link"
            @click.prevent="scrollToSection(link.href)"
          >
            <i :class="link.icon"></i>
            <span>{{ link.text }}</span>
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        
        <div class="mobile-social">
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.url"
            class="mobile-social-link"
            target="_blank"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Navigation Indicator -->
    <div class="nav-indicator" :style="indicatorStyle"></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface NavLink {
  id: string
  text: string
  href: string
  icon: string
}

interface SocialLink {
  name: string
  url: string
  icon: string
}

// State
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDark = ref(true)
const activeSection = ref('home')

// Data
const navLinks: NavLink[] = [
  { id: 'home', text: 'Home', href: '#home', icon: 'fas fa-home' },
  { id: 'expertise', text: 'Expertise', href: '#expertise', icon: 'fas fa-code' },
  // { id: 'projects', text: 'Projects', href: '#projects', icon: 'fas fa-rocket' },
  // { id: 'gallery', text: 'Gallery', href: '#gallery', icon: 'fas fa-images' },
  // { id: 'timeline', text: 'Timeline', href: '#timeline', icon: 'fas fa-history' },
  // { id: 'contact', text: 'Contact', href: '#contact', icon: 'fas fa-envelope' }
]

const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/ElieOko', icon: 'fab fa-github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin' },
  // { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
  // { name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
  // { name: 'StackOverflow', url: 'https://stackoverflow.com', icon: 'fab fa-stack-overflow' }
]

// Computed
const themeIcon = computed(() => 
  isDark.value ? 'fas fa-moon' : 'fas fa-sun'
)

const indicatorStyle = computed(() => {
  const index = navLinks.findIndex(link => link.href.slice(1) === activeSection.value)
  if (index === -1) return {}
  
  return {
    transform: `translateX(${index * 100}%)`
  }
})

// Methods
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMobileMenuOpen.value = false
  activeSection.value = sectionId.slice(1)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  activeSection.value = 'home'
}

const scrollToContact = () => {
  scrollToSection('#contact')
}

const updateActiveSection = () => {
  const sections = navLinks.map(link => link.href.slice(1))
  const scrollPosition = window.scrollY + 100
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const top = element.offsetTop
      const bottom = top + element.offsetHeight
      
      if (scrollPosition >= top && scrollPosition < bottom) {
        activeSection.value = section
        break
      }
    }
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Navigation Bar */
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.navigation-bar.scrolled {
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
}

.logo-letter {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-primary {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-secondary {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  color: #94a3b8;
  letter-spacing: 2px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #cbd5e1;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link.active {
  color: #00f3ff;
}

.link-icon {
  font-size: 0.875rem;
}

.link-text {
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  transition: width 0.3s ease;
}

.nav-link:hover .link-underline,
.nav-link.active .link-underline {
  width: 100%;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Theme Toggle */
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.toggle-track {
  width: 48px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.toggle-thumb.light-mode {
  transform: translateX(24px);
}

.toggle-thumb i {
  font-size: 0.75rem;
  color: white;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(0, 243, 255, 0.2);
  color: white;
  transform: translateY(-2px);
}

.social-link i {
  font-size: 0.875rem;
}

.social-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.social-link:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Contact Button */
.contact-button {
  position: relative;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.25rem;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 243, 255, 0.3);
}

.button-icon {
  font-size: 0.875rem;
}

.button-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: all 0.5s ease;
  opacity: 0;
}

.contact-button:hover .button-glow {
  opacity: 1;
  animation: glowSlide 1s ease;
}

@keyframes glowSlide {
  0% { transform: rotate(45deg) translateX(-100%); }
  100% { transform: rotate(45deg) translateX(100%); }
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-line {
  width: 24px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

.mobile-menu-toggle.active .menu-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active .menu-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active .menu-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  z-index: 9999;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu-content {
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mobile-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.mobile-link:hover {
  background: rgba(0, 243, 255, 0.2);
  transform: translateX(10px);
}

.mobile-link i:first-child {
  margin-right: 1rem;
}

.mobile-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-social-link {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.mobile-social-link:hover {
  background: rgba(0, 243, 255, 0.2);
  transform: translateY(-5px);
}

/* Navigation Indicator */
.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% / 6);
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-links {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .nav-links,
  .social-links,
  .theme-toggle,
  .contact-button {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-container {
    padding: 0 1rem;
  }
}
</style>