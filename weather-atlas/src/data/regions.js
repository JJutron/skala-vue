import mapPaths from './koreaMapPaths.json'

export const koreaViewBox = '90 20 800 980'

const pathOf = (code) => {
  for (const items of Object.values(mapPaths.groups)) {
    const found = items.find((item) => item.id === code)
    if (found) return [found.d]
  }
  return []
}

const LABEL_NUDGE = {
  KR42: { x: 575, y: 248 },
  KR41: { x: 448, y: 278 },
  KR46: { x: 372, y: 668 },
}

const labelOf = (code) => {
  if (LABEL_NUDGE[code]) return LABEL_NUDGE[code]
  const found = mapPaths.labels.find((item) => item.id === code)
  return found ? { x: found.x, y: found.y } : { x: 0, y: 0 }
}

const defineRegion = (spec) => ({
  ...spec,
  paths: pathOf(spec.code),
  label: labelOf(spec.code),
})

export const regions = [
  defineRegion({
    id: 'gangwon',
    code: 'KR42',
    name: '강원',
    fullName: '강원특별자치도',
    english: 'GANGWON',
    lat: 37.8813,
    lon: 127.7298,
    motif: 'ridge',
    kind: 'do',
  }),
  defineRegion({
    id: 'gyeonggi',
    code: 'KR41',
    name: '경기',
    fullName: '경기도',
    english: 'GYEONGGI',
    lat: 37.2636,
    lon: 127.0286,
    motif: 'basin',
    kind: 'do',
  }),
  defineRegion({
    id: 'seoul',
    code: 'KR11',
    name: '서울',
    fullName: '서울특별시',
    english: 'SEOUL',
    lat: 37.5665,
    lon: 126.978,
    motif: 'core',
    kind: 'metro',
  }),
  defineRegion({
    id: 'incheon',
    code: 'KR28',
    name: '인천',
    fullName: '인천광역시',
    english: 'INCHEON',
    lat: 37.4563,
    lon: 126.7052,
    motif: 'coast',
    kind: 'metro',
  }),
  defineRegion({
    id: 'chungbuk',
    code: 'KR43',
    name: '충북',
    fullName: '충청북도',
    english: 'CHUNGBUK',
    lat: 36.6424,
    lon: 127.489,
    motif: 'plain',
    kind: 'do',
  }),
  defineRegion({
    id: 'chungnam',
    code: 'KR44',
    name: '충남',
    fullName: '충청남도',
    english: 'CHUNGNAM',
    lat: 36.5184,
    lon: 126.8,
    motif: 'plain',
    kind: 'do',
  }),
  defineRegion({
    id: 'sejong',
    code: 'KR50',
    name: '세종',
    fullName: '세종특별자치시',
    english: 'SEJONG',
    lat: 36.48,
    lon: 127.289,
    motif: 'core',
    kind: 'metro',
  }),
  defineRegion({
    id: 'daejeon',
    code: 'KR30',
    name: '대전',
    fullName: '대전광역시',
    english: 'DAEJEON',
    lat: 36.3504,
    lon: 127.3845,
    motif: 'core',
    kind: 'metro',
  }),
  defineRegion({
    id: 'jeonbuk',
    code: 'KR45',
    name: '전북',
    fullName: '전북특별자치도',
    english: 'JEONBUK',
    lat: 35.8242,
    lon: 127.148,
    motif: 'plain',
    kind: 'do',
  }),
  defineRegion({
    id: 'jeonnam',
    code: 'KR46',
    name: '전남',
    fullName: '전라남도',
    english: 'JEONNAM',
    lat: 34.8161,
    lon: 126.4629,
    motif: 'coast',
    kind: 'do',
  }),
  defineRegion({
    id: 'gwangju',
    code: 'KR29',
    name: '광주',
    fullName: '광주광역시',
    english: 'GWANGJU',
    lat: 35.1595,
    lon: 126.8526,
    motif: 'core',
    kind: 'metro',
  }),
  defineRegion({
    id: 'gyeongbuk',
    code: 'KR47',
    name: '경북',
    fullName: '경상북도',
    english: 'GYEONGBUK',
    lat: 36.5684,
    lon: 128.7294,
    motif: 'ridge',
    kind: 'do',
  }),
  defineRegion({
    id: 'gyeongnam',
    code: 'KR48',
    name: '경남',
    fullName: '경상남도',
    english: 'GYEONGNAM',
    lat: 35.2383,
    lon: 128.6924,
    motif: 'sea',
    kind: 'do',
  }),
  defineRegion({
    id: 'daegu',
    code: 'KR27',
    name: '대구',
    fullName: '대구광역시',
    english: 'DAEGU',
    lat: 35.8714,
    lon: 128.6014,
    motif: 'core',
    kind: 'metro',
  }),
  defineRegion({
    id: 'ulsan',
    code: 'KR31',
    name: '울산',
    fullName: '울산광역시',
    english: 'ULSAN',
    lat: 35.5384,
    lon: 129.3114,
    motif: 'sea',
    kind: 'metro',
  }),
  defineRegion({
    id: 'busan',
    code: 'KR26',
    name: '부산',
    fullName: '부산광역시',
    english: 'BUSAN',
    lat: 35.1796,
    lon: 129.0756,
    motif: 'sea',
    kind: 'metro',
  }),
  defineRegion({
    id: 'jeju',
    code: 'KR49',
    name: '제주',
    fullName: '제주특별자치도',
    english: 'JEJU',
    lat: 33.4996,
    lon: 126.5312,
    motif: 'island',
    kind: 'do',
  }),
]

export const regionEnterOrder = [
  'gangwon',
  'gyeonggi',
  'seoul',
  'incheon',
  'chungbuk',
  'chungnam',
  'sejong',
  'daejeon',
  'gyeongbuk',
  'jeonbuk',
  'daegu',
  'jeonnam',
  'gwangju',
  'gyeongnam',
  'ulsan',
  'busan',
  'jeju',
]

export const findRegion = (id) => regions.find((region) => region.id === id) ?? null
