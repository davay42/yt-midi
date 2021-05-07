<template lang="pug">
.flex.flex-col.mt-8.bg-gray-100.p-8
  .font-bold.text-2xl Set your video URL
  input.p-2.my-4(type="text", v-model="videoUrl")
  video-info(v-if="videoId",:key="videoId",:id="videoId")
</template>

<script setup>
import { defineProps, ref, computed, watch } from 'vue'
import { youtubeParser } from '@use/utils.js'

const videoUrl = ref('');

const videoId = computed(() => {
  return youtubeParser(videoUrl.value)
});

watch(videoId, (id) => {

});




</script>

<style scoped>
</style>