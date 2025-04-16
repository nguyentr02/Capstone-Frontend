<template>
  <nav class="navbar --bs-warning-bg-subtle">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="55"
          height="55"
          class="d-inline-block align-text-middle"
          style="stroke: black"
        />
        <span class="text-dark fw-bold" id="brandName">Teket</span>
      </a>

      <!-- User has not sign in -->
      <ul v-if="navState == true" class="nav justify-content-end">
        <li class="nav-item">
          <a href="/events" style="font-family: 'Font'" class="nav-link">
            <img
              src="../assets/calendar.png"
              alt="ICON"
              class="d-inline-block align-text-middle"
              width="20"
              height="20"
            />
            <span class="text-warning ms-2 fw-semibold">Events</span>
          </a>
        </li>
        <li class="nav-item ms-4">
          <router-link to="/signIn">
            <button class="btn btn-warning fw-semibold">Sign In</button>
          </router-link>
        </li>
        <li class="nav-item ms-3">
          <router-link to="/signUp"
            ><button class="btn btn-light fw-semibold">
              Sign Up
            </button></router-link
          >
        </li>
      </ul>

      <!-- If already logged in -->
      <ul v-else class="nav justify-content-end">
        <li class="nav-item">
          <a href="/events" style="font-family: 'Font'" class="nav-link">
            <img
              src="../assets/calendar.png"
              alt="ICON"
              class="d-inline-block align-text-middle"
              width="20"
              height="20"
            />
            <span class="text-warning ms-2 fw-semibold">Events</span>
          </a>
        </li>
        <li class="nav-item ms-3">
          <router-link to="/user/profile">
            <img
              width="40"
              height="40"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png"
              alt="UserLogo"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

export default {
  data() {
    return {
      navState: true,
    };
  },

  mounted() {
    this.checkState();
  },

  methods: {
    checkState() {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        console.log("User state verified");

        // Change state of Navbar
        this.navState = false;
      } else {
        console.log("User state NOT verified");
      }
    },
  },
};
</script>

<style scoped>
#brandName {
  font-family: "LogoFont";
}
</style>
