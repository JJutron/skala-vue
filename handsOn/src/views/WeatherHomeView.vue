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
import WeatherCard6 from '../components/exercise/WeatherCard6.vue'
import { useConfigStore } from '../stores/configStore.js'

const router = useRouter()
const configStore = useConfigStore()
const weatherList = ref(weatherData)

const searchQuery1 = ref('')
const selectedCityInfo1 = ref({
  message: '카드를 클릭하거나 검색해 보세요.',
})

const selectCity1 = (cityName) => {
  selectedCityInfo1.value = {
    message: `${cityName}이 선택되었습니다.`,
  }
}

const showDetail1 = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

const searchQuery2 = ref('')
const selectedCityInfo2 = ref({
  message: '카드를 클릭하거나 검색해 보세요.',
})

const filteredWeatherList2 = computed(() => {
  return weatherList.value.filter((city) =>
    city.name.includes(searchQuery2.value),
  )
})

const resultCount2 = computed(() => filteredWeatherList2.value.length)

const selectCity2 = (cityName) => {
  selectedCityInfo2.value = {
    message: `${cityName}이 선택되었습니다.`,
  }
}

const showDetail2 = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

watch(selectedCityInfo2, (newVal) => {
  console.log(
    `[watch 감지] 상태 바 문구가 업데이트되었습니다 -> '${newVal.message}'`,
  )
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어: '${searchQuery2.value}'`)
})

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

const searchQuery6 = ref('')

const selectedCityInfo6 = ref({
  message: '카드를 클릭하거나 검색해 보세요.',
})

const filteredWeatherList6 = computed(() => {
  return liveWeatherList.value.filter((city) =>
    city.name.includes(searchQuery6.value),
  )
})

const resultCount6 = computed(() => filteredWeatherList6.value.length)

const selectCity6 = (cityName) => {
  selectedCityInfo6.value = {
    message: `${cityName}이 선택되었습니다.`,
  }
}

const showDetail6 = (city) => {
  router.push('/weather/' + city.id)
}
</script>

<template>
  <div class="home">
    <h2>과제 1: 날씨 (Mockup)</h2>

    <section class="block">
      <h2>🔍 도시 검색</h2>
      <input
        class="search-input"
        :value="searchQuery1"
        @input="searchQuery1 = $event.target.value"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: {{ searchQuery1 }}</p>
    </section>

    <section class="block">
      <h2>📋 지역별 날씨 현황</h2>
      <div
        v-for="city in weatherList.filter((c) => c.name.includes(searchQuery1))"
        :key="city.id"
        class="inline-card"
        @click="selectCity1(city.name)"
      >
        <div>
          <h3>{{ city.name }} ({{ city.status }})</h3>
          <p>현재 기온: {{ city.temp }}°C</p>
          <span v-if="city.temp >= 25" class="hot">🔥 더움 (25도 이상)</span>
          <span v-else class="fresh">❄️ 신선함 (25도 미만)</span>
        </div>
        <button @click.stop="showDetail1(city)">상세보기</button>
      </div>
    </section>

    <div class="status">{{ selectedCityInfo1.message }}</div>

    <h2 class="homework-split">과제 2: 날씨 (컴포지션)</h2>

    <section class="block">
      <h2>🔍 도시 검색</h2>
      <input
        class="search-input"
        :value="searchQuery2"
        @input="searchQuery2 = $event.target.value"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: {{ searchQuery2 }}</p>
      <p>검색 결과 {{ resultCount2 }}건</p>
    </section>

    <section class="block">
      <h2>📋 지역별 날씨 현황</h2>
      <template v-if="!searchQuery2">
        <div
          v-for="city in weatherList"
          :key="city.id"
          class="inline-card"
          @click="selectCity2(city.name)"
        >
          <div>
            <h3>{{ city.name }} ({{ city.status }})</h3>
            <p>현재 기온: {{ city.temp }}°C</p>
            <span v-if="city.temp >= 25" class="hot">🔥 더움 (25도 이상)</span>
            <span v-else class="fresh">❄️ 신선함 (25도 미만)</span>
          </div>
          <button @click.stop="showDetail2(city)">상세보기</button>
        </div>
      </template>
      <template v-else-if="filteredWeatherList2.length">
        <div
          v-for="city in filteredWeatherList2"
          :key="city.id"
          class="inline-card"
          @click="selectCity2(city.name)"
        >
          <div>
            <h3>{{ city.name }} ({{ city.status }})</h3>
            <p>현재 기온: {{ city.temp }}°C</p>
            <span v-if="city.temp >= 25" class="hot">🔥 더움 (25도 이상)</span>
            <span v-else class="fresh">❄️ 신선함 (25도 미만)</span>
          </div>
          <button @click.stop="showDetail2(city)">상세보기</button>
        </div>
      </template>
      <p v-else>일치하는 도시가 없습니다.</p>
    </section>

    <div class="status">{{ selectedCityInfo2.message }}</div>

    <h2 class="homework-split">과제 3: 날씨 (컴포넌트)</h2>

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

    <div class="toolbar-6">
      <h2 class="homework-6">과제 6: 날씨 (UI Library)</h2>
      <el-switch
        :model-value="configStore.unit === 'fahrenheit'"
        inline-prompt
        active-text="℉"
        inactive-text="℃"
        @change="configStore.toggleUnit"
      />
    </div>

    <section class="block">
      <el-input
        :model-value="searchQuery6"
        clearable
        placeholder="검색할 도시 이름 입력"
        @input="searchQuery6 = $event"
        @clear="searchQuery6 = ''"
      />
      <p>검색 결과 {{ resultCount6 }}건</p>
      <el-alert
        v-if="isLoading5"
        title="실시간 날씨를 불러오는 중입니다..."
        type="info"
        :closable="false"
      />
      <el-alert
        v-else-if="liveError"
        :title="liveError"
        type="error"
        :closable="false"
      />
    </section>

    <section class="block">
      <h2>실시간 지역별 날씨</h2>
      <el-empty
        v-if="!isLoading5 && !liveError && filteredWeatherList6.length === 0"
        description="일치하는 도시가 없습니다."
      />
      <WeatherCard6
        v-for="city in filteredWeatherList6"
        :key="city.id"
        :city="city"
        @select-card="selectCity6"
        @click-detail="showDetail6"
      />
    </section>

    <el-alert
      class="status-alert"
      :title="selectedCityInfo6.message"
      type="success"
      :closable="false"
    />
  </div>
</template>

<style scoped>
.home > h2 {
  margin: 0;
  padding: 20px 24px 8px;
  font-size: 16px;
}

.homework-split,
.homework-4 {
  margin-top: 8px;
  border-top: 1px solid #eee;
}

.block {
  padding: 20px 24px 8px;
}

.block > h2 {
  margin: 0 0 12px;
  font-size: 16px;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
}

.inline-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 14px 16px;
  border: 1px solid #ececec;
  border-radius: 8px;
  cursor: pointer;
}

.inline-card h3,
.inline-card p {
  margin: 0 0 4px;
}

.hot {
  color: #c62828;
}

.fresh {
  color: #1565c0;
}

.status {
  padding: 14px 24px;
  background: #e8f5e9;
  color: #2e7d32;
}

.toolbar-4,
.toolbar-5,
.toolbar-6 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px 8px;
}

.homework-5,
.homework-6 {
  margin-top: 8px;
  border-top: 1px solid #eee;
}

.status-alert {
  margin: 0;
  border-radius: 0;
}

.live-error {
  color: #c62828;
}
</style>
