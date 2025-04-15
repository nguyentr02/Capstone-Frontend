import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    accessToken: null,
  }),

  getters: {
    isAuthenticated: () => {
      if (localStorage.getItem('accessToken') == null) {
        return false;
      } else {
        return true;
      }
    },
  },

  actions: {
    setAccessToken(token) {
      this.accessToken = token;
      localStorage.setItem('accessToken',token);
    },
    clearAccessToken() {
      this.accessToken = null;
      localStorage.clear();
    },
  },

});
