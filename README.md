# skala-vue

SKALA Full-Stack Engineering — Vue.js 실습 저장소.
따라 치다 같은 파일을 덮어써서 Day 1~3을 폴더로 나눠 두었습니다.
Code Challenge(지시자, Composition API, 컴포넌트, Element Plus)와 Hands on 날씨 Mockup / Composition / Component / Router / Pinia / Axios까지 넣었습니다.
날씨 데이터는 서울, 수원, 부산에 안성을 더한 4개 도시입니다.

## 실행 방법

폴더마다 Vite 프로젝트가 따로 있습니다.

```bash
cd day1   # 또는 day2, day3
npm install
npm run dev
```

- Node 22.18+ / 24.12+ (`package.json` engines 기준)
- 빌드: `npm run build` · 미리보기: `npm run preview`

day3에 Vue Router, Pinia, Axios가 들어 있습니다. `/` 대시보드, `/weather/:cityId` 상세, `/about` 소개, `/stats` 통계, 없는 주소는 404입니다.
실시간 날씨는 `.env`의 `VITE_OPENWEATHER_KEY`가 있어야 하고, 예시는 `day3/.env.example`입니다.

## 폴더 구조

```
day1/                                # Code Challenge
├── src/main.js                      # Pinia, Element Plus
├── src/App.vue                      # 지시자 ~ 슬롯, Pinia/Axios, Element Plus 카드 3개
└── src/components/
    ├── LifeCycleDemo.vue
    ├── PropsEmitsChild.vue
    ├── SlotDefaultChild.vue
    ├── NamedSlot.vue
    └── ScoppedSlot.vue              # 파일명 오타 그대로

day2/                                # Hands on 날씨 1~3
├── src/App.vue                      # 상태 소유 (검색, 필터, watch)
└── src/components/
    ├── BaseDashboardCard.vue
    ├── SearchBar.vue
    └── WeatherCard.vue

day3/                                # Hands on Router / Pinia / Axios
├── .env.example                     # VITE_OPENWEATHER_KEY
├── src/main.js                      # router, createPinia()
├── src/App.vue                      # RouterLink, UnitToggler
├── src/router/index.js              # Lazy Loading, Catch-all
├── src/stores/configStore.js        # 기온 단위
├── src/api/openWeather.js
├── src/api/wikipedia.js
├── src/data/weather.js              # mock 4도시
├── src/data/cityMeta.js             # 좌표, 위키 제목
├── src/components/UnitToggler.vue
├── src/components/exercise/         # SearchBar, WeatherCard, WeatherCard4
└── src/views/
    ├── WeatherHomeView.vue
    ├── WeatherDetailView.vue
    ├── WeatherAboutView.vue
    ├── WeatherStatsView.vue         # 추가 view
    └── NotFoundView.vue
```

## 과제별 정리

### Code Challenge Vue Syntax — `day1/src/App.vue`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | Reactivity · Text Interpolation · v-html / XSS / v-text · v-bind(Basic, Class, Style, Shorthand) · v-if / v-else-if / v-else / v-show · v-for · v-on · Event Object · Event Modifier · v-model · Form 매핑 · v-model Modifiers · scoped style |
| 튜닝 | `.columns` / `.column`으로 칸을 나눔. PDF의 v-pre / v-cloak / v-once / v-memo는 이번 App.vue에 넣지 않음 |

### Code Challenge Composition API — `day1/src/App.vue`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | ref · reactive · computed · watch · Multi-Source Watch · Deep Watch · reactive watch · watchEffect |
| 튜닝 | 일반 함수와 computed를 나란히 두고 콘솔로 재계산 차이를 봄 |

### Code Challenge Vue Components — `day1/src/components/`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | Lifecycle Hook · Props & Emits · Default / Named / Scoped Slot |
| 튜닝 | Scoped Slot 파일명을 `ScoppedSlot.vue`로 둔 채 제출 |

### Code Challenge UI Libraries — `day1/src/App.vue`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | Element Plus 전역 등록. 회원가입(`el-input`, `el-switch`, `ElMessage`). 수량·별점(`el-input-number`, `el-rate`). 삭제 확인·진행률(`ElMessageBox`, `el-progress`) |
| 튜닝 | 새 `.vue`는 안 만들고 `App.vue` 맨 아래 `.column`에 붙임. day1에 라우터가 없어 PDF `main.js`의 router는 빼 둠 |

1번 헤더는 회원가입, 함수명은 `handleResgister`입니다. 2번 헤더는 상품 수량 및 평점 선택이고 `el-rate`에 `show-score`를 넣었습니다. 3번 헤더는 파일 작업입니다. 날씨 Hands on UI Library는 아직 없습니다.

### 01 날씨 Mockup — `day2/src/App.vue`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | `v-for` + `:key` id · 25도 기준 `v-if` 라벨 · `:value` / `@input` 한글 검색 · 카드 클릭 상태바 · `@click.stop` 상세보기 `window.alert` |
| 튜닝 | 안성 데이터 추가. PDF 문구는 선선함, 화면 라벨은 신선함 |

한글 입력은 IME 조합 때문에 `v-model`이 한 박자 늦을 수 있어서, 검색은 `:value` + `@input`으로 맞춤.

### 02 날씨 컴포지션 — `day2/src/App.vue`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | searchQuery / selectedCityInfo / weatherList · `computed` 필터(filteredWeatherList) · `watch`(selectedCityInfo) · `watchEffect`(searchQuery) · 원본 / 일치 / 없음 3분기 |
| 튜닝 | 검색 결과 건수 `resultCount` computed 추가 |

### 03 날씨 컴포넌트 — `day2/src/components/`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | 기능 변경 없이 분리 · 부모가 상태 소유 · props 아래, emits 위 · `style scoped` |
| 튜닝 | PDF의 WeatherParent.vue는 안 만들고 day2 `App.vue`가 그 역할. 초록 상태바 유지 |

slot으로 넣은 SearchBar, WeatherCard는 카드 안에 보이지만 부모 스코프에서 컴파일되므로 `App.vue`와 바로 묶입니다.

### 04 Router 활용 — `day3/`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | 지연 로딩 · Catch-all · RouterLink / RouterView · WeatherHomeView가 대시보드 · 상세보기 alert 제거 후 `router.push('/weather/' + id)` · cityId로 onMounted 때 mock 선택 · About과 돌아가기 · 추가 view |
| 구성 | 화면은 `() => import()` · 404는 `/:pathMatch(.*)*` · 카드 3개는 `components/exercise/` |

- 추가 view는 `/stats` (`WeatherStatsView.vue`). 평균 기온, 가장 더운 곳(안성), 가장 선선한 곳(수원)
- 도시 목록은 `src/data/weather.js`로 모았고 상세에 습도, 바람 필드를 넣음

### 05 Pinia 단위 스토어 — `day3/src/stores/configStore.js`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | `config` 스토어에 unit, unitSymbol, toggleUnit. 내비에 UnitToggler. 카드·상세 기온이 스토어 단위를 따름 |
| 튜닝 | 과제 3은 지우지 않고 홈 아래에 과제 4 칸을 복제함. 단위가 바뀌는 카드는 `WeatherCard4.vue` |

### 06 Axios Hands on — `day3/`

| 구분 | 내용 |
| ---- | ---- |
| 요구사항 | OpenWeather Current로 실제 기온. Forecast로 상세 예보. OpenWeather가 아닌 외부 API로 확장 |
| 튜닝 | 과제 5 칸을 과제 4 밑에 둠. 키는 `.env`의 `VITE_OPENWEATHER_KEY`. 다른 API는 Wikipedia REST 요약. 예보는 앞 8칸(24시간). 좌표·위키 제목은 `cityMeta.js` |

키가 없으면 과제 5와 예보만 안내 문구가 나옵니다. 과제 3·4 mock은 그대로입니다. Element Plus는 day1 Code Challenge에만 넣었고, 날씨 앱 Hands on에는 아직 없습니다.
