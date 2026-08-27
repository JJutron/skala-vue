<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { koreaViewBox, regions } from '../../data/regions.js'
import { AQI_LABELS, AQI_WASH } from '../../services/weatherMapper.js'
import { useWeatherStore } from '../../stores/weatherStore.js'
import { useWeatherAnimation } from '../../composables/useWeatherAnimation.js'
import MapRegion from './MapRegion.vue'
import RegionTooltip from './RegionTooltip.vue'
import WeatherParticles from '../weather/WeatherParticles.vue'

const props = defineProps({
  armed: {
    type: Boolean,
    default: false,
  },
})

const store = useWeatherStore()
const {
  hoveredRegionId,
  selectedRegionId,
  weatherByRegion,
  hoveredRegion,
  hoveredWeather,
  mapLayer,
  airLayerOn,
} = storeToRefs(store)
const { drawMap, hoverRegion, leaveRegion, reduced } = useWeatherAnimation()
const mapRoot = ref(null)
const drawn = ref(false)
const started = ref(false)
const ready = ref(false)
const tooltip = ref({ x: 0, y: 0 })

const aqiOf = (id) => weatherByRegion.value[id]?.air?.aqi ?? 0

const aqiStops = [1, 2, 3, 4, 5].map((level) => ({
  level,
  label: AQI_LABELS[level].ko,
  color: AQI_WASH[level].to,
}))

const regionEl = (id) => mapRoot.value?.querySelector(`[data-region="${id}"]`)

const onEnter = (id) => {
  if (!drawn.value) return
  store.hoverRegion(id)
  hoverRegion(regionEl(id))
}

const onMove = (event) => {
  const bounds = mapRoot.value?.getBoundingClientRect()
  if (!bounds) return
  const x = event.clientX - bounds.left + 18
  const y = event.clientY - bounds.top - 10
  tooltip.value = {
    x: Math.min(Math.max(8, x), Math.max(8, bounds.width - 208)),
    y: Math.min(Math.max(8, y), Math.max(8, bounds.height - 128)),
  }
}

const onLeave = (id) => {
  if (hoveredRegionId.value === id) store.hoverRegion(null)
  leaveRegion(
    regionEl(id),
    Boolean(selectedRegionId.value) && selectedRegionId.value !== id,
  )
}

const onSelect = (id) => {
  if (!drawn.value) return
  store.selectRegion(id)
}

const collectPaths = () => {
  const root = mapRoot.value
  if (!root) return { majors: [], specks: [], labels: [] }
  const lands = [...root.querySelectorAll('.land')]
  return {
    majors: lands.filter((el) => (el.getTotalLength?.() ?? 0) > 72),
    specks: lands.filter((el) => (el.getTotalLength?.() ?? 0) <= 72),
    labels: [...root.querySelectorAll('.label')],
  }
}

const startDraw = async () => {
  if (started.value || !props.armed || !ready.value) return
  started.value = true

  await nextTick()
  let paths = collectPaths()
  if (!paths.majors.length && !paths.specks.length) {
    await nextTick()
    paths = collectPaths()
  }

  // Reveal stage first so stroke-draw is visible (not painted while opacity:0).
  drawn.value = false
  await nextTick()

  drawMap(paths)
  if (reduced()) {
    drawn.value = true
    return
  }
  window.setTimeout(() => {
    drawn.value = true
  }, 2100)
}

onMounted(async () => {
  await nextTick()
  ready.value = true
  if (props.armed) startDraw()
})

watch(
  () => props.armed,
  (armed) => {
    if (armed && ready.value) startDraw()
  },
)

const showTip = computed(
  () =>
    drawn.value &&
    Boolean(hoveredRegion.value) &&
    hoveredRegionId.value !== selectedRegionId.value,
)

const showParticles = computed(() => !airLayerOn.value)
</script>

<template>
  <div
    ref="mapRoot"
    class="map-stage"
    :class="{ drawn, waiting: !armed, air: airLayerOn }"
    @mousemove="onMove"
  >
    <WeatherParticles
      v-if="showParticles"
      class="map-weather"
      :type="hoveredWeather?.type || 'Clouds'"
      :intensity="0.38"
    />
    <!-- Coastline geometry: Simplemaps.com, free for commercial use -->
    <svg class="korea" :viewBox="koreaViewBox" role="img" aria-label="대한민국 날씨 지도">
      <defs>
        <filter id="glow">
          <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="var(--moon)" flood-opacity="0.42" />
        </filter>
        <!-- Unified ink wash: weather type no longer recolors provinces. -->
        <linearGradient id="wash-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a241c" />
          <stop offset="100%" stop-color="#8a8174" />
        </linearGradient>
        <linearGradient
          v-for="(wash, key) in AQI_WASH"
          :id="`wash-aqi-${key}`"
          :key="`aqi-${key}`"
          x1="0"
          y1="0"
          x2="0.25"
          y2="1"
        >
          <stop offset="0%" :stop-color="wash.from" />
          <stop offset="100%" :stop-color="wash.to" />
        </linearGradient>
      </defs>
      <MapRegion
        v-for="region in regions"
        :key="region.id"
        :region="region"
        :aqi="aqiOf(region.id)"
        :layer="mapLayer"
        :active="selectedRegionId === region.id || hoveredRegionId === region.id"
        :dimmed="Boolean(selectedRegionId) && selectedRegionId !== region.id"
        @enter="onEnter"
        @leave="onLeave"
        @select="onSelect"
      />
    </svg>
    <p v-if="airLayerOn" class="legend" aria-label="대기질 범례">
      <span v-for="stop in aqiStops" :key="stop.level" class="swatch">
        <i :style="{ background: stop.color }" />
        {{ stop.label }}
      </span>
    </p>
    <RegionTooltip
      v-if="showTip"
      class="float-tip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      :region="hoveredRegion"
      :weather="hoveredWeather"
      :layer="mapLayer"
    />
    <p class="credit">해안선 Simplemaps</p>
  </div>
</template>

<style scoped>
.korea {
  width: min(100%, 860px);
  height: auto;
  display: block;
  margin: 0 auto;
  overflow: visible;
  filter: drop-shadow(0 28px 48px rgba(0, 0, 0, 0.42));
  transition: width var(--duration-sheet) var(--ease-out);
}

.map-stage {
  position: relative;
  min-height: min(82vh, 880px);
  opacity: 1;
  transition: opacity var(--duration-state) var(--ease-out-cubic);
}

.map-stage.waiting {
  opacity: 0;
  pointer-events: none;
}

.map-weather {
  position: absolute;
  inset: 4% 12% 10%;
  pointer-events: none;
  color: var(--moon);
}

.float-tip {
  position: absolute;
  z-index: 3;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 14px;
  margin: 10px 0 0;
  color: var(--mist);
  font-size: 0.78rem;
}

.swatch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.swatch i {
  display: block;
  width: 12px;
  height: 12px;
  border: 1px solid color-mix(in srgb, var(--hanji) 28%, transparent);
}

.credit {
  margin: 2px 0 0;
  text-align: center;
  color: var(--mist);
  opacity: 0.7;
  font-size: 0.72rem;
}

.map-stage.drawn :deep(.land) {
  fill-opacity: 1;
}

.map-stage.drawn :deep(.label) {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .map-stage {
    transition: opacity 200ms ease;
  }
}
</style>
