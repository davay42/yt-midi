<template lang="pug">
.line.text-sm {{ msg.displayMessage }}
</template>

<script setup>
import { defineProps } from 'vue'
import { state } from '@store/state.js'
const props = defineProps({
  msg: Object,
});

if (props.msg.displayMessage.includes('I')) state.totalI++

</script>

<style scoped>
.line:nth-child(2n) {
  @apply bg-gray-200;
}
</style>