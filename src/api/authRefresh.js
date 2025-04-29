// src/api/authFetch.js

import { refreshAccessToken } from './auth.js'
import { useUserStore } from '@/store/user.js'

export async function authFetch(input, init = {}) {
  const userStore = useUserStore()

  // 给每个请求都加上最新的 accessToken
  init.headers = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
    'Authorization': `Bearer ${userStore.accessToken}`
  }
  // 如果需要带上 Cookie，也加上：
  // init.credentials = 'include'

  let res = await fetch(input, init)

  // 如果 accessToken 过期导致 401，则尝试刷新
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken()
      // 更新到 Store 和 localStorage
      userStore.setAccessToken(newToken)

      // 重试原始请求，带上新的 token
      init.headers['Authorization'] = `Bearer ${newToken}`
      res = await fetch(input, init)
    } catch (err) {
      // 刷新也失败，强制登出
      userStore.clearAccessToken()
      window.location.href = '/signIn'
      throw err
    }
  }

  return res
}
