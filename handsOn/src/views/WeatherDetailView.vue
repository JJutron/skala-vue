<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weatherList } from '../data/weather.js'
import { findCityMeta } from '../data/cityMeta.js'
import { fetchForecastByCoords } from '../api/openWeather.js'
import { fetchWikiSummary } from '../api/wikipedia.js'
import { useConfigStore } from '../stores/configStore.js'

const route = useRoute()
const router = useRouter()
const city = ref(null)
const cityMeta = ref(null)

const forecastList = ref([])
const forecastError = ref('')
const isForecastLoading = ref(false)

const wikiExtract = ref('')
const wikiError = ref('')
const isWikiLoading = ref(false)

const configStore = useConfigStore()

const convertTemp = (rawTemp) => {
  if (rawTemp == null) return null
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
}

const pickCity = () => {
  city.value =
    weatherList.find((item) => item.id === route.params.cityId) ?? null
  cityMeta.value = findCityMeta(route.params.cityId)
}

const loadForecast = async () => {
  if (!cityMeta.value) {
    forecastList.value = []
    forecastError.value = ''
    return
  }

  isForecastLoading.value = true
  forecastError.value = ''
  try {
    const data = await fetchForecastByCoords(
      cityMeta.value.lat,
      cityMeta.value.lon,
    )
    forecastList.value = (data.list ?? []).slice(0, 8)
  } catch (error) {
    console.error('예보 조회 실패:', error)
    forecastList.value = []
    forecastError.value =
      error.message === 'OPENWEATHER_KEY_MISSING'
        ? 'OpenWeather API 키가 없습니다. .env의 VITE_OPENWEATHER_KEY를 확인하세요.'
        : '예보를 가져오지 못했습니다.'
  } finally {
    isForecastLoading.value = false
  }
}

const loadWiki = async () => {
  if (!cityMeta.value) {
    wikiExtract.value = ''
    wikiError.value = ''
    return
  }

  isWikiLoading.value = true
  wikiError.value = ''
  try {
    wikiExtract.value = await fetchWikiSummary(cityMeta.value.wikiTitle)
  } catch (error) {
    console.error('위키 조회 실패:', error)
    wikiExtract.value = ''
    wikiError.value = '도시 설명을 가져오지 못했습니다.'
  } finally {
    isWikiLoading.value = false
  }
}

const loadExtras = () => {
  pickCity()
  loadForecast()
  loadWiki()
}

onMounted(() => {
  loadExtras()
})

watch(
  () => route.params.cityId,
  () => {
    loadExtras()
  },
)

const goHome = () => {
  router.push('/')
}

const displayTemp = computed(() => {
  if (!city.value) return null
  return convertTemp(city.value.temp)
})
</script>

<template>
  <section class="detail">
    <h2>날씨 상세</h2>

    <template v-if="city">
      <p class="name">{{ city.name }}</p>
      <p>상태: {{ city.status }}</p>
      <p>기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>습도: {{ city.humidity }}%</p>
      <p>바람: {{ city.wind }} m/s</p>
    </template>
    <p v-else>해당 도시 정보를 찾을 수 없습니다.</p>

    <div class="extra">
      <h3>도시 소개 (Wikipedia)</h3>
      <p v-if="isWikiLoading">설명을 불러오는 중입니다...</p>
      <p v-else-if="wikiError" class="extra-error">{{ wikiError }}</p>
      <p v-else-if="wikiExtract">{{ wikiExtract }}</p>
    </div>

    <div class="extra">
      <h3>5일 예보 중 앞으로 24시간</h3>
      <p v-if="isForecastLoading">예보를 불러오는 중입니다...</p>
      <p v-else-if="forecastError" class="extra-error">{{ forecastError }}</p>
      <ul v-else-if="forecastList.length" class="forecast">
        <li v-for="item in forecastList" :key="item.dt">
          <span>{{ item.dt_txt }}</span>
          <span>{{ convertTemp(item.main.temp) }}{{ configStore.unitSymbol }}</span>
          <span>{{ item.weather[0].description }}</span>
        </li>
      </ul>
    </div>

    <button type="button" @click="goHome">대시보드로 돌아가기</button>
  </section>
</template>

<style scoped>
.detail {
  padding: 20px 24px 28px;
}

.detail h2,
.detail h3,
.detail p {
  margin: 0 0 8px;
}

.name {
  font-size: 22px;
  font-weight: 700;
}

.extra {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.extra-error {
  color: #c62828;
}

.forecast {
  margin: 0;
  padding: 0;
  list-style: none;
}

.forecast li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
}

button {
  margin-top: 12px;
  padding: 8px 12px;
}
</style>
