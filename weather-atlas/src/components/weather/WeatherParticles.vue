<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import anime from 'animejs/lib/anime.es.js'

const props = defineProps({
  type: { type: String, default: 'Clouds' },
  intensity: { type: Number, default: 0.8 },
  speed: { type: Number, default: 1 },
  count: { type: Number, default: 0 },
})

const layer = ref(null)
const items = computed(() => {
  const base = {
    Clear: 10,
    Rain: 22,
    Snow: 16,
    Wind: 8,
    Clouds: 6,
    Fog: 5,
  }[props.type] ?? 8
  return Math.max(4, Math.round((props.count || base) * props.intensity))
})

let timeline = null

const play = async () => {
  timeline?.pause()
  await nextTick()
  if (!layer.value) return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const nodes = layer.value.querySelectorAll('.p')
  if (!nodes.length) return
  const duration = 1800 / Math.max(0.4, props.speed)

  if (props.type === 'Rain') {
    timeline = anime({
      targets: nodes,
      translateY: [ -20, 160 ],
      opacity: [0.1, 0.85, 0.1],
      delay: anime.stagger(40),
      duration,
      easing: 'linear',
      loop: true,
    })
  } else if (props.type === 'Snow') {
    timeline = anime({
      targets: nodes,
      translateY: [ -10, 140 ],
      translateX: () => anime.random(-18, 18),
      rotate: () => anime.random(-20, 20),
      opacity: [0.2, 0.9, 0.2],
      delay: anime.stagger(70),
      duration: duration * 1.6,
      easing: 'easeInOutSine',
      loop: true,
    })
  } else if (props.type === 'Wind') {
    timeline = anime({
      targets: nodes,
      translateX: [ -40, 80 ],
      opacity: [0, 0.7, 0],
      delay: anime.stagger(90),
      duration: duration * 0.8,
      easing: 'easeInOutQuad',
      loop: true,
    })
  } else if (props.type === 'Fog') {
    timeline = anime({
      targets: nodes,
      translateX: [ -24, 24 ],
      opacity: [0.08, 0.35, 0.08],
      delay: anime.stagger(120),
      duration: duration * 2.2,
      easing: 'easeInOutSine',
      loop: true,
    })
  } else if (props.type === 'Clear') {
    timeline = anime({
      targets: nodes,
      translateY: [8, -10],
      opacity: [0.15, 0.7, 0.15],
      scale: [0.7, 1.1],
      delay: anime.stagger(80),
      duration: duration * 1.4,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate',
    })
  } else {
    timeline = anime({
      targets: nodes,
      translateX: [ -16, 28 ],
      opacity: [0.15, 0.55, 0.15],
      delay: anime.stagger(110),
      duration: duration * 1.8,
      easing: 'easeInOutSine',
      loop: true,
    })
  }
}

onMounted(play)
watch(() => [props.type, props.intensity, props.speed, props.count], play)
onBeforeUnmount(() => timeline?.pause())
</script>

<template>
  <div ref="layer" class="particles" :data-type="type" aria-hidden="true">
    <span
      v-for="n in items"
      :key="`${type}-${n}`"
      class="p"
      :style="{
        left: `${(n * 37) % 100}%`,
        top: `${(n * 23) % 80}%`,
        animationDelay: `${n * 0.05}s`,
      }"
    />
  </div>
</template>

<style scoped>
.particles {
  overflow: hidden;
}

.p {
  position: absolute;
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.2;
}

.particles[data-type='Rain'] .p {
  width: 1px;
  height: 14px;
  border-radius: 0;
  background: currentColor;
}

.particles[data-type='Snow'] .p {
  width: 5px;
  height: 5px;
  background: var(--snow);
}

.particles[data-type='Wind'] .p {
  width: 28px;
  height: 1px;
  border-radius: 0;
  background: currentColor;
}

.particles[data-type='Fog'] .p {
  width: 70px;
  height: 22px;
  filter: blur(6px);
  background: var(--fog);
}

.particles[data-type='Clear'] .p {
  background: var(--cinnabar);
  box-shadow: 0 0 10px color-mix(in srgb, var(--cinnabar) 55%, transparent);
}

.particles[data-type='Clouds'] .p {
  width: 36px;
  height: 16px;
  filter: blur(4px);
  background: var(--fog);
}
</style>
