<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/archive/live')
}

const detailPath = '/weather/:cityId'
</script>

<template>
  <section class="about">
    <h2>날씨 앱 소개</h2>
    <p>
      Vue Router로 대시보드, 도시 상세, 통계 화면을 나눈 날씨 목업입니다.
      상세보기는 알림창 대신 <code>{{ detailPath }}</code> 주소로 이동합니다.
    </p>
    <button type="button" @click="goHome">대시보드로 돌아가기</button>
  </section>
</template>

<style scoped>
.about {
  padding: 20px 24px 28px;
}

.about h2,
.about p {
  margin: 0 0 12px;
}

button {
  padding: 8px 12px;
}
</style>
