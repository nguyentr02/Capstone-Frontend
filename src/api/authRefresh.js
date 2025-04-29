// src/api/authFetch.js

import { refreshAccessToken } from './auth.js'
import { useUserStore } from '@/store/user.js'

export async function authFetch(input, init = {}) {
  const userStore = useUserStore()

  //Add the latest accessToken to each request
  init.headers = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
    'Authorization': `Bearer ${userStore.accessToken}`
  }
  // If you need to bring Cookie, also add:
  // init.credentials = 'include'

  let res = await fetch(input, init)

  // If the accessToken expires and results in a 401 error, try refreshing
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken()
      // Update to User.Store and localStorage
      userStore.setAccessToken(newToken)

      // Retry the original request with a new token
      init.headers['Authorization'] = `Bearer ${newToken}`
      res = await fetch(input, init)
    } catch (err) {
      // Refresh also failed, force logout
      userStore.clearAccessToken()
      window.location.href = '/signIn'
      throw err
    }
  }

  return res
}
