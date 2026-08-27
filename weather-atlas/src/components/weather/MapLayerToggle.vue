<script setup>
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../../stores/weatherStore.js'

defineProps({
  tone: { type: String, default: 'night' },
})

const store = useWeatherStore()
const { mapLayer } = storeToRefs(store)
</script>

<template>
  <div class="switch" :data-tone="tone" role="group" aria-label="지도 표시">
    <button
      type="button"
      :aria-pressed="mapLayer === 'weather'"
      @click="store.setMapLayer('weather')"
    >
      날씨
    </button>
    <button
      type="button"
      :aria-pressed="mapLayer === 'air'"
      @click="store.setMapLayer('air')"
    >
      대기
    </button>
  </div>
</template>

<style scoped>
.switch {
  display: inline-flex;
  align-items: stretch;
  flex: 0 0 auto;
  border: 1px solid var(--line);
}

.switch button {
  min-width: 52px;
  min-height: 44px;
  padding: 0 14px;
  border: 0;
  background: transparent;
  color: var(--mist);
  font-family: var(--sans);
  font-size: 0.95rem;
  transition:
    color var(--duration-feedback) var(--ease-out-cubic),
    background-color var(--duration-feedback) var(--ease-out-cubic);
}

.switch button:active {
  transform: scale(0.97);
}

.switch button[aria-pressed='true'] {
  color: var(--hanji);
  background: color-mix(in srgb, var(--cinnabar) 78%, var(--sumi));
}

.switch[data-tone='paper'] {
  border-color: color-mix(in srgb, var(--on-paper) 16%, transparent);
}

.switch[data-tone='paper'] button {
  color: var(--on-paper-muted);
}

.switch[data-tone='paper'] button[aria-pressed='true'] {
  color: var(--hanji);
  background: var(--on-paper-accent);
}
</style>
