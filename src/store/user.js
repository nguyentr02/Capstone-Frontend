import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    accessToken: null,
    role: null,
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

});
