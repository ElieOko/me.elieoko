<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from '@/components/layout/NavigationBar.vue';
import MatrixBackground from '@/components/ui/MatrixBackground.vue';
import ParticleEffect from '@/components/ui/ParticleEffect.vue';
import FooterSection from './components/layout/FooterSection.vue';

</script>

<template>
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
</template>