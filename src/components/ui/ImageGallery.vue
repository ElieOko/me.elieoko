<!-- src/components/sections/UltraSimplePhoto.vue -->
<template>
  <section class="ultra-simple-photo">
    <div class="photo-wrapper">
      <!-- Simple Photo with Hover Effect -->
      <div class="simple-frame">
        <img
          src="https://avatars.githubusercontent.com/u/109554173?v=4"
          alt="Elie Oko"
          class="simple-photo"
          @load="imageLoaded = true"
        />
        
        <!-- Simple Loading -->
        <div v-if="!imageLoaded" class="simple-loading">
          Loading...
        </div>
      </div>
      
      <!-- Minimal Info -->
      <div class="simple-info">
        <h3>Elie Oko</h3>
        <p></p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageLoaded = ref(false)
</script>

<style scoped>
.ultra-simple-photo {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.photo-wrapper {
  max-width: 400px;
  text-align: center;
}

.simple-frame {
  width: 250px;
  height: 250px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid #00f3ff;
  box-shadow: 
    0 0 20px rgba(0, 243, 255, 0.3),
    inset 0 0 20px rgba(0, 243, 255, 0.1);
}

.simple-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.simple-frame:hover .simple-photo {
  transform: scale(1.1);
}

.simple-loading {
  position: absolute;
  inset: 0;
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00f3ff;
  font-size: 0.875rem;
}

.simple-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  color: white;
}

.simple-info p {
  margin: 0;
  color: #00f3ff;
  font-size: 0.875rem;
}
</style>