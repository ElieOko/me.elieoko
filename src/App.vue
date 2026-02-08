<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from '@/components/layout/NavigationBar.vue';
import MatrixBackground from '@/components/ui/MatrixBackground.vue';
import ParticleEffect from '@/components/ui/ParticleEffect.vue';
import FooterSection from './components/layout/FooterSection.vue';

</script>

<template>
  <main class="backgrounds-container ">
  <!-- Backgrounds -->
   <MatrixBackground 
      :intensity="0.6"
      :speed="1.2"
      color="#00f3ff"
      :density="60"
    /> 
    <ParticleEffect />
     <NavigationBar />
    <!-- Navigation -->
   
  <RouterView />
  <FooterSection/>
  </main>
   
</template>
<style>



</style>