<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
</script>

<template>
  <div class="app-shell">
    <NavigationBar />
    <RouterView />
    <FooterSection />
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
