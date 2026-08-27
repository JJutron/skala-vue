<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
})
</script>

<template>
  <div class="preview">
    <img :src="src" :alt="alt" width="640" height="480" loading="lazy" />
  </div>
</template>

<style scoped>
.preview {
  width: 100%;
  max-width: 240px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--hanji);
  isolation: isolate;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top center;
}
</style>
