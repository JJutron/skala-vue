/** Per-region landmark plates under /public/scenes/regions/ */
export const regionScenes = {
  gangwon: {
    label: '설악산',
    src: '/scenes/regions/gangwon.jpg',
  },
  gyeonggi: {
    label: '수원 화성',
    src: '/scenes/regions/gyeonggi.jpg',
  },
  seoul: {
    label: '경복궁 경회루',
    src: '/scenes/regions/seoul.jpg',
  },
  incheon: {
    label: '인천대교',
    src: '/scenes/regions/incheon.jpg',
  },
  chungbuk: {
    label: '단양 도담삼봉',
    src: '/scenes/regions/chungbuk.jpg',
  },
  chungnam: {
    label: '공주 공산성',
    src: '/scenes/regions/chungnam.jpg',
  },
  sejong: {
    label: '세종호수공원',
    src: '/scenes/regions/sejong.jpg',
  },
  daejeon: {
    label: '엑스포과학공원',
    src: '/scenes/regions/daejeon.jpg',
  },
  jeonbuk: {
    label: '전주한옥마을',
    src: '/scenes/regions/jeonbuk.jpg',
  },
  jeonnam: {
    label: '순천만',
    src: '/scenes/regions/jeonnam.jpg',
  },
  gwangju: {
    label: '무등산',
    src: '/scenes/regions/gwangju.jpg',
  },
  gyeongbuk: {
    label: '경주 불국사',
    src: '/scenes/regions/gyeongbuk.jpg',
  },
  gyeongnam: {
    label: '통영 케이블카',
    src: '/scenes/regions/gyeongnam.jpg',
  },
  daegu: {
    label: '팔공산',
    src: '/scenes/regions/daegu.jpg',
  },
  ulsan: {
    label: '간절곶',
    src: '/scenes/regions/ulsan.jpg',
  },
  busan: {
    label: '광안대교',
    src: '/scenes/regions/busan.jpg',
  },
  jeju: {
    label: '성산일출봉',
    src: '/scenes/regions/jeju.jpg',
  },
}

export const sceneForRegion = (region) => {
  if (!region?.id) return null
  return regionScenes[region.id] ?? null
}
