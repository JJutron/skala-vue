<script setup>
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../../stores/weatherStore.js'

const sky = {
  Clear: '맑음',
  Rain: '비',
  Snow: '눈',
  Wind: '바람',
  Clouds: '구름',
  Fog: '안개',
}

const formatWind = (wind) => Number(wind).toFixed(1)

defineProps({
  weather: { type: Object, default: null },
  region: { type: Object, default: null },
  layer: { type: String, default: 'weather' },
})

const store = useWeatherStore()
const { unitSymbol } = storeToRefs(store)
</script>

<template>
  <div v-if="region" class="tip">
    <p class="name">{{ region.fullName || region.name }}</p>
    <template v-if="weather && layer === 'air'">
      <p class="temp">{{ weather.air?.aqiLabel || '—' }}</p>
      <p class="type">대기질 {{ weather.air?.aqi || '—' }}</p>
      <p class="meta">
        PM2.5 {{ weather.air ? weather.air.pm25 : '—' }}
        · PM10 {{ weather.air ? weather.air.pm10 : '—' }}
      </p>
    </template>
    <template v-else-if="weather">
      <p class="temp">{{ store.displayTemp(weather.temp) }}{{ unitSymbol }}</p>
      <p class="type">{{ sky[weather.type] || weather.type }}</p>
      <p class="meta">
        습도 {{ weather.humidity }}% · 바람 {{ formatWind(weather.wind) }} m/s
        <template v-if="weather.air"> · 대기 {{ weather.air.aqiLabel }}</template>
      </p>
    </template>
    <p v-else class="meta">관측을 불러오는 중</p>
  </div>
</template>

<style scoped>
.tip {
  min-width: 148px;
  max-width: 200px;
  padding: 12px 14px 14px;
  background: var(--hanji);
  color: var(--on-paper);
  box-shadow: 0 16px 40px rgba(17, 14, 12, 0.4);
  pointer-events: none;
}

.name,
.meta,
.type {
  margin: 0;
  font-size: 0.82rem;
}

.name {
  font-family: var(--display);
  font-size: 1.1rem;
}

.temp {
  margin: 2px 0 0;
  font-family: var(--display);
  font-size: 2rem;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--on-paper);
}

.type {
  color: var(--on-paper-accent);
  margin: 4px 0 6px;
}

.meta {
  color: var(--on-paper-muted);
}
</style>
