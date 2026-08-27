<script setup>
import { computed } from 'vue'
import { sceneForRegion } from '../../data/regionScenes.js'
import WeatherParticles from './WeatherParticles.vue'

const props = defineProps({
  region: { type: Object, default: null },
  weather: { type: Object, default: null },
})

const type = computed(() => props.weather?.type ?? 'Clouds')
const scene = computed(() => sceneForRegion(props.region))

const sceneSrc = computed(
  () => scene.value?.src || '/scenes/regions/seoul.jpg',
)

const sceneLabel = computed(() => {
  const place = scene.value?.label
  const name = props.region?.fullName || props.region?.name || ''
  if (place && name) return `${name} · ${place}`
  return place || (name ? `${name} 풍경` : '지역 풍경')
})
</script>

<template>
  <div v-if="region" class="scene" :data-type="type" :data-region="region.id">
    <img
      class="plate"
      :src="sceneSrc"
      :alt="sceneLabel"
      width="960"
      height="540"
      loading="lazy"
      decoding="async"
    />
    <div class="wash" aria-hidden="true" />
    <p v-if="scene?.label" class="caption">{{ scene.label }}</p>
    <WeatherParticles class="particles" :type="type" :intensity="0.42" />
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  height: 168px;
  overflow: hidden;
  margin-top: 16px;
  background: color-mix(in srgb, var(--hanji) 82%, var(--sumi));
  color: var(--on-paper);
}

.plate {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(0.88) contrast(1.08) brightness(0.92) sepia(0.22);
  opacity: 0.9;
  transform: scale(1.02);
}

.wash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--hanji) 55%, transparent) 0%,
      transparent 28%,
      transparent 62%,
      color-mix(in srgb, var(--hanji) 72%, transparent) 100%
    ),
    radial-gradient(
      120% 80% at 50% 40%,
      transparent 35%,
      color-mix(in srgb, var(--sumi) 18%, transparent) 100%
    );
  mix-blend-mode: multiply;
}

.caption {
  position: absolute;
  left: 12px;
  bottom: 10px;
  z-index: 2;
  margin: 0;
  padding: 2px 0;
  font-family: var(--display);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: var(--on-paper);
  text-shadow:
    0 1px 0 color-mix(in srgb, var(--hanji) 70%, transparent),
    0 0 12px color-mix(in srgb, var(--hanji) 55%, transparent);
  pointer-events: none;
}

.particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  color: color-mix(in srgb, var(--on-paper) 70%, var(--cinnabar));
}

@media (prefers-reduced-motion: reduce) {
  .plate {
    transform: none;
  }
}
</style>
