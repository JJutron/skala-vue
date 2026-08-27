export const WEATHER_TYPES = ['Clear', 'Rain', 'Snow', 'Wind', 'Clouds', 'Fog']

export const AQI_LABELS = {
  1: { key: 'good', ko: '좋음', en: 'Good' },
  2: { key: 'fair', ko: '양호', en: 'Fair' },
  3: { key: 'moderate', ko: '보통', en: 'Moderate' },
  4: { key: 'poor', ko: '나쁨', en: 'Poor' },
  5: { key: 'very_poor', ko: '매우 나쁨', en: 'Very Poor' },
}

/** OpenWeather AQI 1–5 choropleth (sumi-friendly, no purple). */
export const AQI_WASH = {
  1: { from: '#1c322c', to: '#3f7a68' },
  2: { from: '#2a3420', to: '#6a8a48' },
  3: { from: '#3a2e14', to: '#c4a04a' },
  4: { from: '#3a1e16', to: '#c45c48' },
  5: { from: '#2a1214', to: '#8f2834' },
  0: { from: '#2a241c', to: '#6a6358' },
}

export const airWashId = (aqi) => {
  const level = Number(aqi)
  if (level >= 1 && level <= 5) return `wash-aqi-${level}`
  return 'wash-aqi-0'
}

export const getWeatherType = (data) => {
  if (!data) return 'Clouds'

  const id = data.weather?.[0]?.id ?? 0
  const wind = data.wind?.speed ?? 0

  if (id >= 200 && id < 600) return 'Rain'
  if (id >= 600 && id < 700) return 'Snow'
  if (id >= 700 && id < 800) return 'Fog'
  if (id === 800) return wind >= 8 ? 'Wind' : 'Clear'
  if (id > 800) return wind >= 10 ? 'Wind' : 'Clouds'
  return wind >= 8 ? 'Wind' : 'Clouds'
}

export const normalizeAirPollution = (data) => {
  const sample = data?.list?.[0]
  if (!sample) return null

  const aqi = Number(sample.main?.aqi) || 0
  const components = sample.components ?? {}
  const label = AQI_LABELS[aqi] ?? { key: 'unknown', ko: '—', en: '—' }

  return {
    aqi,
    aqiLabel: label.ko,
    aqiKey: label.key,
    pm25: Math.round(Number(components.pm2_5 ?? 0) * 10) / 10,
    pm10: Math.round(Number(components.pm10 ?? 0) * 10) / 10,
    o3: Math.round(Number(components.o3 ?? 0) * 10) / 10,
    no2: Math.round(Number(components.no2 ?? 0) * 10) / 10,
    raw: sample,
  }
}

export const normalizeWeather = (region, data, airData = null) => {
  if (!data) return null

  const air = normalizeAirPollution(airData)

  return {
    regionId: region.id,
    name: region.name,
    english: region.english,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind: Number(data.wind?.speed ?? 0),
    clouds: data.clouds?.all ?? 0,
    precipitation: data.rain?.['1h'] ?? data.snow?.['1h'] ?? 0,
    condition: data.weather?.[0]?.description ?? '',
    conditionMain: data.weather?.[0]?.main ?? '',
    type: getWeatherType(data),
    air,
    raw: data,
  }
}
