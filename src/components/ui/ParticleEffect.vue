<!-- src/components/ParticleEffect.vue -->
<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
  connectionRadius: number
}

// Refs
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()
const particles = ref<Particle[]>([])
const mouse = ref({ x: 0, y: 0, radius: 150 })
const animationId = ref(0)
const isActive = ref(true)

// Config
const particleConfig = {
  count: 60,
  colors: ['#00f3ff', '#00ff41', '#ff00ff', '#9d4edd', '#00ffff'],
  minSize: 1,
  maxSize: 4,
  minSpeed: -0.5,
  maxSpeed: 0.5,
  connectionDistance: 100,
  mouseForce: 0.05
}

// Initialisation
const initParticles = () => {
  if (!canvas.value) return
  
  // Setup canvas
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = window.innerWidth * dpr
  canvas.value.height = window.innerHeight * dpr
  canvas.value.style.width = `${window.innerWidth}px`
  canvas.value.style.height = `${window.innerHeight}px`
  
  ctx.value = canvas.value.getContext('2d')!
  ctx.value.scale(dpr, dpr)
  
  // Créer particules
  particles.value = []
  for (let i = 0; i < particleConfig.count; i++) {
    particles.value.push(createParticle())
  }
  
  // Démarrer animation
  animate()
}

// Créer une particule
const createParticle = (): Particle => {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize,
    speedX: (Math.random() - 0.5) * 2 * particleConfig.maxSpeed,
    speedY: (Math.random() - 0.5) * 2 * particleConfig.maxSpeed,
    color: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)] as string,
    opacity: Math.random() * 0.5 + 0.3,
    life: Math.random() * 100,
    maxLife: 100,
    connectionRadius: Math.random() * 30 + 20
  }
}

// Boucle d'animation
const animate = () => {
  if (!isActive.value || !ctx.value || !canvas.value) return
  
  // Clear avec fondu
  ctx.value.fillStyle = 'rgba(10, 10, 15, 0.05)'
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Mettre à jour et dessiner les particules
  particles.value.forEach((particle, index) => {
    // Interaction souris
    const dx = mouse.value.x - particle.x
    const dy = mouse.value.y - particle.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < mouse.value.radius) {
      const force = (mouse.value.radius - distance) / mouse.value.radius
      const angle = Math.atan2(dy, dx)
      particle.speedX += Math.cos(angle) * force * particleConfig.mouseForce
      particle.speedY += Math.sin(angle) * force * particleConfig.mouseForce
    }
    
    // Mouvement
    particle.x += particle.speedX
    particle.y += particle.speedY
    
    // Rebond sur les bords
    if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -0.9
    if (particle.y < 0 || particle.y > window.innerWidth) particle.speedY *= -0.9
    
    // Vie et régénération
    particle.life -= 0.5
    if (particle.life <= 0) {
      particles.value[index] = createParticle()
      return
    }
    
    // Opacity basée sur la vie
    const lifeRatio = particle.life / particle.maxLife
    particle.opacity = lifeRatio * 0.5 + 0.3
    
    // Dessiner particule
    if (ctx.value != undefined) {
      ctx.value.beginPath()
      ctx.value.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.value.fillStyle = particle.color
      ctx.value.globalAlpha = particle.opacity
      ctx.value.fill()
    }
    
    // Dessiner connections
    particles.value.forEach(otherParticle => {
      if (otherParticle === particle) return
      
      const dx = otherParticle.x - particle.x
      const dy = otherParticle.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < particleConfig.connectionDistance) {
        if (ctx.value != undefined) {
        ctx.value.beginPath()
        ctx.value.moveTo(particle.x, particle.y)
        ctx.value.lineTo(otherParticle.x, otherParticle.y)
        ctx.value.strokeStyle = particle.color
        ctx.value.globalAlpha = 0.1 * (1 - distance / particleConfig.connectionDistance)
        ctx.value.lineWidth = 1
        ctx.value.stroke()
        }
      
      }
    })
    
    // Effet de brillance
    if (Math.random() > 0.95) {
    
      if (ctx.value != undefined) {
        ctx.value.beginPath()
        ctx.value.arc(
          particle.x, 
          particle.y, 
          particle.size * 2, 
          0, 
          Math.PI * 2
        )
        ctx.value.fillStyle = particle.color
        ctx.value.globalAlpha = 0.2
        ctx.value.fill()
      }
    }
  })
  
  // Réinitialiser l'opacité
  ctx.value.globalAlpha = 1
  
  // Continuer l'animation
  animationId.value = requestAnimationFrame(animate)
}

// Événements
const handleMouseMove = (event: MouseEvent) => {
  mouse.value.x = event.clientX
  mouse.value.y = event.clientY
}

const handleResize = () => {
  if (!canvas.value) return
  
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = window.innerWidth * dpr
  canvas.value.height = window.innerHeight * dpr
  canvas.value.style.width = `${window.innerWidth}px`
  canvas.value.style.height = `${window.innerHeight}px`
  
  if (ctx.value) {
    ctx.value.scale(dpr, dpr)
  }
}

const handleVisibilityChange = () => {
  isActive.value = !document.hidden
  if (isActive.value) {
    animate()
  }
}

// Lifecycle
onMounted(() => {
  initParticles()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  cancelAnimationFrame(animationId.value)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;
  pointer-events: none;
  opacity: 0.6;
}
</style>