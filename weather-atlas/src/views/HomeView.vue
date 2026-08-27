<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weatherStore.js'
import {
  brushIntroTicket,
  pendingBrushIntro,
  skipBrushIntroOnce,
} from '../composables/brushIntroGate.js'
import BrushTitleIntro from '../components/intro/BrushTitleIntro.vue'
import KoreaMap from '../components/map/KoreaMap.vue'
import MapLayerToggle from '../components/weather/MapLayerToggle.vue'
import UnitToggle from '../components/weather/UnitToggle.vue'
import WeatherDNA from '../components/weather/WeatherDNA.vue'
import WeatherScene from '../components/weather/WeatherScene.vue'

const sky = {
  Clear: '맑음',
  Rain: '비',
  Snow: '눈',
  Wind: '바람',
  Clouds: '구름',
  Fog: '안개',
}

const store = useWeatherStore()
const {
  selectedRegion,
  selectedWeather,
  selectedDna,
  loading,
  error,
  selectedRegionId,
  unitSymbol,
} = storeToRefs(store)
const panel = ref(null)
const showIntro = ref(false)
const mapArmed = ref(false)

const playIntro = () => {
  showIntro.value = true
  mapArmed.value = false
}

const openMap = () => {
  showIntro.value = false
  mapArmed.value = true
}

const onIntroComplete = () => {
  openMap()
}

const consumeIntroRequest = () => {
  if (pendingBrushIntro.value) {
    pendingBrushIntro.value = false
    playIntro()
    return true
  }
  return false
}

onMounted(() => {
  if (consumeIntroRequest()) {
    // brand requested intro
  } else if (skipBrushIntroOnce.value) {
    skipBrushIntroOnce.value = false
    openMap()
  } else {
    // First visit / refresh: play hero
    playIntro()
  }
  store.loadAll()
})

watch(brushIntroTicket, () => {
  consumeIntroRequest()
})

watch(skipBrushIntroOnce, (skip) => {
  if (!skip) return
  // Already on home: 지도 clicked — dismiss hero / stay on map
  skipBrushIntroOnce.value = false
  openMap()
})

watch(selectedRegionId, async (id) => {
  if (!id) return
  await nextTick()
  if (window.matchMedia('(max-width: 1100px)').matches) {
    panel.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
})
</script>

<template>
  <section class="home" :class="{ exploring: selectedRegion, introing: showIntro }">
    <BrushTitleIntro
      v-if="showIntro"
      :key="brushIntroTicket"
      @complete="onIntroComplete"
    />

    <div class="intro">
      <div class="intro-copy">
        <h1 class="page-title">지역별로 날씨가 보입니다.</h1>
        <p class="page-lead">지역을 눌러 날씨를 확인해보세요.</p>
        <p v-if="mapArmed && loading" class="status">먹이 마르는 중</p>
        <p v-else-if="mapArmed && error" class="status warn">{{ error }}</p>
      </div>
      <div class="intro-controls">
        <UnitToggle />
        <MapLayerToggle />
      </div>
    </div>

    <div class="atlas-stage">
      <KoreaMap class="atlas-map" :armed="mapArmed" />

      <Transition name="sheet">
        <aside v-if="selectedRegion" ref="panel" class="panel" aria-live="polite">
          <div class="panel-top">
            <button class="back" type="button" @click="store.clearSelection">뒤로</button>
          </div>
          <h2 class="city">{{ selectedRegion.fullName || selectedRegion.name }}</h2>
          <p v-if="selectedWeather" class="readout">
            <span>{{ store.displayTemp(selectedWeather.temp) }}{{ unitSymbol }}</span>
            {{ sky[selectedWeather.type] || selectedWeather.type }}
          </p>
          <WeatherScene :region="selectedRegion" :weather="selectedWeather" />
          <WeatherDNA :dna="selectedDna" />
          <dl v-if="selectedWeather" class="metrics">
            <div>
              <dt>습도</dt>
              <dd>{{ selectedWeather.humidity }}%</dd>
            </div>
            <div>
              <dt>바람</dt>
              <dd>{{ Number(selectedWeather.wind).toFixed(1) }} m/s</dd>
            </div>
            <div>
              <dt>체감</dt>
              <dd>{{ store.displayTemp(selectedWeather.feelsLike) }}{{ unitSymbol }}</dd>
            </div>
            <div>
              <dt>대기질</dt>
              <dd>{{ selectedWeather.air?.aqiLabel || '—' }}</dd>
            </div>
            <div>
              <dt>PM2.5</dt>
              <dd>{{ selectedWeather.air ? `${selectedWeather.air.pm25}` : '—' }}</dd>
            </div>
            <div>
              <dt>PM10</dt>
              <dd>{{ selectedWeather.air ? `${selectedWeather.air.pm10}` : '—' }}</dd>
            </div>
          </dl>
        </aside>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 72px);
  padding-top: 8px;
}

.intro {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 8px;
  padding-inline: 72px;
  transition: opacity var(--duration-state) var(--ease-out-cubic);
}

.home.introing .intro {
  opacity: 0;
  pointer-events: none;
}

.intro-copy {
  max-width: 40rem;
}

.intro-controls {
  position: absolute;
  top: 12px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
}

.intro .page-title {
  font-size: clamp(1.65rem, 2.6vw, 2.35rem);
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.intro .page-lead {
  margin-top: 10px;
}

@media (max-width: 720px) {
  .intro {
    padding-inline: 0;
    padding-bottom: 72px;
  }

  .intro-controls {
    position: static;
    align-self: center;
  }
}

.atlas-stage {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: start;
  width: 100%;
  min-height: min(78vh, 820px);
  transition:
    grid-template-columns var(--duration-sheet) var(--ease-out),
    gap var(--duration-sheet) var(--ease-out);
}

.home.exploring .atlas-stage {
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 380px);
  justify-items: stretch;
  column-gap: 28px;
  align-items: start;
}

.atlas-map {
  width: 100%;
  max-width: 920px;
  justify-self: center;
  transform-origin: center center;
  transition:
    transform var(--duration-sheet) var(--ease-out),
    max-width var(--duration-sheet) var(--ease-out);
}

.home.exploring .atlas-map {
  max-width: none;
  justify-self: stretch;
  transform: scale(1.05);
  transform-origin: center center;
}

.city {
  margin: 0 0 8px;
  font-family: var(--display);
  font-size: 2.8rem;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--on-paper);
}

.readout {
  display: flex;
  gap: 12px;
  align-items: baseline;
  color: var(--on-paper-accent);
}

.readout span {
  font-family: var(--display);
  font-size: 3rem;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--on-paper);
}

.panel {
  width: 100%;
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 96px);
  overflow: auto;
  background: var(--hanji);
  color: var(--on-paper);
  padding: 18px 20px 24px;
  box-shadow: 0 24px 56px rgba(17, 14, 12, 0.48);
}

.panel-top {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.back {
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--on-paper-accent);
  transition: transform var(--duration-press) var(--ease-out-cubic);
}

.back:active {
  transform: scale(0.97);
}

.status {
  color: var(--celadon);
}

.warn {
  color: var(--moon);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px 12px;
  margin: 24px 0 0;
}

.metrics dt {
  font-size: 0.78rem;
  color: var(--on-paper-muted);
}

.metrics dd {
  margin: 4px 0 0;
  font-family: var(--display);
  font-size: 1.25rem;
  color: var(--on-paper);
}

.sheet-enter-active {
  transition:
    transform var(--duration-sheet) var(--ease-out),
    opacity var(--duration-state) var(--ease-out-cubic);
}

.sheet-leave-active {
  transition:
    transform var(--duration-sheet-out) var(--ease-in-cubic),
    opacity var(--duration-sheet-out) var(--ease-in-cubic);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateX(28px);
}

@media (max-width: 1100px) {
  .atlas-stage,
  .home.exploring .atlas-stage {
    grid-template-columns: 1fr;
    justify-items: center;
    column-gap: 0;
  }

  .intro {
    max-width: 38rem;
    padding-top: 16px;
  }

  .home.exploring .intro {
    display: none;
  }

  .home.exploring .atlas-map {
    transform: none;
    max-width: 920px;
  }

  .panel {
    position: static;
    max-height: none;
    margin-top: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro,
  .atlas-stage,
  .atlas-map,
  .sheet-enter-active,
  .sheet-leave-active {
    transition: opacity 200ms ease;
  }

  .home.exploring .atlas-map {
    transform: none;
  }

  .sheet-enter-from,
  .sheet-leave-to {
    transform: none;
  }
}
</style>
