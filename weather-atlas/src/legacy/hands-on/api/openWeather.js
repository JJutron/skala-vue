import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getOpenWeatherKey = () =>
  import.meta.env.VITE_OPENWEATHER_KEY?.trim() ?? ''

const requireKey = () => {
  const appid = getOpenWeatherKey()
  if (!appid) {
    throw new Error('OPENWEATHER_KEY_MISSING')
  }
  return appid
}

export const mapCurrentWeather = (meta, data) => ({
  id: meta.id,
  name: meta.name,
  temp: Math.round(data.main.temp),
  status: data.weather[0].description,
  humidity: data.main.humidity,
  wind: data.wind.speed,
})

export const fetchCurrentByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: requireKey(),
      units: 'metric',
      lang: 'kr',
    },
  })
  return response.data
}

export const fetchForecastByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: requireKey(),
      units: 'metric',
      lang: 'kr',
    },
  })
  return response.data
}

export const fetchLiveCities = async (metaList) => {
  const responses = await Promise.all(
    metaList.map((meta) => fetchCurrentByCoords(meta.lat, meta.lon)),
  )
  return metaList.map((meta, index) =>
    mapCurrentWeather(meta, responses[index]),
  )
}
