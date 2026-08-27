<script setup>
defineProps({
    query: { type: String, required: true}

})
const emit = defineEmits(['update-query'])
</script>

<template>
    <h2>🔍 도시 검색</h2>
    <input
    class="search-input"
    :value="query"
    @input="emit('update-query', $event.target.value)"
    placeholder="검색할 도시 이름 입력"
    />
    <p>검색 중인 도시: {{ query }}</p>
</template>

<style scoped>
.search-input {
    width: 100%;
    box-sizing: border-box;
    padding : 10px 12px;
    
}
</style>