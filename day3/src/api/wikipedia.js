import axios from 'axios'

export const fetchWikiSummary = async (title) => {
  const encoded = encodeURIComponent(title)
  const response = await axios.get(
    `https://ko.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
    {
      headers: {
        'Api-User-Agent': 'skala-vue-weather-mockup/1.0 (classroom exercise)',
      },
    },
  )
  return response.data.extract ?? ''
}
