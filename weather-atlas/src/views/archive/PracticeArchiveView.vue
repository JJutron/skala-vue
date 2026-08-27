<script setup>
import { archiveItems } from '../../data/archiveItems.js'
import PracticeArchiveItem from '../../components/archive/PracticeArchiveItem.vue'
</script>

<template>
  <section class="archive">
    <h1 class="page-title">실습 아카이브</h1>
    <p class="page-lead">
      날씨 앱을 만들며 배운 실습입니다. 미리보기의 도시와 숫자가 실제 과제 화면과 같습니다.
    </p>
    <div class="list">
      <PracticeArchiveItem
        v-for="item in archiveItems"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>

<style scoped>
.archive {
  padding-top: 36px;
  max-width: 880px;
  margin-inline: auto;
}

.archive .page-title,
.archive .page-lead {
  text-align: center;
}

.archive .page-lead {
  margin-inline: auto;
  max-width: 36rem;
}

.list {
  margin-top: 40px;
  border-bottom: 1px solid var(--line);
}
</style>
