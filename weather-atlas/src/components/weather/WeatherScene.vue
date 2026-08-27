<script setup>
import { computed } from 'vue'
import WeatherParticles from './WeatherParticles.vue'

const props = defineProps({
  region: { type: Object, default: null },
  weather: { type: Object, default: null },
})

const type = computed(() => props.weather?.type ?? 'Clouds')
const motif = computed(() => props.region?.motif ?? 'plain')

const SCENE_BY_MOTIF = {
  ridge: '/scenes/ridge.jpg',
  basin: '/scenes/basin.jpg',
  core: '/scenes/core.jpg',
  coast: '/scenes/coast.jpg',
  sea: '/scenes/sea.jpg',
  island: '/scenes/island.jpg',
  plain: '/scenes/plain.jpg',
}

const sceneSrc = computed(
  () => SCENE_BY_MOTIF[motif.value] || SCENE_BY_MOTIF.plain,
)

const sceneLabel = computed(() => {
  const name = props.region?.fullName || props.region?.name || ''
  return name ? `${name} 풍경` : '지역 풍경'
})
</script>

<template>
  <div v-if="region" class="scene" :data-type="type" :data-motif="motif">
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
  /* Sumi plate: photo becomes ink-on-hanji, not tourist chrome */
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
