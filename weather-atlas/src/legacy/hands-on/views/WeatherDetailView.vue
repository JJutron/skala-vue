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
  router.push('/archive/live')
}

const displayTemp = computed(() => {
  if (!city.value) return null
  return convertTemp(city.value.temp)
})
</script>

<template>
  <section class="detail">
    <el-page-header @back="goHome">
      <template #content>날씨 상세</template>
    </el-page-header>

    <el-card v-if="city" class="panel">
      <template #header>{{ city.name }}</template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="상태">{{ city.status }}</el-descriptions-item>
        <el-descriptions-item label="기온">
          {{ displayTemp }}{{ configStore.unitSymbol }}
        </el-descriptions-item>
        <el-descriptions-item label="습도">{{ city.humidity }}%</el-descriptions-item>
        <el-descriptions-item label="바람">{{ city.wind }} m/s</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-empty v-else description="해당 도시 정보를 찾을 수 없습니다." />

    <el-card class="panel">
      <template #header>도시 소개 (Wikipedia)</template>
      <el-skeleton v-if="isWikiLoading" :rows="3" animated />
      <el-alert v-else-if="wikiError" :title="wikiError" type="error" :closable="false" />
      <p v-else-if="wikiExtract">{{ wikiExtract }}</p>
    </el-card>

    <el-card class="panel">
      <template #header>5일 예보 중 앞으로 24시간</template>
      <el-skeleton v-if="isForecastLoading" :rows="4" animated />
      <el-alert
        v-else-if="forecastError"
        :title="forecastError"
        type="error"
        :closable="false"
      />
      <el-timeline v-else-if="forecastList.length">
        <el-timeline-item
          v-for="item in forecastList"
          :key="item.dt"
          :timestamp="item.dt_txt"
        >
          {{ convertTemp(item.main.temp) }}{{ configStore.unitSymbol }}
          · {{ item.weather[0].description }}
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-button type="primary" @click="goHome">대시보드로 돌아가기</el-button>
  </section>
</template>

<style scoped>
.detail {
  padding: 20px 24px 28px;
}

.panel {
  margin: 16px 0;
}

.panel p {
  margin: 0;
}
</style>
