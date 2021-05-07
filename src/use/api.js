import settings from '../store/client.json'
import { useFetch, createFetch } from '@vueuse/core'

export function initAuth() {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/auth')
  authUrl.searchParams.set('client_id', settings.clientID)
  authUrl.searchParams.set('redirect_uri', settings.redirectUri)
  authUrl.searchParams.set('response_type', 'token')
  authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/youtube')
  window.open(authUrl, '_blank').focus()
}

export { getJsonFromUrl } from './utils.js'
