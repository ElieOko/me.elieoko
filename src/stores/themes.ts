// src/stores/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)
  const primaryColor = ref('#00f3ff')
  const secondaryColor = ref('#9d4edd')
  const animationSpeed = ref(1) // 0.5x - 2x
  
  // Load from localStorage
  const loadTheme = () => {
    const saved = localStorage.getItem('novasphere-theme')
    if (saved) {
      const theme = JSON.parse(saved)
      isDark.value = theme.isDark ?? true
      primaryColor.value = theme.primaryColor ?? '#00f3ff'
      secondaryColor.value = theme.secondaryColor ?? '#9d4edd'
      animationSpeed.value = theme.animationSpeed ?? 1
    }
  }
  
  // Save to localStorage
  const saveTheme = () => {
    localStorage.setItem('novasphere-theme', JSON.stringify({
      isDark: isDark.value,
      primaryColor: primaryColor.value,
      secondaryColor: secondaryColor.value,
      animationSpeed: animationSpeed.value
    }))
  }
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    isDark.value = !isDark.value
    saveTheme()
    updateDocumentTheme()
  }
  
  // Update CSS variables
  const updateDocumentTheme = () => {
    const root = document.documentElement
    
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    root.style.setProperty('--primary-color', primaryColor.value)
    root.style.setProperty('--secondary-color', secondaryColor.value)
    root.style.setProperty('--animation-speed', `${animationSpeed.value}s`)
  }
  
  // Initialize
  loadTheme()
  updateDocumentTheme()
  
  // Watch for changes
  watch([isDark, primaryColor, secondaryColor], () => {
    saveTheme()
    updateDocumentTheme()
  })
  
  return {
    isDark,
    primaryColor,
    secondaryColor,
    animationSpeed,
    toggleTheme,
    updateDocumentTheme
  }
})