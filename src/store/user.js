// src/store/user.js

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
<<<<<<< HEAD
    accessToken: null,
    role: null,
=======
    accessToken: localStorage.getItem('accessToken') || null
>>>>>>> d85d80a519d2b25a03243185c40434a471a68cd8
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
<<<<<<< HEAD
    setRole(role) {
      this.role = role;
      localStorage.setItem('role',role);
    },
    clearInfo() {
      this.accessToken = null;
      this.role = null;
      localStorage.clear();
    },
  },
=======
    clearAccessToken() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    }
  }
})
>>>>>>> d85d80a519d2b25a03243185c40434a471a68cd8

