<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import anime from 'animejs/lib/anime.es.js'

const emit = defineEmits(['complete'])

const root = ref(null)
const visible = ref(true)
const inkDrop = ref(null)
const seal = ref(null)
const paper = ref(null)
let timeline = null

const reduced = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const finish = () => {
  document.documentElement.classList.remove('brush-intro-playing')
  visible.value = false
  emit('complete')
}

const play = async () => {
  // Teleport needs two ticks so the overlay is in document before we query it.
  await nextTick()
  await nextTick()

  const overlay = root.value
  if (!overlay) {
    finish()
    return
  }

  document.documentElement.classList.add('brush-intro-playing')

  const glyphs = [...overlay.querySelectorAll('.glyph')]

  if (reduced()) {
    overlay.classList.add('is-static')
    glyphs.forEach((el) => {
      el.style.opacity = '1'
      el.style.clipPath = 'none'
    })
    if (seal.value) seal.value.style.opacity = '1'
    window.setTimeout(finish, 320)
    return
  }

  glyphs.forEach((el) => {
    el.style.opacity = '1'
    el.style.clipPath = 'inset(0 100% 0 0)'
  })

  timeline = anime.timeline({
    easing: 'easeOutCubic',
    complete: () => {
      window.setTimeout(finish, 40)
    },
  })

  if (inkDrop.value) {
    timeline.add({
      targets: inkDrop.value,
      opacity: [0, 1],
      scale: [0.4, 1],
      duration: 220,
      easing: 'easeOutQuad',
    })
    timeline.add({
      targets: inkDrop.value,
      opacity: 0,
      scale: 1.5,
      duration: 180,
      easing: 'easeInQuad',
    })
  }

  // Chrome-safe brush reveal: clip-path wipe (SVG mask dashoffset often fails to repaint).
  glyphs.forEach((el, index) => {
    timeline.add(
      {
        targets: el,
        clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
        duration: 520,
        easing: 'easeOutCubic',
      },
      index === 0 ? '-=40' : '-=220',
    )
  })

  if (seal.value) {
    timeline.add(
      {
        targets: seal.value,
        opacity: [0, 1],
        duration: 220,
        easing: 'easeOutQuad',
      },
      '-=100',
    )
  }

  timeline.add(
    {
      targets: [paper.value, overlay],
      opacity: [1, 0],
      duration: 420,
      easing: 'easeOutCubic',
    },
    '+=280',
  )
}

onMounted(play)

onBeforeUnmount(() => {
  timeline?.pause?.()
  document.documentElement.classList.remove('brush-intro-playing')
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="root"
      class="brush-intro"
      aria-hidden="true"
    >
      <span class="sr-brand">기상도</span>
      <div ref="paper" class="paper">
        <div ref="inkDrop" class="ink-drop" />
        <div class="title-row">
          <span class="glyph">기</span>
          <span class="glyph">상</span>
          <span class="glyph">도</span>
          <span ref="seal" class="seal" aria-hidden="true">天</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.brush-intro {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  background-color: #110e0c;
  background-image: linear-gradient(180deg, #110e0c 0%, #1c1814 48%, #110e0c 100%);
  pointer-events: all;
}

.paper {
  position: relative;
  width: min(92vw, 840px);
  padding: 4vh 2vw;
}

.title-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(0.2em, 2vw, 0.55em);
  font-family: var(--display);
  line-height: 1;
}

.glyph {
  display: inline-block;
  color: var(--hanji);
  font-size: clamp(4.5rem, 18vw, 10.5rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  opacity: 0;
  clip-path: inset(0 100% 0 0);
  will-change: clip-path, opacity;
}

.ink-drop {
  position: absolute;
  left: 14%;
  top: 18%;
  width: 18px;
  height: 22px;
  border-radius: 42% 42% 48% 48%;
  background: radial-gradient(circle at 35% 28%, #f4ead7, #2a241c 72%);
  box-shadow: 0 0 18px rgba(244, 234, 215, 0.22);
  opacity: 0;
  transform-origin: center;
  pointer-events: none;
}

.seal {
  display: inline-grid;
  place-items: center;
  width: 1.05em;
  height: 1.05em;
  margin-left: 0.15em;
  background: var(--cinnabar);
  color: var(--hanji);
  font-size: clamp(1.1rem, 3.2vw, 1.65rem);
  opacity: 0;
  transform: translateY(0.35em);
}

.sr-brand {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.brush-intro.is-static .glyph {
  opacity: 1;
  clip-path: none;
}

.brush-intro.is-static .seal {
  opacity: 1;
}

.brush-intro.is-static .ink-drop {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .ink-drop {
    display: none;
  }

  .glyph {
    will-change: auto;
  }
}
</style>
