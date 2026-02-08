<!-- src/components/MatrixBackground.vue -->
<template>
  <div class="matrix-container">
    <!-- Canvas pour l'effet principal -->
    <canvas ref="canvas" class="matrix-canvas"></canvas>
    
    <!-- Caractères Matrix en DOM pour effet en couches -->
    <div 
      v-for="char in domChars" 
      :key="char.id"
      class="matrix-char"
      :style="charStyle(char)"
    >
      {{ char.symbol }}
    </div>
    
    <!-- Effet scanline -->
    <div class="scanline"></div>
    
    <!-- Overlay de dégradé -->
    <div class="matrix-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface MatrixChar {
  id: number
  x: number
  y: number
  speed: number
  symbol: string
  size: number
  opacity: number
  color: string
  trail: number
}

// Props
const props = withDefaults(defineProps<{
  intensity?: number
  speed?: number
  color?: string
  density?: number
}>(), {
  intensity: 0.7,
  speed: 1,
  color: '#00ff41',
  density: 80
})

// Refs
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()
const animationId = ref(0)
const domChars = ref<MatrixChar[]>([])
const symbols = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@*<>'
const isActive = ref(true)

// Styles computed
const charStyle = (char: MatrixChar) => ({
  left: `${char.x}px`,
  top: `${char.y}px`,
  fontSize: `${char.size}px`,
  color: char.color,
  opacity: char.opacity,
  fontFamily: '"Courier New", monospace',
  textShadow: `0 0 5px ${char.color}, 0 0 10px ${char.color}`,
  transform: `translateY(${char.trail}px)`,
  transition: `top ${char.speed * 0.05}s linear`
})

// Initialisation
const initMatrix = () => {
  if (!canvas.value) return
  
  // Setup canvas
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = window.innerWidth * dpr
  canvas.value.height = window.innerHeight * dpr
  canvas.value.style.width = `${window.innerWidth}px`
  canvas.value.style.height = `${window.innerHeight}px`
  
  ctx.value = canvas.value.getContext('2d')!
  ctx.value.scale(dpr, dpr)
  
  // Créer caractères DOM
  domChars.value = []
  for (let i = 0; i < props.density; i++) {
    domChars.value.push(createMatrixChar())
  }
  
  // Lancer animation
  animate()
}

// Créer un caractère Matrix
const createMatrixChar = (): MatrixChar => {
  const colors = [
    props.color,
    lightenColor(props.color, 30),
    lightenColor(props.color, 60),
    '#ffffff'
  ]
  
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed: (Math.random() * 2 + 1) * props.speed,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    size: Math.random() * 16 + 10,
    opacity: Math.random() * 0.5 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
    trail: Math.random() * 20
  }
}

// Fonction pour éclaircir une couleur
const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`
}

// Boucle d'animation
const animate = () => {
  if (!isActive.value || !ctx.value || !canvas.value) return
  
  // Clear avec effet de fondu
  ctx.value.fillStyle = `rgba(10, 10, 15, ${0.05 * props.intensity})`
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Dessiner sur canvas
  ctx.value.fillStyle = props.color
  ctx.value.font = '16px "Courier New", monospace'
  
  // Mettre à jour caractères DOM
  domChars.value.forEach((char, index) => {
    // Mouvement
    char.y += char.speed
    char.trail = Math.sin(Date.now() * 0.001 + index) * 5
    
    // Réinitialiser si sort de l'écran
    if (char.y > window.innerHeight + 100) {
      char.y = -100
      char.x = Math.random() * window.innerWidth
      char.symbol = symbols[Math.floor(Math.random() * symbols.length)]
    }
  })
  
  // Continuer l'animation
  animationId.value = requestAnimationFrame(animate)
}

// Gestionnaires d'événements
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
  initMatrix()
  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  cancelAnimationFrame(animationId.value)
})
</script>

<style scoped>
.matrix-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  pointer-events: none;
  overflow: hidden;
}

.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.matrix-char {
  position: absolute;
  pointer-events: none;
  user-select: none;
  font-weight: bold;
  will-change: transform, opacity;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, 
    transparent 0%,
    var(--cyber-blue) 50%,
    transparent 100%);
  opacity: 0.3;
  animation: scanline 3s linear infinite;
}

.matrix-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(10, 10, 15, 0.3) 50%,
    rgba(10, 10, 15, 0.8) 100%
  );
}

@media (max-width: 768px) {
  .matrix-char {
    font-size: 12px !important;
  }
}
</style>