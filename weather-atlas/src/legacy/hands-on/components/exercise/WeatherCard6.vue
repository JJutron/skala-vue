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
  <el-card class="weather-card-6" shadow="hover" @click="emit('select-card', city.name)">
    <div class="card-row">
      <div>
        <h3>{{ city.name }} ({{ city.status }})</h3>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <el-tag v-if="city.temp >= 25" type="danger">더움 (25도 이상)</el-tag>
        <el-tag v-else type="primary">신선함 (25도 미만)</el-tag>
      </div>
      <el-button type="primary" @click.stop="emit('click-detail', city)">상세보기</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card-6 {
  margin-bottom: 10px;
  cursor: pointer;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-row h3,
.card-row p {
  margin: 0 0 4px;
}
</style>
