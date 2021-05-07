<template lang="pug">
.flex.flex-col
  .text-xs ID: {{ id }}
  .text-lg Total Is: {{ state.totalI }}
  .text-sm Next: {{ data?.nextPageToken }}
  chat-message(v-for="msg in data?.items",:key="msg.id", :msg="msg.snippet")
</template>

<script setup>
import { defineProps, ref, onBeforeUnmount } from 'vue'
import { useFetch } from '@vueuse/core'
import { state } from '@store/state.js'
const props = defineProps({
  id: String,
});

const url = ref(`https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${props.id}&part=snippet&key=${state.apiKey}`)

const prevPage = ref()

const { isFetching, error, data, execute } = useFetch(url, { refetch: true }).json();

const interval = setInterval(() => {
  if (data.value?.nextPageToken) {
    url.value = `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${props.id}&part=snippet&key=${state.apiKey}&pageToken=${data.value.nextPageToken}`
  } else {
    execute()
  }

}, 3000);

onBeforeUnmount(() => {
  clearInterval(interval)
});

</script>

<style scoped>
</style>