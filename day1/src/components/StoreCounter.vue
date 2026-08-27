<script setup>
import { useCounterSotre } from '../../counter.js';

const counterStore = useCounterSotre()


</script>

<template>
    <div class="practice-section">
        <h2>Counter Store 활용 실습</h2>
        <p>
            원본 카운트 데이터(state): <strong>{{ counterStore.count }}</strong>
        </p>
        <p>
            2배 연산 데이터(getters): <span>{{ counterStore.doubleCount }}</span>
        </p>
        <button @click="counterStore.increment">숫자1증가</button>
    </div>
</template>