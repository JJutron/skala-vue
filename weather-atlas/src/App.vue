<script setup>
import AppHeader from './components/layout/AppHeader.vue'
</script>

<template>
  <div class="atlas-app">
    <AppHeader />
    <main class="atlas-main">
      <RouterView />
    </main>
  </div>
</template>
