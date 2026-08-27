<script setup>
import { ref } from 'vue'
import { regions } from '../../data/regions.js'
import { fetchCurrentByCoords } from '../../services/weatherApi.js'
import { getWeatherType, normalizeWeather } from '../../services/weatherMapper.js'

const query = ref('Seoul')
const status = ref('idle')
const errorMessage = ref('')
const payload = ref(null)

const presets = regions.map((region) => region.name)

const findRegion = () => {
  const q = query.value.trim()
  return (
    regions.find(
      (region) =>
        region.name === q ||
        region.english.toLowerCase() === q.toLowerCase(),
    ) ?? null
  )
}

const getWeather = async () => {
  if (status.value === 'loading') return
  const region = findRegion()
  if (!region) {
    status.value = 'error'
    errorMessage.value = '서울, 경기, 강원처럼 지도에 있는 지역 이름을 입력하세요.'
    payload.value = null
    return
  }

  status.value = 'loading'
  errorMessage.value = ''
  try {
    const data = await fetchCurrentByCoords(region.lat, region.lon)
    payload.value = {
      mapped: normalizeWeather(region, data),
      type: getWeatherType(data),
    }
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    payload.value = null
    errorMessage.value =
      error.message === 'OPENWEATHER_KEY_MISSING'
        ? 'OpenWeather 키가 없습니다. .env의 VITE_OPENWEATHER_KEY를 확인하세요.'
        : '날씨를 가져오지 못했습니다. 네트워크와 키를 확인하세요.'
  }
}
</script>

<template>
  <section class="lab">
    <p class="page-kicker">Weather API Explorer</p>
    <h2 class="title">도시를 검색하고 관측값을 엽니다.</h2>
    <form class="search" @submit.prevent="getWeather">
      <label>
        Search city
        <input v-model.trim="query" type="text" placeholder="Seoul" />
      </label>
      <button type="submit" :disabled="status === 'loading'">
        {{ status === 'loading' ? '불러오는 중' : 'Get weather' }}
      </button>
    </form>
    <p class="presets">
      <button
        v-for="name in presets"
        :key="name"
        type="button"
        @click="query = name"
      >
        {{ name }}
      </button>
    </p>
    <p v-if="status === 'idle'" class="note">아직 요청 전입니다.</p>
    <p v-else-if="status === 'loading'" class="note">관측망에 연결하는 중</p>
    <p v-else-if="status === 'error'" class="note warn">{{ errorMessage }}</p>
    <dl v-else-if="payload" class="data">
      <div>
        <dt>Temperature</dt>
        <dd>{{ payload.mapped.temp }}°</dd>
      </div>
      <div>
        <dt>Humidity</dt>
        <dd>{{ payload.mapped.humidity }}%</dd>
      </div>
      <div>
        <dt>Wind</dt>
        <dd>{{ payload.mapped.wind }} m/s</dd>
      </div>
      <div>
        <dt>Type</dt>
        <dd>{{ payload.type }}</dd>
      </div>
      <div class="wide">
        <dt>Condition</dt>
        <dd>{{ payload.mapped.condition }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.title {
  margin: 0 0 24px;
  font-family: var(--display);
  font-size: 2rem;
}

.search {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: end;
}

label {
  flex: 1;
  min-width: 200px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
}

input {
  display: block;
  width: 100%;
  min-height: 44px;
  margin-top: 8px;
  padding: 0 12px;
  background: var(--plate);
  color: var(--paper);
  border: 1px solid var(--line);
}

button {
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--brass);
  background: var(--brass);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.presets button {
  background: transparent;
  color: var(--paper);
  border-color: var(--line);
}

.note {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--blueprint);
}

.warn {
  color: var(--alert);
}

.data {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.data dt {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
}

.data dd {
  margin: 6px 0 0;
  font-family: var(--display);
  font-size: 2rem;
}

.wide {
  grid-column: 1 / -1;
}

@media (max-width: 700px) {
  .data {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
