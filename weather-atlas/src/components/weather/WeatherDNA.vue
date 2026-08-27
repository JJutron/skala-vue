<script setup>
defineProps({
  dna: { type: Object, default: null },
})
</script>

<template>
  <section v-if="dna" class="dna">
    <dl>
      <div>
        <dt>기온</dt>
        <dd>{{ dna.temperature.short }}</dd>
      </div>
      <div>
        <dt>습도</dt>
        <dd>{{ dna.humidity.short }}</dd>
      </div>
      <div>
        <dt>바람</dt>
        <dd>{{ dna.wind.short }}</dd>
      </div>
      <div>
        <dt>하늘</dt>
        <dd>{{ dna.sky.short }}</dd>
      </div>
      <div v-if="dna.air">
        <dt>대기</dt>
        <dd>{{ dna.air.short }}</dd>
      </div>
    </dl>
    <p class="mood">{{ dna.sentence }}</p>
  </section>
</template>

<style scoped>
dl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  margin: 18px 0 0;
}

dt {
  font-size: 0.78rem;
  color: var(--on-paper-muted);
}

dd {
  margin: 4px 0 0;
  font-family: var(--display);
  font-size: 1.35rem;
  color: var(--on-paper);
}

.mood {
  margin: 22px 0 0;
  font-family: var(--display);
  font-size: 1.2rem;
  line-height: 1.45;
  color: var(--on-paper);
}
</style>
