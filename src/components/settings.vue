<template lang="pug">
.flex.flex-col
  button.px-4.py-2.bg-green-700.rounded-xl.text-white.font-bold.shadow(@click="initAuth()") INIT

  p {{ params }}

  .pt-6 {{ data }}

  .mt-6 {{ d }}
</template>

<script setup>
import { computed } from 'vue'
import { useFetch, createFetch } from '@vueuse/core'
import { initAuth, getJsonFromUrl } from '@use/api.js'

const params = getJsonFromUrl()

const url = new URL('https://www.googleapis.com/oauth2/v1/tokeninfo')

url.searchParams.set('access_token', params.access_token)

const { isFetching, error, data } = useFetch(url);


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

const { data: d } = useMyFetch('liveBroadcasts?part=snippet&broadcastStatus=all');


</script>

<style scoped>
</style>