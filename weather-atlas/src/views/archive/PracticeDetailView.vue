<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { archiveItems } from '../../data/archiveItems.js'

const route = useRoute()
const item = computed(
  () => archiveItems.find((entry) => entry.id === route.params.id) ?? null,
)
</script>

<template>
  <section v-if="item" class="detail">
    <RouterLink class="back" to="/archive">아카이브로</RouterLink>
    <p class="page-kicker">{{ item.number }}</p>
    <h1 class="page-title">{{ item.title }}</h1>
    <p class="page-lead">{{ item.description }}</p>
    <p class="summary">{{ item.summary }}</p>
    <RouterLink class="cta" :to="item.to">{{ item.cta }}</RouterLink>
  </section>
  <section v-else class="detail">
    <p class="page-kicker">Missing plate</p>
    <h1 class="page-title">이 기록이 없습니다.</h1>
    <RouterLink class="cta" to="/archive">아카이브로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.detail {
  padding-top: 36px;
  max-width: 640px;
}

.back,
.cta {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--brass);
  text-decoration: none;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.summary {
  margin: 28px 0;
  font-size: 1.15rem;
}

.cta {
  border-bottom: 1px solid var(--brass);
}
</style>
