<script setup>
import HomeworkPreview from './HomeworkPreview.vue'

defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <RouterLink class="plate" :to="item.to">
    <HomeworkPreview :src="item.image" :alt="`${item.title} 화면`" />
    <div class="copy">
      <span class="num">{{ item.number }}</span>
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
      <p class="summary">{{ item.summary }}</p>
      <span class="cta">{{ item.cta }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.plate {
  display: grid;
  grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
  padding: 28px 0;
  text-decoration: none;
  color: inherit;
  border-top: 1px solid var(--line);
  min-height: 44px;
}

.plate:hover .cta,
.plate:focus-visible .cta {
  color: var(--cinnabar);
}

.copy {
  min-width: 0;
  padding-top: 2px;
}

.num {
  display: block;
  font-size: 0.8rem;
  color: var(--moon);
  margin-bottom: 8px;
  letter-spacing: 0.08em;
}

.copy h2 {
  margin: 0;
  font-family: var(--display);
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.25;
}

.copy p {
  margin: 8px 0 0;
  color: var(--mist);
}

.summary {
  color: var(--hanji) !important;
}

.cta {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 8px;
  color: var(--moon);
  transition: color var(--duration-feedback) var(--ease-out-cubic);
}

@media (max-width: 720px) {
  .plate {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  :deep(.preview) {
    max-width: none;
  }
}
</style>
