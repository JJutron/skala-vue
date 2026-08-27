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

export const fetchCurrentByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: requireKey(),
      units: 'metric',
      lang: 'kr',
    },
    timeout: 8000,
  })
  return response.data
}

export const fetchAirPollutionByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/air_pollution`, {
    params: {
      lat,
      lon,
      appid: requireKey(),
    },
    timeout: 8000,
  })
  return response.data
}
