 <!-- src/components/sections/ExpertiseSection.vue -->
<template>
  <section id="expertise" class="expertise-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-decorator">///</span>
          <span>Technique</span>
          <span class="gradient-text">Expertise</span>
        </h2>
        <p class="section-subtitle">
          Maîtrise de toute la pile technologique, du silicium à l'expérience utilisateur.
        </p>
      </div>
      
      <!-- Main Grid -->
      <div class="expertise-grid">
        <!-- Systems Engineering -->
        <div class="expertise-card" ref="card1" @mousemove="handleCardHover(card1)">
          <div class="card-header">
            <div class="card-icon">
              <i class="fas fa-server"></i>
            </div>
            <h3 class="card-title">Ingenierie Systeme</h3>
            <div class="card-badge">2 ans</div>
          </div>
          
          <p class="card-description">
            Low-level system architecture, kernel development, distributed systems, 
            and cloud-native infrastructure design.
          </p>
          
          <div class="card-stack">
            <span class="tech-item" v-for="tech in systemsTech" :key="tech">
              {{ tech }}
            </span>
          </div>
          
          <!-- <div class="card-metrics">
            <div class="metric">
              <div class="metric-label">Performance</div>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 98%"></div>
              </div>
            </div>
            <div class="metric">
              <div class="metric-label">Security</div>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 95%"></div>
              </div>
            </div>
          </div>
           -->
          <div class="card-hover">
            <div class="hover-content">
              <i class="fas fa-microchip"></i>
              <span>Deep System Optimization</span>
            </div>
          </div>
        </div>
        
        <!-- Full-Stack Web -->
        <div class="expertise-card" ref="card2" @mousemove="handleCardHover(card2)">
          <div class="card-header">
            <div class="card-icon">
              <i class="fas fa-layer-group"></i>
            </div>
            <h3 class="card-title">Full-Stack Web</h3>
            <div class="card-badge">5ans</div>
          </div>
          
          <p class="card-description">
            High-performance web applications, serverless architecture, 
            and exceptional user experiences across all platforms.
          </p>
          
          <div class="card-stack">
            <span class="tech-item" v-for="tech in webTech" :key="tech">
              {{ tech }}
            </span>
          </div>
          
         
          
          <div class="card-hover">
            <div class="hover-content">
              <i class="fas fa-bolt"></i>
              <span>Millisecond Response Times</span>
            </div>
          </div>
        </div>
        
        <!-- Mobile & IoT -->
        <div class="expertise-card" ref="card3" @mousemove="handleCardHover(card3)">
          <div class="card-header">
            <div class="card-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3 class="card-title">Mobile & IoT</h3>
            <div class="card-badge">4 ans</div>
          </div>
          
          <p class="card-description">
            Native mobile applications, cross-platform solutions, 
            and connected device ecosystems with real-time data processing.
          </p>
          
          <div class="card-stack">
            <span class="tech-item" v-for="tech in mobileTech" :key="tech">
              {{ tech }}
            </span>
          </div>
          
       
          
          <div class="card-hover">
            <div class="hover-content">
              <i class="fas fa-broadcast-tower"></i>
              <span>Real-time Connectivity</span>
            </div>
          </div>
        </div>
        
        <!-- Cloud & DevOps -->
   
      </div>
      
      <!-- Skills Visualization -->
      <div class="skills-visualization">
        <h3 class="skills-title">Technology Radar</h3>
        <div class="radar-chart">
          <div class="radar-grid">
            <div class="grid-circle" v-for="n in 4" :key="n" :style="{
              width: `${n * 25}%`,
              height: `${n * 25}%`
            }"></div>
            <div class="grid-line" v-for="angle in [0, 60, 120, 180, 240, 300]" :key="angle"></div>
          </div>
          
          <div class="radar-points">
            <div 
              v-for="skill in radarSkills" 
              :key="skill.name"
              class="radar-point"
              :style="pointStyle(skill)"
              :title="`${skill.name}: ${skill.level}/5`"
            >
              <div class="point-label">{{ skill.name }}</div>
            </div>
          </div>
          
          <div class="radar-legend">
            <div class="legend-item" v-for="category in skillCategories" :key="category">
              <span class="legend-color" :style="{ backgroundColor: getCategoryColor(category) }"></span>
              <span>{{ category }}</span>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Data
const systemsTech = ['trace compass', 'lttng','Linux Kernel']
const webTech = ['Spring', 'Laravel', 'Express.js', 'Node.js']
const mobileTech = ['Jetpack compose', 'Swift UI', 'Flutter']
const cloudTech = ['AWS', 'GCP', 'Terraform', 'K8s', 'Prometheus', 'GitLab CI']

interface RadarSkill {
  name: string
  level: number // 1-5
  angle: number // 0-360
  category: string
}

const radarSkills: RadarSkill[] = [
  // Frontend - secteur Nord-Est
  { name: 'TypeScript', level: 5, angle: 20, category: 'Frontend' },
  { name: 'Vues', level: 5, angle: 40, category: 'Frontend' },
  
  // Systems - secteur Est
  { name: 'Rust', level: 4, angle: 70, category: 'Systems' },
  
  // Mobile - secteur Sud-Est
  { name: 'Kotlin', level: 4, angle: 110, category: 'Mobile' },
  { name: 'Swift', level: 3, angle: 130, category: 'Mobile' },
  
  // Backend - secteur Sud
  { name: 'Spring Boot', level: 4, angle: 160, category: 'Backend' },
  { name: 'Express', level: 4, angle: 190, category: 'Backend' },
  { name: 'Laravel', level: 4, angle: 220, category: 'Backend' },
  
  // DevOps - secteur Sud-Ouest
  { name: 'Github Action', level: 5, angle: 250, category: 'DevOps' },
  { name: 'Docker', level: 5, angle: 280, category: 'DevOps' },
  // { name: 'Terraform', level: 3, angle: 310, category: 'DevOps' },
  
  // Cloud - secteur Nord-Ouest
  { name: 'VPS', level: 4, angle: 340, category: 'Cloud' }
]

const skillCategories = ['Frontend', 'Systems', 'Mobile', 'Backend', 'Cloud', 'DevOps']

// Refs for 3D cards
const card1 = ref<HTMLElement>()
const card2 = ref<HTMLElement>()
const card3 = ref<HTMLElement>()
const card4 = ref<HTMLElement>()

// Computed
const pointStyle = (skill: RadarSkill) => {
  const radius = 10 + (skill.level * 5) // 50-90
  const angleRad = (skill.angle * Math.PI) / 180
  const x = 50 + radius * Math.cos(angleRad)
  const y = 50 + radius * Math.sin(angleRad)
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    backgroundColor: getCategoryColor(skill.category)
  }
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Frontend': '#00f3ff',
    'Systems': '#00ff41',
    'Mobile': '#ff00ff',
    'Backend': '#ffaa00',
    'Cloud': '#9d4edd',
    'DevOps': '#00ffff'
  }
  return colors[category] || '#ffffff'
}

// Methods
const handleCardHover = (card: HTMLElement | undefined) => {
  if (!card) return
  
   const e = window.event as MouseEvent
  const rect = card.getBoundingClientRect()
  if (e != undefined ) {
     const x =  e.clientX - rect.left
    const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateY = ((x - centerX) / centerX) * 5
    const rotateX = ((centerY - y) / centerY) * 5
  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.02)
  `
  }
 
  
  
  
  const list = [card1, card2, card3, card4]

list.forEach(c => {
    if (c.value) {
      c.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    }
  })
}
</script>

<style scoped>
.expertise-section {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-decorator {
  color: #00f3ff;
  font-family: monospace;
  opacity: 0.5;
}

.section-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

/* Expertise Grid */
.expertise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
  gap: 4rem;
  margin-bottom: 4rem;
}

.expertise-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.expertise-card:hover {
  border-color: #00f3ff;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(0, 243, 255, 0.1);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(45deg, #00f3ff, #9d4edd);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.card-title {
  flex: 1;
  margin: 0;
  font-size: 1.25rem;
}

.card-badge {
  padding: 0.25rem 0.75rem;
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 1rem;
  font-size: 0.75rem;
  color: #00f3ff;
}

/* Card Description */
.card-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

/* Tech Stack */
.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-item {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(0, 243, 255, 0.1);
  border-color: #00f3ff;
  transform: translateY(-2px);
}

/* Metrics */
.card-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: space-between;
}

.metric-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f3ff, #00ff41);
  border-radius: 2px;
  transition: width 0.6s ease;
}

/* Hover Effect */
.card-hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 243, 255, 0.1));
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  border-top: 1px solid rgba(0, 243, 255, 0.2);
}

.expertise-card:hover .card-hover {
  transform: translateY(0);
}

.hover-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #00f3ff;
  font-size: 0.875rem;
}

/* Skills Visualization */
.skills-visualization {
  margin-top: 4rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skills-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

/* Radar Chart */
.radar-chart {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  aspect-ratio: 1;
}

.radar-grid {
  position: absolute;
  inset: 0;
}

.grid-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.grid-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  transform-origin: center;
}

.grid-line:nth-child(1) { transform: rotate(0deg); }
.grid-line:nth-child(2) { transform: rotate(60deg); }
.grid-line:nth-child(3) { transform: rotate(120deg); }
.grid-line:nth-child(4) { transform: rotate(180deg); }
.grid-line:nth-child(5) { transform: rotate(240deg); }
.grid-line:nth-child(6) { transform: rotate(300deg); }

.radar-points {
  position: absolute;
  inset: 0;
}

.radar-point {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  box-shadow: 0 0 10px currentColor;
  transition: all 0.3s ease;
  cursor: pointer;
}

.radar-point:hover {
  transform: translate(-50%, -50%) scale(1.5);
  z-index: 10;
}

.point-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.radar-point:hover .point-label {
  opacity: 1;
}

.radar-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* Responsive */
@media (max-width: 768px) {
  .expertise-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-visualization {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>