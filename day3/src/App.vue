<script setup>
import UnitToggler from './components/UnitToggler.vue'
</script>

<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/" active-class="none" exact-active-class="router-link-active">
        대시보드
      </RouterLink>
      <RouterLink to="/about">소개</RouterLink>
      <RouterLink to="/stats">통계</RouterLink>
      <UnitToggler />
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  max-width: 560px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.nav {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
}

.nav a {
  color: #2e7d32;
  text-decoration: none;
}

.nav a.router-link-active {
  font-weight: 700;
}
</style>
