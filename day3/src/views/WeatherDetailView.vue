<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weatherList } from '../data/weather.js'

const route = useRoute()
const router = useRouter()
const city = ref(null)

const pickCity = () => {
  city.value =
    weatherList.find((item) => item.id === route.params.cityId) ?? null
}

onMounted(() => {
  pickCity()
})

watch(
  () => route.params.cityId,
  () => {
    pickCity()
  },
)

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="detail">
    <h2>날씨 상세</h2>

    <template v-if="city">
      <p class="name">{{ city.name }}</p>
      <p>상태: {{ city.status }}</p>
      <p>기온: {{ city.temp }}°C</p>
      <p>습도: {{ city.humidity }}%</p>
      <p>바람: {{ city.wind }} m/s</p>
    </template>
    <p v-else>해당 도시 정보를 찾을 수 없습니다.</p>

    <button type="button" @click="goHome">대시보드로 돌아가기</button>
  </section>
</template>

<style scoped>
.detail {
  padding: 20px 24px 28px;
}

.detail h2,
.detail p {
  margin: 0 0 8px;
}

.name {
  font-size: 22px;
  font-weight: 700;
}

button {
  margin-top: 12px;
  padding: 8px 12px;
}
</style>
