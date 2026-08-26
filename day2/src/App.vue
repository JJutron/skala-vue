<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './components/BaseDashboardCard.vue'
import SearchBar from './components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '안성', temp: 31, status: '흐림' },
])

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
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
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
  <div class="app">
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
.app {
  max-width: 560px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.app > h2 {
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
