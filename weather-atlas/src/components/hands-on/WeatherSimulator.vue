<script setup>
import { computed, reactive } from 'vue'
import { regions } from '../../data/regions.js'
import { buildWeatherDna } from '../../services/weatherDna.js'
import WeatherScene from '../weather/WeatherScene.vue'
import WeatherDNA from '../weather/WeatherDNA.vue'

const form = reactive({
  regionId: 'seoul',
  type: 'Clear',
  temp: 18,
  humidity: 55,
  wind: 2.4,
})

const region = computed(
  () => regions.find((item) => item.id === form.regionId) ?? regions[0],
)

const weather = computed(() => ({
  name: region.value.name,
  english: region.value.english,
  temp: Number(form.temp),
  humidity: Number(form.humidity),
  wind: Number(form.wind),
  type: form.type,
}))

const dna = computed(() => buildWeatherDna(weather.value))
const types = ['Clear', 'Rain', 'Snow', 'Wind', 'Clouds', 'Fog']
</script>

<template>
  <section class="lab">
    <p class="page-kicker">Weather Simulator</p>
    <h2 class="title">값을 바꾸면 장면이 따라갑니다.</h2>
    <div class="grid">
      <form class="controls" @submit.prevent>
        <label>
          Location
          <select v-model="form.regionId">
            <option v-for="item in regions" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </label>
        <fieldset>
          <legend>Weather</legend>
          <label v-for="type in types" :key="type" class="chip">
            <input v-model="form.type" type="radio" :value="type" />
            {{ type }}
          </label>
        </fieldset>
        <label>
          Temperature {{ form.temp }}°C
          <input v-model.number="form.temp" type="range" min="-10" max="38" />
        </label>
        <label>
          Humidity {{ form.humidity }}%
          <input v-model.number="form.humidity" type="range" min="10" max="100" />
        </label>
        <label>
          Wind {{ form.wind }} m/s
          <input v-model.number="form.wind" type="range" min="0" max="16" step="0.1" />
        </label>
      </form>
      <div class="preview">
        <WeatherScene :region="region" :weather="weather" />
        <p class="big">{{ weather.temp }}°</p>
        <WeatherDNA :dna="dna" :region-name="region.english" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.lab {
  max-width: 980px;
}

.title {
  margin: 0 0 28px;
  font-family: var(--display);
  font-size: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  gap: 28px;
}

label,
legend {
  display: block;
  margin-bottom: 14px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
}

select,
input[type='range'] {
  width: 100%;
  margin-top: 8px;
}

select {
  min-height: 44px;
  background: var(--plate);
  color: var(--paper);
  border: 1px solid var(--line);
}

fieldset {
  border: 1px solid var(--line);
  margin: 0 0 16px;
  padding: 12px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 6px 10px 6px 0;
  min-height: 36px;
  color: var(--paper);
  text-transform: none;
  letter-spacing: 0;
  font-family: var(--sans);
  font-size: 14px;
}

.big {
  margin: 12px 0;
  font-family: var(--display);
  font-size: 4rem;
  line-height: 1;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
