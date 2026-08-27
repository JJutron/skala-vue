<script setup>
import ChallengeApp from '../../legacy/challenge/App.vue'
</script>

<template>
  <section class="wrap">
    <h1 class="page-title">코드 챌린지</h1>
    <p class="page-lead">
      Vue 지시자부터 Pinia, Axios, Element Plus까지 직접 풀어 둔 문제입니다. 동작은 그대로입니다.
    </p>
    <div class="legacy-stage challenge-dock">
      <ChallengeApp />
    </div>
  </section>
</template>

<style scoped>
.wrap {
  padding-top: 28px;
}

.wrap .page-title,
.wrap .page-lead {
  text-align: center;
}

.page-lead {
  margin-bottom: 28px;
  margin-inline: auto;
  max-width: 36rem;
}
</style>
