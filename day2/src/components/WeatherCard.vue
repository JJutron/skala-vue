<script setup>
defineProps({
  city: { type: Object, required: true },
})
const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="card" @click="emit('select-card', city.name)">
    <div>
      <h3>{{ city.name }} ({{ city.status }})</h3>
      <p>현재 기온: {{ city.temp }}°C</p>
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
