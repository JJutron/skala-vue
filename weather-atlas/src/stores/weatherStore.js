import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { findRegion, regions } from '../data/regions.js'
import {
  fetchAirPollutionByCoords,
  fetchCurrentByCoords,
} from '../services/weatherApi.js'
import { normalizeWeather } from '../services/weatherMapper.js'
import { buildWeatherDna } from '../services/weatherDna.js'

const mockByType = {
  gangwon: { main: { temp: 6, feels_like: 3, humidity: 62 }, wind: { speed: 5.4 }, clouds: { all: 88 }, weather: [{ id: 804, main: 'Clouds', description: '흐림' }] },
  gyeonggi: { main: { temp: 22, feels_like: 21, humidity: 54 }, wind: { speed: 2.1 }, clouds: { all: 40 }, weather: [{ id: 801, main: 'Clouds', description: '구름조금' }] },
  seoul: { main: { temp: 27, feels_like: 28, humidity: 48 }, wind: { speed: 2.1 }, clouds: { all: 12 }, weather: [{ id: 800, main: 'Clear', description: '맑음' }] },
  incheon: { main: { temp: 24, feels_like: 23, humidity: 68 }, wind: { speed: 4.1 }, clouds: { all: 52 }, weather: [{ id: 802, main: 'Clouds', description: '구름' }] },
  chungbuk: { main: { temp: 19, feels_like: 18, humidity: 58 }, wind: { speed: 2.4 }, clouds: { all: 44 }, weather: [{ id: 801, main: 'Clouds', description: '구름조금' }] },
  chungnam: { main: { temp: 18, feels_like: 17, humidity: 71 }, wind: { speed: 3.2 }, clouds: { all: 74 }, weather: [{ id: 500, main: 'Rain', description: '비' }] },
  sejong: { main: { temp: 20, feels_like: 19, humidity: 55 }, wind: { speed: 2.0 }, clouds: { all: 32 }, weather: [{ id: 800, main: 'Clear', description: '맑음' }] },
  daejeon: { main: { temp: 21, feels_like: 20, humidity: 57 }, wind: { speed: 2.2 }, clouds: { all: 28 }, weather: [{ id: 800, main: 'Clear', description: '맑음' }] },
  jeonbuk: { main: { temp: 17, feels_like: 16, humidity: 78 }, wind: { speed: 3.6 }, clouds: { all: 86 }, weather: [{ id: 501, main: 'Rain', description: '비' }] },
  jeonnam: { main: { temp: 16, feels_like: 15, humidity: 86 }, wind: { speed: 4.8 }, clouds: { all: 92 }, weather: [{ id: 501, main: 'Rain', description: '비' }] },
  gwangju: { main: { temp: 18, feels_like: 17, humidity: 80 }, wind: { speed: 3.1 }, clouds: { all: 70 }, weather: [{ id: 803, main: 'Clouds', description: '흐림' }] },
  gyeongbuk: { main: { temp: 23, feels_like: 22, humidity: 49 }, wind: { speed: 2.8 }, clouds: { all: 22 }, weather: [{ id: 800, main: 'Clear', description: '맑음' }] },
  gyeongnam: { main: { temp: 24, feels_like: 25, humidity: 63 }, wind: { speed: 4.2 }, clouds: { all: 28 }, weather: [{ id: 800, main: 'Clear', description: '맑음' }] },
  daegu: { main: { temp: 26, feels_like: 26, humidity: 46 }, wind: { speed: 2.0 }, clouds: { all: 18 }, weather: [{ id: 800, main: 'Clear', description: '맑음' }] },
  ulsan: { main: { temp: 23, feels_like: 23, humidity: 61 }, wind: { speed: 3.8 }, clouds: { all: 36 }, weather: [{ id: 801, main: 'Clouds', description: '구름조금' }] },
  busan: { main: { temp: 22, feels_like: 22, humidity: 72 }, wind: { speed: 5.1 }, clouds: { all: 64 }, weather: [{ id: 802, main: 'Clouds', description: '구름' }] },
  jeju: { main: { temp: 21, feels_like: 22, humidity: 84 }, wind: { speed: 6.1 }, clouds: { all: 90 }, weather: [{ id: 300, main: 'Drizzle', description: '이슬비' }] },
}

const mockAirByRegion = {
  gangwon: { list: [{ main: { aqi: 1 }, components: { pm2_5: 8, pm10: 14, o3: 40, no2: 8 } }] },
  gyeonggi: { list: [{ main: { aqi: 3 }, components: { pm2_5: 28, pm10: 42, o3: 55, no2: 22 } }] },
  seoul: { list: [{ main: { aqi: 3 }, components: { pm2_5: 32, pm10: 48, o3: 48, no2: 30 } }] },
  incheon: { list: [{ main: { aqi: 2 }, components: { pm2_5: 18, pm10: 28, o3: 52, no2: 16 } }] },
  chungbuk: { list: [{ main: { aqi: 2 }, components: { pm2_5: 16, pm10: 24, o3: 44, no2: 12 } }] },
  chungnam: { list: [{ main: { aqi: 2 }, components: { pm2_5: 20, pm10: 30, o3: 46, no2: 14 } }] },
  sejong: { list: [{ main: { aqi: 2 }, components: { pm2_5: 15, pm10: 22, o3: 42, no2: 11 } }] },
  daejeon: { list: [{ main: { aqi: 2 }, components: { pm2_5: 17, pm10: 26, o3: 45, no2: 13 } }] },
  jeonbuk: { list: [{ main: { aqi: 2 }, components: { pm2_5: 19, pm10: 29, o3: 50, no2: 15 } }] },
  jeonnam: { list: [{ main: { aqi: 1 }, components: { pm2_5: 10, pm10: 16, o3: 38, no2: 9 } }] },
  gwangju: { list: [{ main: { aqi: 2 }, components: { pm2_5: 21, pm10: 31, o3: 47, no2: 17 } }] },
  gyeongbuk: { list: [{ main: { aqi: 2 }, components: { pm2_5: 14, pm10: 21, o3: 43, no2: 10 } }] },
  gyeongnam: { list: [{ main: { aqi: 2 }, components: { pm2_5: 16, pm10: 25, o3: 49, no2: 12 } }] },
  daegu: { list: [{ main: { aqi: 3 }, components: { pm2_5: 26, pm10: 38, o3: 51, no2: 20 } }] },
  ulsan: { list: [{ main: { aqi: 2 }, components: { pm2_5: 18, pm10: 27, o3: 53, no2: 15 } }] },
  busan: { list: [{ main: { aqi: 2 }, components: { pm2_5: 17, pm10: 26, o3: 54, no2: 14 } }] },
  jeju: { list: [{ main: { aqi: 1 }, components: { pm2_5: 7, pm10: 12, o3: 36, no2: 6 } }] },
}

const loadRegionBundle = async (region) => {
  const [weatherResult, airResult] = await Promise.allSettled([
    fetchCurrentByCoords(region.lat, region.lon),
    fetchAirPollutionByCoords(region.lat, region.lon),
  ])

  if (weatherResult.status !== 'fulfilled') {
    throw weatherResult.reason
  }

  const airData =
    airResult.status === 'fulfilled'
      ? airResult.value
      : mockAirByRegion[region.id] ?? null

  return normalizeWeather(region, weatherResult.value, airData)
}

export const useWeatherStore = defineStore('atlasWeather', () => {
  const selectedRegionId = ref(null)
  const hoveredRegionId = ref(null)
  const weatherByRegion = ref({})
  const loading = ref(false)
  const error = ref('')
  const usedFallback = ref(false)
  const unit = ref('celsius')
  /** weather: ink wash | air: AQI choropleth */
  const mapLayer = ref('weather')

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
  const airLayerOn = computed(() => mapLayer.value === 'air')

  const displayTemp = (celsius) => {
    if (celsius == null || Number.isNaN(Number(celsius))) return '—'
    const value = Number(celsius)
    return unit.value === 'fahrenheit' ? Math.round((value * 9) / 5 + 32) : Math.round(value)
  }

  const setUnit = (next) => {
    unit.value = next === 'fahrenheit' ? 'fahrenheit' : 'celsius'
  }

  const setMapLayer = (next) => {
    mapLayer.value = next === 'air' ? 'air' : 'weather'
  }

  const selectedRegion = computed(() => findRegion(selectedRegionId.value))
  const hoveredRegion = computed(() => findRegion(hoveredRegionId.value))

  const selectedWeather = computed(
    () => weatherByRegion.value[selectedRegionId.value] ?? null,
  )
  const hoveredWeather = computed(
    () => weatherByRegion.value[hoveredRegionId.value] ?? null,
  )
  const selectedDna = computed(() => buildWeatherDna(selectedWeather.value))

  const applyPayload = (payload, fallback) => {
    weatherByRegion.value = payload
    usedFallback.value = fallback
  }

  const loadAll = async () => {
    if (Object.keys(weatherByRegion.value).length) return

    loading.value = true
    error.value = ''
    try {
      const bundles = await Promise.all(regions.map((region) => loadRegionBundle(region)))
      const next = {}
      regions.forEach((region, index) => {
        next[region.id] = bundles[index]
      })
      applyPayload(next, false)
    } catch (err) {
      console.error('atlas weather load failed', err)
      const next = {}
      regions.forEach((region) => {
        next[region.id] = normalizeWeather(
          region,
          mockByType[region.id],
          mockAirByRegion[region.id],
        )
      })
      applyPayload(next, true)
      error.value =
        err.message === 'OPENWEATHER_KEY_MISSING'
          ? 'OpenWeather 키가 없어 관측·대기질 샘플로 지도를 열었습니다.'
          : '실시간 관측을 가져오지 못해 샘플 기록으로 지도를 열었습니다.'
    } finally {
      loading.value = false
    }
  }

  const hoverRegion = (id) => {
    hoveredRegionId.value = id
  }

  const selectRegion = (id) => {
    selectedRegionId.value = id
    hoveredRegionId.value = id
  }

  const clearSelection = () => {
    selectedRegionId.value = null
    hoveredRegionId.value = null
  }

  return {
    selectedRegionId,
    hoveredRegionId,
    weatherByRegion,
    loading,
    error,
    usedFallback,
    selectedRegion,
    hoveredRegion,
    selectedWeather,
    hoveredWeather,
    selectedDna,
    unit,
    unitSymbol,
    mapLayer,
    airLayerOn,
    displayTemp,
    setUnit,
    setMapLayer,
    loadAll,
    hoverRegion,
    selectRegion,
    clearSelection,
  }
})
