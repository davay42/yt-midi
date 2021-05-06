<template lang="pug">
p SETTINGS
  p {{ settings }}
</template>

<script setup>
import { defineProps } from 'vue'
import settings from '../../client.json'
const props = defineProps({

});


</script>

<style scoped>
</style>