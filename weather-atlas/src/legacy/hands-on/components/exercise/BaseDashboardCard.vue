<template>
    <section class="block">
        <slot />
    </section>
    </template>

<style scoped>
.block {
    padding: 20px 24px 8px;
}
.block :deep(h2) {
  margin: 0 0 12px;
  font-size: 16px;
}
</style>