<template lang="pug">
.flex.flex-col
  button.button(@click="initAuth()") INIT

  p(v-if="params?.access_token") {{ params }}

  .pt-6(v-if="!data?.error") {{ data }}
  .font-bold.text-3xl.mt-4.p-4 Live Broadcasts
  .mt-6(v-if="d")
    .p-2.flex(v-for="stream in d.items", :key="stream.id") 
      img(:src="stream.snippet.thumbnails.default.url")
      .flex.flex-col.p-4
        a.font-bold.text-xl {{ stream.snippet.title }}
        chat(:id="stream.snippet.liveChatId", :token="params.access_token")
</template>

<script setup>
import { computed } from 'vue'
import { useFetch, createFetch } from '@vueuse/core'
import { initAuth, getJsonFromUrl } from '@use/api.js'

const params = getJsonFromUrl()

const url = new URL('https://www.googleapis.com/oauth2/v1/tokeninfo')

url.searchParams.set('access_token', params.access_token)

const { isFetching, error, data } = useFetch(url).json();

const useMyFetch = createFetch({
  baseUrl: 'https://www.googleapis.com/youtube/v3/',
  options: {
    async beforeFetch({ options }) {
      options.headers = options.headers || {}
      options.headers.Authorization = `Bearer ${params.access_token}`

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})


const { data: d } = useMyFetch('liveBroadcasts?part=snippet&broadcastStatus=active').json();


function getChat() {

}

</script>

<style scoped>
.button {
  @apply px-4 py-2 bg-green-700 rounded-xl text-white font-bold shadow self-start;
}
</style>