<template lang="pug">
.p-4(v-if="data")
  p CHAT {{ id }}
  .font-bold Total comments: {{ data.pageInfo.totalResults }}
  .flex.flex-col
    .p-2(v-for="comment in data.items") {{ comment.snippet.displayMessage }}
  .p-4.bg-gray-300.cursor-pointer(@click="execute()") NEXT: {{ data.nextPageToken }}
</template>

<script setup>
import { defineProps, onMounted, onBeforeUnmount } from 'vue'
import { useFetch, createFetch } from '@vueuse/core'
const props = defineProps({
  id: String,
  token: String,
});

let interval

const useMyFetch = createFetch({
  baseUrl: 'https://www.googleapis.com/youtube/v3/',
  options: {
    async beforeFetch({ options }) {
      options.headers = options.headers || {}
      options.headers.Authorization = `Bearer ${props.token}`

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

const { isFetching, error, data, execute } = useMyFetch(`liveChat/messages?part=snippet&liveChatId=${props.id}`).json();

onMounted(() => {
  interval = setInterval(() => {
    execute()
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval)
})



</script>

<style scoped>
</style>