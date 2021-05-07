import cred from './client.json'

import { reactive } from 'vue'

export const state = reactive({
  ...cred,
  totalI: 0,
})
