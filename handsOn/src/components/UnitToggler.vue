<script setup>
import { useConfigStore } from '../stores/configStore.js'

const configStore = useConfigStore()



</script>


<template>
    <div class = "unit-toggler">
        <span> 단위 {{ configStore.unitSymbol }}</span>
        <button type="button" @click="configStore.toggleUnit">단위 변경</button>
    </div>
</template>