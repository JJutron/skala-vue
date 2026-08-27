<script setup>
import { computed } from 'vue'
import { weatherList } from '../data/weather.js'

const hottest = computed(() =>
  weatherList.reduce((max, city) => (city.temp > max.temp ? city : max)),
)

const coldest = computed(() =>
  weatherList.reduce((min, city) => (city.temp < min.temp ? city : min)),
)

const averageTemp = computed(() => {
  const sum = weatherList.reduce((acc, city) => acc + city.temp, 0)
  return (sum / weatherList.length).toFixed(1)
})
</script>

<template>
  <section class="stats">
    <h2>도시별 기온 통계</h2>
    <p>평균 기온: {{ averageTemp }}°C</p>
    <p>
      가장 더운 곳:
      <RouterLink :to="'/archive/live/weather/' + hottest.id">
        {{ hottest.name }} ({{ hottest.temp }}°C)
      </RouterLink>
    </p>
    <p>
      가장 선선한 곳:
      <RouterLink :to="'/archive/live/weather/' + coldest.id">
        {{ coldest.name }} ({{ coldest.temp }}°C)
      </RouterLink>
    </p>

    <ul>
      <li v-for="city in weatherList" :key="city.id">
        <RouterLink :to="'/archive/live/weather/' + city.id">
          {{ city.name }} — {{ city.temp }}°C / {{ city.status }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.stats {
  padding: 20px 24px 28px;
}

.stats h2,
.stats p {
  margin: 0 0 8px;
}

ul {
  padding-left: 18px;
}

a {
  color: #2e7d32;
}
</style>
