<script setup>
import { computed, ref } from 'vue'
import WeatherParticles from '../weather/WeatherParticles.vue'

const type = ref('Rain')
const speed = ref(1)
const intensity = ref(0.8)
const count = ref(18)
const playing = ref(true)
const types = ['Clear', 'Rain', 'Snow', 'Wind', 'Clouds', 'Fog']

const key = computed(
  () => `${type.value}-${speed.value}-${intensity.value}-${count.value}-${playing.value}`,
)

const replay = () => {
  playing.value = false
  requestAnimationFrame(() => {
    playing.value = true
  })
}
</script>

<template>
  <section class="lab">
    <p class="page-kicker">Weather Motion Lab</p>
    <h2 class="title">Anime.js로 기상 입자를 조율합니다.</h2>
    <div class="stage">
      <WeatherParticles
        v-if="playing"
        :key="key"
        :type="type"
        :speed="speed"
        :intensity="intensity"
        :count="count"
      />
    </div>
    <div class="controls">
      <label>
        Weather type
        <select v-model="type">
          <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
      <label>
        Animation speed {{ speed.toFixed(1) }}
        <input v-model.number="speed" type="range" min="0.4" max="2.4" step="0.1" />
      </label>
      <label>
        Intensity {{ intensity.toFixed(1) }}
        <input v-model.number="intensity" type="range" min="0.3" max="1.6" step="0.1" />
      </label>
      <label>
        Particle count {{ count }}
        <input v-model.number="count" type="range" min="6" max="40" />
      </label>
      <button type="button" @click="replay">Play animation</button>
    </div>
  </section>
</template>

<style scoped>
.title {
  margin: 0 0 20px;
  font-family: var(--display);
  font-size: 2rem;
}

.stage {
  position: relative;
  height: 280px;
  border: 1px solid var(--line);
  background: rgba(11, 36, 48, 0.55);
  overflow: hidden;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
  margin-top: 20px;
}

label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
}

select,
input {
  display: block;
  width: 100%;
  margin-top: 8px;
}

select {
  min-height: 44px;
  background: var(--plate);
  color: var(--paper);
  border: 1px solid var(--line);
}

button {
  min-height: 44px;
  border: 0;
  background: var(--brass);
  color: var(--ink);
  font-family: var(--mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .controls {
    grid-template-columns: 1fr;
  }
}
</style>
