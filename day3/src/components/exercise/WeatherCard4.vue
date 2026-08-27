<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const props = defineProps({
  city: { type: Object, required: true },
})
const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  } 
  return rawTemp
})
</script>

<template>
  <div class="card" @click="emit('select-card', city.name)">
    <div>
      <h3>{{ city.name }} ({{ city.status }})</h3>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <span v-if="city.temp >= 25" class="hot">🔥 더움 (25도 이상)</span>
      <span v-else class="fresh">❄️ 신선함 (25도 미만)</span>
    </div>
    <button @click.stop="emit('click-detail', city)">상세보기</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 14px 16px;
  border: 1px solid #ececec;
  border-radius: 8px;
  cursor: pointer;
}

.card h3,
.card p {
  margin: 0 0 4px;
}

.hot {
  color: #c62828;
}

.fresh {
  color: #1565c0;
}
</style>
