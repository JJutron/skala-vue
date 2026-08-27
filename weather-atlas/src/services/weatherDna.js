const tempBand = (temp) => {
  if (temp <= 0) return { key: 'freezing', ko: '매우 춥고', short: '매우 추움', en: 'Freezing' }
  if (temp < 10) return { key: 'cold', ko: '춥고', short: '추움', en: 'Cold' }
  if (temp < 18) return { key: 'cool', ko: '선선하고', short: '선선', en: 'Cool' }
  if (temp < 24) return { key: 'mild', ko: '온화하고', short: '온화', en: 'Mild' }
  if (temp < 30) return { key: 'warm', ko: '따뜻하고', short: '따뜻', en: 'Warm' }
  return { key: 'hot', ko: '덥고', short: '더움', en: 'Hot' }
}

const humidityBand = (humidity) => {
  if (humidity < 40) return { key: 'dry', ko: '건조하며', short: '건조', en: 'Dry' }
  if (humidity < 70) return { key: 'balanced', ko: '습도가 알맞으며', short: '적정', en: 'Balanced' }
  return { key: 'humid', ko: '습하며', short: '습함', en: 'Humid' }
}

const windBand = (wind) => {
  if (wind < 2) return { key: 'still', ko: '바람이 거의 없는', short: '고요', en: 'Still' }
  if (wind < 6) return { key: 'breezy', ko: '바람이 느껴지는', short: '산들', en: 'Breezy' }
  return { key: 'windy', ko: '바람이 강한', short: '강함', en: 'Windy' }
}

const skyBand = (type) => {
  const map = {
    Clear: { key: 'clear', ko: '맑은', short: '맑음', en: 'Clear' },
    Rain: { key: 'rain', ko: '비 내리는', short: '비', en: 'Rain' },
    Snow: { key: 'snow', ko: '눈 내리는', short: '눈', en: 'Snow' },
    Wind: { key: 'wind', ko: '바람 부는', short: '바람', en: 'Wind' },
    Clouds: { key: 'clouds', ko: '구름 낀', short: '구름', en: 'Clouds' },
    Fog: { key: 'fog', ko: '안개 낀', short: '안개', en: 'Fog' },
  }
  return map[type] ?? map.Clouds
}

const airBand = (air) => {
  if (!air?.aqi) return null
  const map = {
    1: { key: 'good', ko: '공기가 맑은', short: '좋음', en: 'Good' },
    2: { key: 'fair', ko: '공기가 양호한', short: '양호', en: 'Fair' },
    3: { key: 'moderate', ko: '공기가 보통인', short: '보통', en: 'Moderate' },
    4: { key: 'poor', ko: '공기가 탁한', short: '나쁨', en: 'Poor' },
    5: { key: 'very_poor', ko: '공기가 매우 탁한', short: '매우 나쁨', en: 'Very Poor' },
  }
  return map[air.aqi] ?? null
}

export const buildWeatherDna = (weather) => {
  if (!weather) return null

  const temperature = tempBand(weather.temp)
  const humidity = humidityBand(weather.humidity)
  const wind = windBand(weather.wind)
  const sky = skyBand(weather.type)
  const air = airBand(weather.air)

  const sentence = air
    ? `오늘의 ${weather.name}은 ${temperature.ko} ${humidity.ko} ${wind.ko} ${sky.ko}, ${air.ko} 하루입니다.`
    : `오늘의 ${weather.name}은 ${temperature.ko} ${humidity.ko} ${wind.ko} ${sky.ko} 하루입니다.`

  return {
    temperature,
    humidity,
    wind,
    sky,
    air,
    sentence,
  }
}
