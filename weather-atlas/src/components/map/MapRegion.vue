<script setup>
import { computed } from 'vue'
import { airWashId } from '../../services/weatherMapper.js'

const props = defineProps({
  region: { type: Object, required: true },
  aqi: { type: Number, default: 0 },
  layer: { type: String, default: 'weather' },
  active: { type: Boolean, default: false },
  dimmed: { type: Boolean, default: false },
})

const emit = defineEmits(['enter', 'leave', 'select'])

const fill = computed(() => {
  if (props.layer === 'air') return `url(#${airWashId(props.aqi)})`
  // Single ink wash so weather type never isolates one province (e.g. 전남 Clear).
  return 'url(#wash-ink)'
})
</script>

<template>
  <g
    class="region"
    :class="{ active, dimmed, air: layer === 'air' }"
    :data-region="region.id"
    tabindex="0"
    role="button"
    :aria-label="`${region.fullName || region.name} 날씨 보기`"
    @pointerdown="emit('enter', region.id)"
    @mouseenter="emit('enter', region.id)"
    @mouseleave="emit('leave', region.id)"
    @click="emit('select', region.id)"
    @keydown.enter.prevent="emit('select', region.id)"
    @keydown.space.prevent="emit('select', region.id)"
  >
    <path
      v-for="(d, index) in region.paths"
      :key="`${region.id}-${index}`"
      class="land"
      :d="d"
      :fill="fill"
    />
    <text
      :x="region.label.x"
      :y="region.label.y"
      class="label"
      :class="region.kind"
      text-anchor="middle"
      dy="0.35em"
    >
      {{ region.name }}
    </text>
  </g>
</template>

<style scoped>
.region {
  cursor: pointer;
}

.region.dimmed {
  opacity: 0.32;
}

.land {
  stroke: var(--moon);
  stroke-width: 1.7;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill-opacity: 0;
  vector-effect: non-scaling-stroke;
  transition:
    fill var(--duration-state) var(--ease-out-cubic),
    stroke var(--duration-feedback) var(--ease-out-cubic),
    stroke-width var(--duration-feedback) var(--ease-out-cubic);
}

.region.active .land,
.region:focus-visible .land {
  stroke: var(--hanji);
  stroke-width: 2.5;
  filter: url(#glow);
}

.region:active .land {
  stroke-width: 2.8;
}

.label {
  fill: var(--hanji);
  font-family: var(--sans);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.05em;
  paint-order: stroke;
  stroke: var(--sumi);
  stroke-width: 3px;
  pointer-events: none;
  opacity: 0;
}

.label.metro {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.04em;
  stroke-width: 2.5px;
}
</style>
