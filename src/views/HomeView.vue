<script setup lang="ts">
import HeroSection from '@/components/sections/ HeroSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import ExpertiseSection from '@/components/sections/ExpertiseSection.vue';
import ImageGallery from '@/components/ui/ImageGallery.vue';

</script>

<template>
  <main>
  <HeroSection/>
     <ImageGallery/> 
    <ExpertiseSection/>
    <ContactSection/>
  </main>
</template>
<style>
.main-content {
  position: relative;
  z-index: 1; /* Au-dessus des backgrounds */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Contenu de la page d'accueil */
.home-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>