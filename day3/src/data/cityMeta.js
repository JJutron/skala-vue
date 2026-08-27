export const cityMetaList = [
  {
    id: 'city_01',
    name: '서울',
    lat: 37.5665,
    lon: 126.978,
    wikiTitle: '서울특별시',
  },
  {
    id: 'city_02',
    name: '수원',
    lat: 37.2636,
    lon: 127.0286,
    wikiTitle: '수원시',
  },
  {
    id: 'city_03',
    name: '부산',
    lat: 35.1796,
    lon: 129.0756,
    wikiTitle: '부산광역시',
  },
  {
    id: 'city_04',
    name: '안성',
    lat: 37.0078,
    lon: 127.2797,
    wikiTitle: '안성시',
  },
]

export const findCityMeta = (cityId) =>
  cityMetaList.find((item) => item.id === cityId) ?? null
