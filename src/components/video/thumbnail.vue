<template lang="pug">
img.h-6em(v-if="img",:src="img.url")
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  img: Object,
});
</script>

<style scoped>
</style>