<script setup>
import { useRoute } from 'vue-router'
import BrandMark from './BrandMark.vue'
import { requestBrushIntro } from '../../composables/brushIntroGate.js'

const route = useRoute()

const links = [
  { to: '/', label: '지도', match: (path) => path === '/' },
  { to: '/archive', label: '실습 아카이브', match: (path) => path.startsWith('/archive') },
  { to: '/challenge', label: '코드 챌린지', match: (path) => path.startsWith('/challenge') },
]

const onBrandClick = (event) => {
  requestBrushIntro()
  if (route.path === '/') event.preventDefault()
}
</script>

<template>
  <header class="bezel">
    <RouterLink class="brand" to="/" aria-label="기상도 홈" @click="onBrandClick">
      <BrandMark />
      <span class="wordmark">기상도</span>
    </RouterLink>
    <nav class="nav" aria-label="주요 메뉴">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link"
        :class="{ active: link.match(route.path) }"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
    <div class="bezel-end" aria-hidden="true" />
  </header>
</template>

<style scoped>
.bezel {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding: 12px 20px 12px 28px;
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(17, 14, 12, 0.62);
  backdrop-filter: blur(20px) saturate(140%);
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-self: start;
  text-decoration: none;
  color: var(--hanji);
  min-height: 44px;
  flex: 0 0 auto;
  transition: transform var(--duration-press) var(--ease-out-cubic);
}

.brand:active {
  transform: scale(0.97);
}

.wordmark {
  font-family: var(--display);
  font-size: 1.35rem;
  letter-spacing: 0.12em;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2px;
  justify-self: center;
}

.bezel-end {
  justify-self: end;
  min-width: 1px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  text-decoration: none;
  color: var(--mist);
  font-size: 0.95rem;
  border-bottom: 1px solid transparent;
  transition:
    color var(--duration-feedback) var(--ease-out-cubic),
    border-color var(--duration-feedback) var(--ease-out-cubic),
    transform var(--duration-press) var(--ease-out-cubic);
}

.nav-link:hover,
.nav-link.active {
  color: var(--hanji);
  border-bottom-color: var(--cinnabar);
}

.nav-link:active {
  transform: scale(0.97);
}

@media (max-width: 720px) {
  .bezel {
    padding: 10px 12px 10px 16px;
    gap: 8px;
  }

  .nav-link {
    padding: 0 10px;
  }

  .wordmark {
    font-size: 1.15rem;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .bezel {
    background: var(--sumi);
    backdrop-filter: none;
  }
}
</style>
