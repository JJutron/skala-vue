<script setup>
</script>

<template>
  <section class="hands">
    <p class="back-row">
      <RouterLink class="back" to="/archive">아카이브로</RouterLink>
    </p>
    <div class="legacy-stage">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>
.hands {
  padding-top: 20px;
}

.back-row {
  max-width: 960px;
  margin: 0 auto 16px;
}

.back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--moon);
  text-decoration: none;
}

.legacy-stage {
  color: #2a241c;
}

.legacy-stage :deep(#hw-01),
.legacy-stage :deep(#hw-02),
.legacy-stage :deep(#hw-03),
.legacy-stage :deep(#hw-04),
.legacy-stage :deep(#hw-05),
.legacy-stage :deep(#hw-06) {
  scroll-margin-top: 96px;
}
</style>
