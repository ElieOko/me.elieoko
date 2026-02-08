// src/composables/useAnimation.ts
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export function useAnimation() {
  const isAnimating = ref(false)
  
  // 3D Card Tilt Effect
  const useTiltEffect = (elementRef: HTMLElement | null, intensity = 20) => {
    if (!elementRef) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef) return
      
      const rect = elementRef.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateY = ((x - centerX) / centerX) * intensity
      const rotateX = ((centerY - y) / centerY) * intensity
      
      gsap.to(elementRef, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        ease: 'power2.out'
      })
    }
    
    const handleMouseLeave = () => {
      if (!elementRef) return
      
      gsap.to(elementRef, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out'
      })
    }
    
    elementRef.addEventListener('mousemove', handleMouseMove)
    elementRef.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      elementRef.removeEventListener('mousemove', handleMouseMove)
      elementRef.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
  
  // Scroll Triggered Animation
  const useScrollTrigger = (elementRef: HTMLElement | null, animation: gsap.core.Tween) => {
    if (!elementRef) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animation.play()
          } else {
            animation.reverse()
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(elementRef)
    
    return () => observer.disconnect()
  }
  
  // Typewriter Effect
  const useTypewriter = (text: string, speed = 50) => {
    const displayedText = ref('')
    let currentIndex = 0
    
    const type = () => {
      if (currentIndex < text.length) {
        displayedText.value += text.charAt(currentIndex)
        currentIndex++
        setTimeout(type, speed)
      }
    }
    
    onMounted(() => {
      type()
    })
    
    return { displayedText }
  }
  
  // Parallax Effect
  const useParallax = (elementRef: HTMLElement | null, speed = 0.5) => {
    const handleScroll = () => {
      if (!elementRef) return
      
      const scrolled = window.pageYOffset
      const rate = scrolled * speed
      
      elementRef.style.transform = `translateY(${rate}px)`
    }
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }
  
  return {
    isAnimating,
    useTiltEffect,
    useScrollTrigger,
    useTypewriter,
    useParallax
  }
}