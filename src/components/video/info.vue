<template lang="pug">
.flex.flex-col
  .text-sm.font-bold.mb-2 {{ props.id }}
  .bg-red-100 {{ error }}
  .text-3xl(v-if="isFetching") Fetching...
  .flex.flex-wrap(v-else)
    video-thumbnail(:img="snippet?.thumbnails?.medium")
    .flex.flex-col.px-4.flex-1
      .text-xl.font-bold {{ snippet?.title }}
      .text-xl {{ snippet?.description }}
      video-statistics(:stat="data?.items[0].statistics", :liveViewers="data?.items[0].liveStreamingDetails.concurrentViewers")
      chat-flow(v-if="chatId",:id="chatId")
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { state } from '@store/state.js'
import { useFetch } from '@vueuse/core'

const props = defineProps({
  id: String,
});

const url = ref(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${props.id}&key=${state.apiKey}`)

const { isFetching, error, data } = useFetch(url).json();

const snippet = computed(() => {
  return data.value?.items?.[0]?.snippet
});

const chatId = computed(() => {
  return data.value?.items?.[0]?.liveStreamingDetails?.activeLiveChatId
});

</script>

<style scoped>
</style>