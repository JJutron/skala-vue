# skala-vue

SKALA Full-Stack Engineering — Vue.js 실습 저장소.

메인 앱 **기상도 (Weather Atlas)** 는 대한민국 17개 시·도 지도에서 지역별 날씨·대기질을 확인합니다.
같은 저장소에 Hands-on 날씨 대시보드 실습과 Code Challenge(지시자, Composition API, 컴포넌트, Element Plus)가 들어 있습니다.

Hands-on mock 데이터는 서울, 수원, 부산, 안성 4개 도시입니다.

## 실행 방법

메인 앱은 `weather-atlas/` 에서 실행합니다.

```bash
cd weather-atlas
cp .env.example .env   # VITE_OPENWEATHER_KEY 입력
npm install
npm run dev
```

- Node 22.18+ / 24.12+ (`weather-atlas/package.json` engines 기준)
- 빌드: `npm run build` · 미리보기: `npm run preview`
- 의존성: Vue 3, Vue Router, Pinia, Axios, Anime.js, Element Plus

실시간 날씨·대기질은 `.env`의 `VITE_OPENWEATHER_KEY`가 필요합니다.
예시는 `weather-atlas/.env.example`입니다. 키가 없거나 요청이 실패하면 샘플 데이터로 지도가 열립니다.

Hands-on / Code Challenge 원본은 각각 `handsOn/`, `codeChallenge/` 에서도 단독 실행할 수 있습니다.

```bash
cd handsOn        # 또는 codeChallenge
npm install
npm run dev
```

## 라우트

| 경로 | 설명 |
| ---- | ---- |
| `/` | 기상도 홈 — 한반도 지도, 지역 상세 |
| `/archive` | 실습 아카이브 목록 |
| `/archive/live` | Hands-on 라이브 실습 (`#hw-01` …) |
| `/archive/live/weather/:cityId` | Hands-on 도시 상세 |
| `/archive/live/about` | Hands-on 소개 |
| `/archive/live/stats` | Hands-on 통계 |
| `/challenge` | Code Challenge |

헤더: **기상도**(로고) · **지도** · **실습 아카이브** · **코드 챌린지**

- 첫 방문 / **기상도** 로고 → 「기상도」 붓글씨 히어로 후 지도
- **지도** 메뉴 → 히어로 없이 바로 지도

## 폴더 구조

```
skala-vue/
├── weather-atlas/                 # 메인 기상도 (Vite)
│   ├── public/
│   │   ├── scenes/                # 모티프 장면 + regions/ 지역별 랜드마크
│   │   └── archive/               # 아카이브 미리보기 이미지
│   ├── src/
│   │   ├── components/
│   │   │   ├── intro/             # BrushTitleIntro 붓글씨 히어로
│   │   │   ├── map/               # KoreaMap, MapRegion, RegionTooltip
│   │   │   ├── weather/           # Scene, DNA, Particles, Unit/MapLayer 토글
│   │   │   ├── layout/            # AppHeader, BrandMark
│   │   │   └── archive/ · hands-on/
│   │   ├── composables/           # useWeatherAnimation, brushIntroGate
│   │   ├── data/                  # regions, regionScenes, archiveItems
│   │   ├── services/              # weatherApi, weatherMapper, weatherDna
│   │   ├── stores/                # Pinia weatherStore
│   │   ├── views/                 # Home, archive, challenge
│   │   ├── legacy/                # Hands-on · Challenge 원본 이식본
│   │   └── router/
│   ├── vercel.json                # SPA rewrite
│   └── .env.example
├── vercel.json                    # GitHub→Vercel: weather-atlas 빌드
├── design-system/weather-atlas/   # MASTER 디자인 토큰·시그니처
├── handsOn/                       # Hands-on 원본 프로젝트
└── codeChallenge/                 # Code Challenge 원본 프로젝트
```

## 프로젝트 구성

```
SKALA Vue
│
├── Weather Atlas (기상도)
│   ├── 붓글씨 히어로 + 해안선 brush-draw
│   ├── 17개 시·도 인터랙티브 지도
│   ├── 날씨 / 대기질(AQI·PM) 레이어
│   ├── ℃ / ℉ · 지역별 랜드마크 장면
│   └── Weather DNA · 파티클
│
├── Hands-on Archive  (/archive, /archive/live)
│   ├── Mockup · Composition · Component
│   ├── Router · Pinia · Axios
│   └── Element Plus
│
└── Code Challenge  (/challenge)
    └── 지시자 · 슬롯 · Pinia · Axios · Element Plus
```

## Weather Atlas 기능

### 지도·연출
- Anime.js로 한반도 해안선 `strokeDashoffset` 드로잉 후 먹 채움
- 지역 선택 시 지도가 살짝 확대되며 오른쪽에 상세 패널
- 상세 패널: 기온, 하늘 상태, 지역 랜드마크 사진, DNA 문장, 습도·바람·체감·대기질·PM2.5·PM10

### 토글 (홈 상단)
- **℃ / ℉** — 기온 단위
- **날씨 / 대기** — 지도 fill을 수묵 단색 ↔ OpenWeather AQI(1–5) 색상으로 전환

### API
- Current Weather: `GET /data/2.5/weather`
- Air Pollution: `GET /data/2.5/air_pollution`
- 좌표는 `src/data/regions.js`의 17개 지역 `lat` / `lon`
- 변환: `services/weatherMapper.js` → Pinia `weatherStore`

```
사용자 → 지도 지역 선택
       → weatherStore.loadAll / 선택 상태
       → OpenWeather (weather + air)
       → normalize → WeatherScene / DNA / 메트릭
```

```
API 요청
 ├── 성공 → 실시간 관측·대기질
 └── 실패 / 키 없음 → 샘플 데이터로 계속 표시
```

### 지역별 랜드마크
`src/data/regionScenes.js` + `public/scenes/regions/{id}.jpg`  
(예: 서울 경회루, 강원 설악산, 제주 성산일출봉, 부산 해운대 등)

### 디자인
수묵 산수 야경 — Sumi / Hanji / Celadon / Cinnabar / Moon  
Display: Song Myung · UI: Noto Sans KR  
자세한 토큰: `design-system/weather-atlas/MASTER.md`

## 배포 (Vercel)

- 루트 `vercel.json`이 `weather-atlas`를 install / build / `dist`로 지정
- Environment Variable: `VITE_OPENWEATHER_KEY` (빌드 시 주입 → Redeploy 필요)
- SPA를 위해 `/` → `index.html` rewrite

---

## 과제별 정리

## Hands-on 과제

Hands-on은 Vue의 주요 기능을 하나씩 실제 날씨 대시보드에 적용하면서,
기본 문법부터 컴포넌트, Router, Pinia, Axios, UI Library까지 단계적으로 확장하는 실습입니다.

앱에서는 **실습 아카이브**(`/archive`)와 라이브 화면(`/archive/live`)으로 열 수 있고,
원본 프로젝트는 `handsOn/` 폴더에 있습니다.
아래 번호는 학습 순서 기준입니다. (아카이브 UI의 카드 번호와 일부 순서가 다를 수 있습니다.)


### 01 날씨 Mockup 

| 구분 | 내용 |
| ---- | ---- |
| 목표 | Vue 기본 문법과 이벤트 처리를 활용해 날씨 대시보드 화면 구현 |
| 요구사항 | `v-for` + `:key`로 도시 목록 렌더링 · `v-if`로 기온에 따른 상태 표시 · `:value` / `@input`으로 도시 검색 · 카드 선택 상태 관리 · `@click.stop`으로 상세보기 이벤트 분리 |
| 데이터 | 서울, 수원, 부산, 안성 4개 도시의 mock 날씨 데이터 |
| 학습 포인트 | Vue의 템플릿 문법과 반응형 상태를 실제 화면의 검색, 목록, 선택 기능에 연결 |

첫 번째 Hands-on에서는 별도의 API 없이 미리 준비된 날씨 데이터를 이용해
기본적인 날씨 대시보드를 구현합니다.

도시 목록은 `v-for`를 이용해 반복 출력하고 각 항목에는 도시의 `id`를 `:key`로 지정합니다.

각 도시의 현재 기온에 따라 다른 상태 라벨을 표시하기 위해
`v-if` / `v-else`를 사용합니다.

검색창에 도시 이름을 입력하면 해당 도시를 찾을 수 있도록 검색 기능을 구현합니다.
한글 입력에서는 IME 조합 과정으로 인해 `v-model`을 사용할 때 입력값 반영이 한 박자 늦어질 수 있으므로,
이 실습에서는 `:value`와 `@input`을 이용해 입력값을 직접 처리합니다.

도시 카드를 클릭하면 선택된 도시를 화면에서 확인할 수 있도록 상태를 변경합니다.
카드 내부의 상세보기 버튼은 `@click.stop`을 사용하여
버튼을 클릭했을 때 카드 클릭 이벤트까지 함께 발생하지 않도록 처리합니다.


### 02 날씨 컴포지션

| 구분 | 내용 |
| ---- | ---- |
| 목표 | 기존 날씨 Mockup의 상태와 로직을 Composition API로 구성 |
| 요구사항 | `ref`를 이용한 상태 관리 · `computed`를 이용한 검색 결과 계산 · `watch`로 선택 도시 변경 감지 · `watchEffect`로 검색 상태 변화 확인 · 검색 결과에 따른 화면 상태 분기 |
| 주요 상태 | `searchQuery` · `selectedCityInfo` · `weatherList` |
| 주요 computed | `filteredWeatherList` · `resultCount` |
| 학습 포인트 | 상태, 계산된 값, 상태 변화 감지를 각각 적절한 Composition API로 분리 |

01번에서 구현한 날씨 화면의 기능은 유지하면서
화면 내부의 상태 관리와 로직을 Composition API 방식으로 변경합니다.

검색어는 `ref`로 관리하고,
검색어에 따라 실제 화면에 표시할 도시 목록은 `computed`로 계산합니다.

검색 결과는 다음과 같이 처리합니다.

- 검색어가 없는 경우 → 전체 도시 목록 표시
- 검색 결과가 있는 경우 → 검색어와 일치하는 도시만 표시
- 검색 결과가 없는 경우 → 검색 결과 없음 메시지 표시

선택된 도시가 변경되면 `watch`를 이용해 변화를 감지합니다.

`watchEffect`를 이용해서는 검색어와 같이 반응형 데이터가 변경될 때
관련 로직이 자동으로 다시 실행되는 과정을 확인합니다.

검색 결과의 개수는 `resultCount`라는 `computed`로 만들어
현재 몇 개의 도시가 검색되었는지 화면에 표시합니다.


### 03 날씨 컴포넌트 

| 구분 | 내용 |
| ---- | ---- |
| 목표 | 하나의 화면에 작성된 날씨 기능을 역할별 Vue 컴포넌트로 분리 |
| 요구사항 | `SearchBar` · `WeatherCard` · `BaseDashboardCard`로 화면 분리 · Props로 데이터 전달 · Emits로 이벤트 전달 · 부모가 주요 상태를 관리 · `style scoped` 적용 |
| 구성 | `SearchBar`는 검색 입력 · `WeatherCard`는 도시별 날씨 표시 · `BaseDashboardCard`는 공통 카드 레이아웃 담당 |
| 학습 포인트 | 컴포넌트 분리와 부모-자식 간 데이터 흐름 이해 |

02번까지 구현한 날씨 화면을 기능별 컴포넌트로 나눕니다.

검색창은 `SearchBar.vue`,
도시별 날씨 정보는 `WeatherCard.vue`,
여러 카드에서 공통으로 사용할 수 있는 카드 구조는
`BaseDashboardCard.vue`로 분리합니다.

컴포넌트를 분리하더라도 검색어와 선택된 도시 같은 주요 상태는 부모 컴포넌트가 가지고 있도록 합니다.

부모가 자식에게 데이터를 전달할 때는 `props`를 사용하고,
자식에서 발생한 사용자 이벤트를 부모에게 전달할 때는 `emit`을 사용합니다.

기본적인 데이터 흐름은 다음과 같습니다.

`Parent → Props → Child`

`Child → Emit → Parent`

따라서 단순히 코드를 여러 파일로 나누는 것이 아니라,
각 컴포넌트가 어떤 데이터를 소유하고 어떤 데이터를 전달받는지 구분하도록 합니다.

`SearchBar`와 `WeatherCard`는 각각 자신의 역할에 집중하고,
화면 전체의 상태와 데이터 흐름은 부모 컴포넌트에서 관리합니다.

각 컴포넌트의 스타일에는 `style scoped`를 적용하여
한 컴포넌트의 스타일이 다른 컴포넌트에 영향을 주지 않도록 구성합니다.

### 04 Router 활용

| 구분 | 내용 |
| ---- | ---- |
| 목표 | 하나의 날씨 화면을 여러 페이지로 구성하고 URL을 이용한 페이지 이동 구현 |
| 요구사항 | Vue Router 설치 · `RouterLink` / `RouterView` 사용 · Lazy Loading · Catch-all 404 · 도시 상세 페이지 · About 페이지 · 기존 상세보기 alert를 Router 이동으로 변경 |
| 주요 경로 | `/` 대시보드 · `/weather/:cityId` 도시 상세 · `/about` 소개 · `/stats` 통계 · 잘못된 주소 → 404 |
| 학습 포인트 | View와 URL을 연결하고 동적 route parameter를 이용해 상세 데이터를 선택 |

03번까지 하나의 화면에서 동작하던 날씨 서비스를
Vue Router를 이용해 여러 페이지로 확장합니다.

홈 화면은 `/` 경로의 `WeatherHomeView.vue`로 구성합니다.

기존 날씨 카드의 상세보기 버튼을 클릭하면
더 이상 `window.alert`를 사용하지 않고
`/weather/:cityId` 형태의 상세 페이지로 이동합니다.

예를 들어 다음과 같이 도시별 상세 페이지를 구성할 수 있습니다.

`/weather/seoul`  
`/weather/suwon`  
`/weather/busan`  
`/weather/anseong`

상세 페이지에서는 URL의 `cityId`를 확인한 뒤
해당 도시의 mock 데이터를 선택하여 화면에 표시합니다.

각 View는 `() => import()` 형태의 Lazy Loading을 적용합니다.

존재하지 않는 URL은 Catch-all route를 이용해
`NotFoundView.vue`로 연결합니다.

추가로 `/about`에는 서비스 및 실습에 대한 소개 화면을 구성하고,
`/stats`에서는 현재 날씨 mock 데이터를 활용해
평균 기온, 가장 더운 도시, 가장 선선한 도시 등의 간단한 통계를 보여줍니다.


### 05 Store 적용 

| 구분 | 내용 |
| ---- | ---- |
| 목표 | 여러 컴포넌트에서 공유하는 상태를 Pinia Store로 관리 |
| 요구사항 | `config` Store 생성 · `unit` / `unitSymbol` 상태 관리 · `toggleUnit` 액션 구현 · `UnitToggler` 컴포넌트 추가 · 카드와 상세 페이지에서 Store 사용 |
| 공유 상태 | 섭씨 / 화씨 온도 단위 |
| 학습 포인트 | 컴포넌트 간에 공유해야 하는 상태를 중앙 Store에서 관리 |

날씨 카드와 상세 페이지에서 사용하는 온도 단위를
Pinia를 이용해 전역 상태로 관리합니다.

기본 단위는 섭씨로 설정하고,
`UnitToggler`를 통해 섭씨와 화씨를 전환할 수 있도록 합니다.

Store에서는 현재 선택된 단위와 단위 기호를 관리하고,
단위를 변경하는 `toggleUnit` 액션을 제공합니다.

홈 화면의 날씨 카드와 상세 페이지는 각각 별도의 단위를 가지고 있지 않고
동일한 Pinia Store를 사용합니다.

따라서 한 화면에서 온도 단위를 변경하면
다른 화면에서도 동일한 설정을 사용할 수 있습니다.



### 06 데이터 연동 

| 구분 | 내용 |
| ---- | ---- |
| 목표 | mock 데이터로 구성한 날씨 서비스를 실제 외부 API와 연결 |
| 요구사항 | Axios 설치 · OpenWeather Current Weather API 호출 · 도시별 현재 날씨 조회 · Forecast API를 이용한 상세 예보 조회 · 외부 API 응답을 화면에 표시 |
| API | OpenWeather Current Weather · OpenWeather Forecast · Wikipedia REST API |
| 환경변수 | `VITE_OPENWEATHER_KEY` |
| 학습 포인트 | API 호출을 별도 모듈로 분리하고 비동기 데이터의 Loading / Success / Error 상태를 처리 |

기존까지 사용하던 `src/data/weather.js`의 mock 데이터를 기반으로 한 화면을
실제 OpenWeather API와 연결합니다.

API Key는 코드에 직접 작성하지 않고
`.env` 파일의 `VITE_OPENWEATHER_KEY`를 통해 관리합니다.

현재 날씨는 OpenWeather Current Weather API를 사용하고,
도시 상세 페이지에서는 Forecast API를 이용해 시간대별 예보를 표시합니다.

API 호출 코드는 View에 직접 작성하지 않고
`src/api/openWeather.js`로 분리합니다.

이를 통해 화면을 담당하는 View와
외부 API와 통신하는 코드를 구분합니다.

API 요청 과정에서는 최소한 다음 상태를 고려합니다.

- 요청 중 → Loading 표시
- 요청 성공 → 날씨 데이터 표시
- 요청 실패 → 오류 메시지 표시

상세 예보는 API에서 반환되는 모든 데이터를 그대로 출력하지 않고
앞 8개 항목을 사용하여 약 24시간의 예보를 보여줍니다.

도시별 좌표와 Wikipedia 검색에 필요한 정보는
`src/data/cityMeta.js`에서 관리합니다.

또한 Wikipedia REST API를 이용해
각 도시의 간단한 소개 정보를 함께 표시합니다.



### 07 Element Plus 

| 구분 | 내용 |
| ---- | ---- |
| 목표 | UI Component Library를 적용하여 Vue에서 제공하는 UI 컴포넌트 활용 |
| 요구사항 | `element-plus` 설치 및 전역 등록 · 회원가입 Form · 수량 입력 · 별점 · 삭제 Confirm · Progress |
| 실습 1 | 이메일과 약관 동의 여부를 확인하는 회원가입 Form |
| 실습 2 | 수량 입력과 별점 컴포넌트 |
| 실습 3 | 삭제 Confirm과 동기화 Progress |
| 학습 포인트 | Element Plus 컴포넌트의 속성과 이벤트를 활용해 실제 UI 기능 구현 |

마지막 Hands-on에서는 Element Plus를 적용하여
기존에 직접 HTML/CSS로 구현하던 UI 기능을
UI Component Library를 이용해 구성합니다.

먼저 `element-plus`를 설치하고 `main.js`에서 전역으로 등록합니다.

실습 1에서는 회원가입 Form을 구성합니다.

이메일에 `@`가 포함되어 있지 않거나
약관 동의가 되어 있지 않은 경우에는 회원가입을 진행하지 않고
사용자에게 메시지를 표시합니다.

실습 2에서는 수량 입력과 별점 기능을 구현합니다.

수량은 최대 10개까지만 입력할 수 있도록 제한하고,
현재 선택한 별점은 `{value} 점` 형태로 화면에 함께 표시합니다.

실습 3에서는 삭제 버튼을 눌렀을 때
바로 삭제하지 않고 Confirm을 먼저 표시하도록 구성합니다.

동기화 버튼을 누르면 Progress가 20%씩 증가하도록 하여
사용자의 동작과 UI 컴포넌트의 상태 변화를 함께 확인합니다.
