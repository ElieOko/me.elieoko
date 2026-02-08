<!-- src/components/sections/HeroSection.vue -->
<template>
  <section id="home" class="hero-section">
    <!-- Background Elements -->
    <div class="hero-bg-elements">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>
      <div class="grid-lines"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <!-- Left Column -->
        <div class="hero-left">
          <div class="hero-badges">
            <span class="badge cyber-badge">
              <i class="fas fa-bolt"></i>
              Freelance
            </span>
            <span class="badge tech-badge">
              <i class="fas fa-code"></i>
              Developer
            </span>
          </div>
          
          <h1 class="hero-title">
            <span class="title-line">
              <span class="gradient-text">Awa</span> Robuste
            </span>
            <span class="title-line">
              <span class="typing-text">{{ typedText }}</span>
              <span class="cursor">|</span>
            </span>
          </h1>
          
          <p class="hero-description">
           Je conçois et construis des systèmes complexes qui transcendent les frontières du web, du mobile et de l’infrastructure.
            Chaque ligne de code raconte une histoire d’innovation, de performance et de scalabilité
          </p>
          
          <!-- <div class="hero-actions">
            <button class="btn btn-primary btn-large" @click="scrollToProjects">
              <i class="fas fa-rocket"></i>
              Explore Projects
            </button>
            <button class="btn btn-secondary btn-large" @click="openContact">
              <i class="fas fa-comment-dots"></i>
              Let's Talk
            </button>
          </div> -->
          
          <!-- Stats -->
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-value">5+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">10+</div>
              <div class="stat-label">Projects Delivered</div>
            </div>
            <!-- <div class="stat-item">
              <div class="stat-value">99.9%</div>
              <div class="stat-label">Uptime Average</div>
            </div> -->
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="hero-right">
          <!-- 3D Card -->
          <div class="hero-card" ref="card3d" @mousemove="handleCardMove" @mouseleave="resetCard">
            <div class="card-inner">
              <!-- Profile -->
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
              
              <!-- Current Stack -->
              <div class="stack-section">
                <h4 class="stack-title">
                  <i class="fas fa-layer-group"></i>
                  Current Stack
                </h4>
                <div class="stack-tags">
                  <span class="stack-tag" v-for="tech in currentStack" :key="tech">
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <!-- Active Projects -->
              <div class="projects-section">
                <h4 class="projects-title">
                  <i class="fas fa-rocket"></i>
                  Active Projects
                </h4>
                <div class="project-item" v-for="project in activeProjects" :key="project.id">
                  <div class="project-info">
                    <div class="project-name">{{ project.name }}</div>
                    <div class="project-progress">
                      <div class="progress-bar">
                        <div 
                          class="progress-fill" 
                          :style="{ width: project.progress + '%' }"
                        ></div>
                      </div>
                      <span class="project-percent">{{ project.progress }}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Terminal -->
              <div class="terminal-section">
                <div class="terminal-header">
                  <div class="terminal-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                  </div>
                  <div class="terminal-title">terminal</div>
                </div>
                <div class="terminal-body">
                  <div class="terminal-line" v-for="(line, index) in terminalLines" :key="index">
                    <span class="prompt">$</span>
                    <span class="command">{{ line }}</span>
                  </div>
                  <div class="terminal-line blinking">
                    <span class="prompt">$</span>
                    <span class="cursor">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator" @click="scrollToContent">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div class="arrow">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// State
const typedText = ref('')
const currentText = ref('Ecosystems')
const typingIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = 100
const card3d = ref<HTMLElement>()

// Data
const currentStack = ['TypeScript', 'Nodejs', 'Kotlin', 'Gradle DSL', 'Jetpack Compose', 'Spring Boot']
const activeProjects = [
  { id: 1, name: 'CasaNayo', progress: 75 },
  { id: 2, name: 'Butterfly', progress: 0 },
  { id: 3, name: 'Matrix', progress: 0 }
]

const terminalLines = [
  'gradlew bootJar',
  '✅ BUILD SUCCESSFUL in 30s',
  '🚀 4 actionable tasks: 2 executed, 2 up-to-date',
//   '🔐 Security scan passed',
//   '📊 Performance optimized'
]

// Typing effect
const typeWriter = () => {
  const fullText = currentText.value
  
  if (isDeleting.value) {
    typedText.value = fullText.substring(0, typingIndex.value - 1)
    typingIndex.value--
  } else {
    typedText.value = fullText.substring(0, typingIndex.value + 1)
    typingIndex.value++
  }
  
  if (!isDeleting.value && typingIndex.value === fullText.length) {
    setTimeout(() => isDeleting.value = true, 2000)
  } else if (isDeleting.value && typingIndex.value === 0) {
    isDeleting.value = false
    setTimeout(() => {
      currentText.value = currentText.value === 'Ecosystems' ? 'Solutions' : 'Ecosystems'
    }, 500)
  }
  
  const speed = isDeleting.value ? typingSpeed / 2 : typingSpeed
  setTimeout(typeWriter, speed)
}

// 3D Card effect
const handleCardMove = (e: MouseEvent) => {
  if (!card3d.value) return
  
  const card = card3d.value
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateY = ((x - centerX) / centerX) * 10
  const rotateX = ((centerY - y) / centerY) * 10
  
  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-10px)
  `
}

const resetCard = () => {
  if (!card3d.value) return
  card3d.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)'
}

// Navigation
const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContent = () => {
  document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })
}

const openContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  setTimeout(typeWriter, 1000)
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

/* Background Elements */
.hero-bg-elements {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #00f3ff, #9d4edd);
  top: 10%;
  left: 10%;
  animation: float 15s ease-in-out infinite;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #ff00ff, #00ff41);
  top: 60%;
  right: 15%;
  animation: float 20s ease-in-out infinite reverse;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #00ffff, #ffaa00);
  bottom: 20%;
  left: 20%;
  animation: float 25s ease-in-out infinite;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black, transparent 70%);
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

/* Content Layout */
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Badges */
.hero-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cyber-badge {
  background: linear-gradient(45deg, rgba(0, 243, 255, 0.2), rgba(157, 78, 221, 0.2));
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
}

.tech-badge {
  background: linear-gradient(45deg, rgba(0, 255, 65, 0.2), rgba(255, 0, 255, 0.2));
  border: 1px solid rgba(0, 255, 65, 0.3);
  color: #00ff41;
}

/* Typography */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin: 0;
}

.title-line {
  display: block;
}

.gradient-text {
  background: linear-gradient(90deg, #00f3ff, #9d4edd, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.typing-text {
  font-family: 'Space Grotesk', monospace;
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
}

/* Buttons */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Stats */
.hero-stats {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00f3ff, #00ff41);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 3D Card */
.hero-right {
  perspective: 1000px;
}

.hero-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 80px rgba(0, 243, 255, 0.1);
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}

.card-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.profile-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
}

.profile-title {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

/* Stack */
.stack-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stack-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stack-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.stack-tag:hover {
  background: rgba(0, 243, 255, 0.1);
  border-color: #00f3ff;
  color: white;
  transform: translateY(-2px);
}

/* Projects */
.projects-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.projects-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.project-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-name {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

.project-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f3ff, #00ff41);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.project-percent {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Terminal */
.terminal-section {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.terminal-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca3f; }

.terminal-title {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  font-family: monospace;
}

.terminal-body {
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.terminal-line {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt {
  color: #00ff41;
}

.command {
  color: rgba(255, 255, 255, 0.9);
}

.blinking {
  animation: blink 1s infinite;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 10px;
  background: #00f3ff;
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
}

.arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .hero-right {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-stats {
    gap: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .btn-large {
    width: 100%;
    justify-content: center;
  }
}
</style>