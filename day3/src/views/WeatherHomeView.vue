<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { weatherList as weatherData } from '../data/weather.js'
import { cityMetaList } from '../data/cityMeta.js'
import { fetchLiveCities } from '../api/openWeather.js'
import UnitToggler from '../components/UnitToggler.vue'
import WeatherCard4 from '../components/exercise/WeatherCard4.vue'

const router = useRouter()
const weatherList = ref(weatherData)

const searchQuery = ref('')

const selectedCityInfo = ref({
  message: '카드를 클릭하거나 검색해 보세요.',
})

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) =>
    city.name.includes(searchQuery.value),
  )
})

const resultCount = computed(() => filteredWeatherList.value.length)

const selectCity = (cityName) => {
  selectedCityInfo.value = {
    message: `${cityName}이 선택되었습니다.`,
  }
}

const showDetail = (city) => {
  router.push('/weather/' + city.id)
}

watch(selectedCityInfo, (newVal) => {
  console.log(
    `[watch 감지] 상태 바 문구가 업데이트되었습니다 -> '${newVal.message}'`,
  )
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어: '${searchQuery.value}'`)
})

const searchQuery4 = ref('')

const selectedCityInfo4 = ref({
  message: '카드를 클릭하거나 검색해 보세요.',
})

const filteredWeatherList4 = computed(() => {
  return weatherList.value.filter((city) =>
    city.name.includes(searchQuery4.value),
  )
})

const resultCount4 = computed(() => filteredWeatherList4.value.length)

const selectCity4 = (cityName) => {
  selectedCityInfo4.value = {
    message: `${cityName}이 선택되었습니다.`,
  }
}

const showDetail4 = (city) => {
  router.push('/weather/' + city.id)
}

const liveWeatherList = ref([])
const searchQuery5 = ref('')
const isLoading5 = ref(false)
const liveError = ref('')

const selectedCityInfo5 = ref({
  message: '카드를 클릭하거나 검색해 보세요.',
})

const filteredWeatherList5 = computed(() => {
  return liveWeatherList.value.filter((city) =>
    city.name.includes(searchQuery5.value),
  )
})

const resultCount5 = computed(() => filteredWeatherList5.value.length)

const selectCity5 = (cityName) => {
  selectedCityInfo5.value = {
    message: `${cityName}이 선택되었습니다.`,
  }
}

const showDetail5 = (city) => {
  router.push('/weather/' + city.id)
}

const loadLiveWeather = async () => {
  isLoading5.value = true
  liveError.value = ''
  try {
    liveWeatherList.value = await fetchLiveCities(cityMetaList)
  } catch (error) {
    console.error('실시간 날씨 조회 실패:', error)
    liveWeatherList.value = []
    liveError.value =
      error.message === 'OPENWEATHER_KEY_MISSING'
        ? 'OpenWeather API 키가 없습니다. .env의 VITE_OPENWEATHER_KEY를 확인하세요.'
        : '실시간 날씨를 가져오지 못했습니다. API 키나 네트워크를 확인하세요.'
  } finally {
    isLoading5.value = false
  }
}

onMounted(() => {
  loadLiveWeather()
})
</script>

<template>
  <div class="home">
    <h2>과제 3: 날씨 (컴포넌트)</h2>

    <BaseDashboardCard>
      <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
      <p>검색 결과 {{ resultCount }}건</p>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h2>📋 지역별 날씨 현황</h2>
      <p v-if="filteredWeatherList.length === 0">일치하는 도시가 없습니다.</p>
      <template v-else>
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="selectCity"
          @click-detail="showDetail"
        />
      </template>
    </BaseDashboardCard>

    <div class="status">{{ selectedCityInfo.message }}</div>

    <div class="toolbar-4">

    <h2 class="homework-4">과제 4: 날씨 (Pinia)</h2>
    <UnitToggler />
    </div>
    <BaseDashboardCard>
      <SearchBar :query="searchQuery4" @update-query="searchQuery4 = $event" />
      <p>검색 결과 {{ resultCount4 }}건</p>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h2>📋 지역별 날씨 현황</h2>
      <p v-if="filteredWeatherList4.length === 0">일치하는 도시가 없습니다.</p>
      <template v-else>
        <WeatherCard4
          v-for="city in filteredWeatherList4"
          :key="city.id"
          :city="city"
          @select-card="selectCity4"
          @click-detail="showDetail4"
        />
      </template>
    </BaseDashboardCard>

    <div class="status">{{ selectedCityInfo4.message }}</div>

    <div class="toolbar-5">
      <h2 class="homework-5">과제 5: 날씨 (Axios)</h2>
      <UnitToggler />
    </div>
    <BaseDashboardCard>
      <SearchBar :query="searchQuery5" @update-query="searchQuery5 = $event" />
      <p>검색 결과 {{ resultCount5 }}건</p>
      <p v-if="isLoading5">실시간 날씨를 불러오는 중입니다...</p>
      <p v-else-if="liveError" class="live-error">{{ liveError }}</p>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h2>실시간 지역별 날씨</h2>
      <p v-if="!isLoading5 && !liveError && filteredWeatherList5.length === 0">
        일치하는 도시가 없습니다.
      </p>
      <template v-else>
        <WeatherCard4
          v-for="city in filteredWeatherList5"
          :key="city.id"
          :city="city"
          @select-card="selectCity5"
          @click-detail="showDetail5"
        />
      </template>
    </BaseDashboardCard>

    <div class="status">{{ selectedCityInfo5.message }}</div>
  </div>
</template>

<style scoped>
.home > h2 {
  margin: 0;
  padding: 20px 24px 8px;
  font-size: 16px;
}

.homework-4 {
  margin-top: 8px;
  border-top: 1px solid #eee;
}

.status {
  padding: 14px 24px;
  background: #e8f5e9;
  color: #2e7d32;
}

.toolbar-4,
.toolbar-5 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.homework-5 {
  margin-top: 8px;
  border-top: 1px solid #eee;
}

.live-error {
  color: #c62828;
}
</style>
