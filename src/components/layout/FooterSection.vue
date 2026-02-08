<!-- src/components/FooterSection.vue -->
<template>
  <footer class="footer-section">
    <!-- Waves Effect -->
    <div class="footer-waves">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
    
    <!-- Main Footer -->
    <div class="footer-main">
      <div class="footer-container">
        <!-- Top Section -->
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              
                <div class="profile-section">
                <div class="profile-image">
                  <div class="image-placeholder">
                    <i class="fas fa-user-astronaut"></i>
                  </div>
                  <div class="profile-status">
                    <span class="status-dot"></span>
                    <span>Available</span>
                  </div>
                </div>
                
                <div class="profile-info">
                  <h3 class="profile-name">Elie Oko</h3>
                  <p class="profile-title">Software Engineer</p>
                </div>
              </div>
            </div>
            <p class="brand-description">
              <!-- Crafting extraordinary digital experiences through innovative technology and elegant design. -->
            </p>
          </div>
          
          <!-- <div class="footer-newsletter">
            <h3 class="newsletter-title">Stay Updated</h3>
            <p class="newsletter-description">
              Subscribe for tech insights and project updates.
            </p>
            <div class="newsletter-form">
              <input 
                type="email" 
                placeholder="your.email@domain.com"
                class="newsletter-input"
                v-model="email"
              />
              <button class="newsletter-button" @click="subscribe">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div> -->
        </div>
        
        <!-- Middle Section -->
        <div class="footer-middle">
          <!-- Quick Links -->
          <div class="footer-column">
            <h3 class="column-title">Quick Links</h3>
            <ul class="footer-links">
              <li v-for="link in quickLinks" :key="link.id">
                <a :href="link.href" class="footer-link">
                  <i class="fas fa-chevron-right"></i>
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Services -->
          <div class="footer-column">
            <h3 class="column-title">Services</h3>
            <ul class="footer-links">
              <li v-for="service in services" :key="service.id">
                <a :href="service.href" class="footer-link">
                  <i class="fas fa-cog"></i>
                  {{ service.text }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Tech Stack -->
          <div class="footer-column">
            <h3 class="column-title">Tech Stack</h3>
            <div class="tech-stack">
              <span 
                v-for="tech in techStack" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <!-- Contact Info -->
          <div class="footer-column">
            <h3 class="column-title">Get In Touch</h3>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>{{ contact.email }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>{{ contact.phone }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ contact.location }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom Section -->
        <div class="footer-bottom">
          <!-- Social Links -->
          <div class="footer-social">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              class="social-link"
              :title="social.name"
              target="_blank"
            >
              <div class="social-icon" :style="socialStyle(social)">
                <i :class="social.icon"></i>
              </div>
              <span class="social-name">{{ social.name }}</span>
            </a>
          </div>
          
          <!-- Copyright -->
          <div class="footer-copyright">
            <p>&copy; {{ currentYear }} ElieOko. All rights reserved.</p>
            <!-- <div class="footer-legal">
              <a href="#" class="legal-link">Privacy Policy</a>
              <span class="divider">•</span>
              <a href="#" class="legal-link">Terms of Service</a>
              <span class="divider">•</span>
              <a href="#" class="legal-link">Cookies</a>
            </div> -->
          </div>
          
          <!-- Back to Top -->
          <button class="back-to-top" @click="scrollToTop">
            <i class="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
}

interface Link {
  id: string
  text: string
  href: string
}

// State
const email = ref('')

const contact = {
    phone: "+243827824163",
    email: "elieoko100@gmail.com",
    location:"Kinshasa, DRC"
    
}
// Data
const quickLinks: Link[] = [
  { id: 'home', text: 'Home', href: '#home' },
  { id: 'about', text: 'About', href: '#about' },
  // { id: 'projects', text: 'Projects', href: '#projects' },
  // { id: 'gallery', text: 'Gallery', href: '#gallery' },
  // { id: 'blog', text: 'Blog', href: '#blog' },
  { id: 'contact', text: 'Contact', href: '#contact' }
]

const services: Link[] = [
  { id: 'web-dev', text: 'Web Development', href: '#web' },
  { id: 'mobile', text: 'Mobile Apps', href: '#mobile' },
  // { id: 'cloud', text: 'Cloud Architecture', href: '#cloud' },
  { id: 'devops', text: 'DevOps', href: '#devops' },
  { id: 'consulting', text: 'Tech Consulting', href: '#consulting' },
  // { id: 'training', text: 'Team Training', href: '#training' }
]

const techStack = [
  'Vue', 'TypeScript','Node.js', 'Python', 'Rust', 'Docker',
  'Jetpack Compose', 'Laravel', 'Kotlin', 'Django',
  'Java', 'Spring Boot', 'Trace Compass'
]

// ... suite du script précédent

const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/ElieOko', icon: 'fab fa-github', color: '#333' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter', color: '#1DA1F2' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin', color: '#0077B5' },
  { name: 'Discord', url: 'https://discord.com', icon: 'fab fa-discord', color: '#5865F2' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube', color: '#FF0000' },
  { name: 'Dev.to', url: 'https://dev.to', icon: 'fab fa-dev', color: '#0A0A0A' }
]

// Computed
const currentYear = computed(() => new Date().getFullYear())

const socialStyle = (social: SocialLink) => ({
  '--social-color': social.color,
  '--social-glow': `${social.color}40`
})

// Methods
const subscribe = () => {
  if (email.value && validateEmail(email.value)) {
    alert(`Thanks for subscribing with: ${email.value}`)
    email.value = ''
  } else {
    alert('Please enter a valid email address')
  }
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
/* Footer Section */
.footer-section {
  position: relative;
  background: linear-gradient(to bottom, transparent, #0a0a0f);
  margin-top: 8rem;
  overflow: hidden;
}

/* Waves Effect */
.footer-waves {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.profile-status {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff41;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%2300f3ff'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.wave-1 {
  animation: waveMove 20s linear infinite;
}

.wave-2 {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%239d4edd'/%3E%3C/svg%3E");
  animation: waveMove 15s linear infinite reverse;
  opacity: 0.08;
}

.wave-3 {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%2300ff41'/%3E%3C/svg%3E");
  animation: waveMove 25s linear infinite;
  opacity: 0.05;
}

@keyframes waveMove {
  0% { transform: translateX(0) translateZ(0); }
  100% { transform: translateX(-50%) translateZ(0); }
}

/* Main Footer */
.footer-main {
  position: relative;
  z-index: 1;
  padding: 4rem 0 2rem;
  background: linear-gradient(to bottom, rgba(10, 10, 15, 0.5), #0a0a0f);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Top Section */
.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-globe {
  position: relative;
  width: 60px;
  height: 60px;
}

.globe-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #00f3ff, #9d4edd);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: globeRotate 20s linear infinite;
}

.globe-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.1),
    0 0 30px rgba(0, 243, 255, 0.3);
}

.globe-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 10px #00ff41;
}

@keyframes globeRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.logo-tagline {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0;
}

.brand-description {
  color: #cbd5e1;
  line-height: 1.6;
  max-width: 400px;
  margin: 0;
}

/* Newsletter */
.footer-newsletter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.newsletter-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  color: white;
  margin: 0;
}

.newsletter-description {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  outline: none;
  border-color: #00f3ff;
  box-shadow: 0 0 0 3px rgba(0, 243, 255, 0.1);
}

.newsletter-input::placeholder {
  color: #64748b;
}

.newsletter-button {
  padding: 0.75rem 1.25rem;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 243, 255, 0.2);
}
/* Profile */
.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.profile-image {
  position: relative;
}

.image-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00f3ff, #9d4edd);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.profile-status {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Middle Section */
.footer-middle {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding: 3rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.column-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: white;
  margin: 0;
  position: relative;
  padding-bottom: 0.75rem;
}

.column-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #9d4edd);
}
.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links li {
  margin: 0;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
}

.footer-link:hover {
  color: #00f3ff;
  transform: translateX(5px);
}

.footer-link i {
  font-size: 0.75rem;
  color: #00f3ff;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #cbd5e1;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(0, 243, 255, 0.1);
  border-color: #00f3ff;
  color: white;
  transform: translateY(-2px);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #cbd5e1;
  font-size: 0.875rem;
}

.contact-item i {
  color: #00f3ff;
  width: 16px;
}

/* Bottom Section */
.footer-bottom {
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.footer-social {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #cbd5e1;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: white;
  transform: translateY(-5px);
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--social-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 30%, rgba(255, 255, 255, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover .social-icon {
  box-shadow: 0 0 20px var(--social-glow);
}

.social-link:hover .social-icon::after {
  opacity: 1;
}

.social-name {
  font-size: 0.75rem;
  opacity: 0.8;
}

.footer-copyright {
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
}

.footer-copyright p {
  margin: 0 0 0.5rem;
}

.footer-legal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.legal-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.75rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #00f3ff;
}

.divider {
  color: #64748b;
}

.back-to-top {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00f3ff, #9d4edd);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 243, 255, 0.3);
}

.back-to-top:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 10px 30px rgba(0, 243, 255, 0.4);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .footer-middle {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1rem;
  }
  
  .footer-top,
  .footer-middle {
    grid-template-columns: 1fr;
  }
  
  .footer-social {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .back-to-top {
    position: relative;
    right: auto;
    bottom: auto;
    margin-top: 2rem;
  }
}
</style>