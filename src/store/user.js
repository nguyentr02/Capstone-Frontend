// src/store/user.js

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.accessToken
    }
  },

  actions: {
    setAccessToken(token) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
    },
    clearAccessToken() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    }
  }
})

