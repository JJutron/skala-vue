<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { weatherList as weatherData } from '../data/weather.js'

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
  </div>
</template>

<style scoped>
.home > h2 {
  margin: 0;
  padding: 20px 24px 8px;
  font-size: 16px;
}

.status {
  padding: 14px 24px;
  background: #e8f5e9;
  color: #2e7d32;
}
</style>
