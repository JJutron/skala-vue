<script setup>
import { useRoute } from 'vue-router'
import UnitToggler from './components/UnitToggler.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <nav class="nav">
      <el-menu
        class="nav-menu"
        mode="horizontal"
        router
        :ellipsis="false"
        :default-active="route.path"
      >
        <el-menu-item index="/">대시보드</el-menu-item>
        <el-menu-item index="/about">소개</el-menu-item>
        <el-menu-item index="/stats">통계</el-menu-item>
      </el-menu>
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
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
}
</style>
