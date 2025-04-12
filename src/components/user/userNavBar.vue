<template>
    <nav class="navbar --bs-warning-bg-subtle" style="background-color: white;">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            width="55"
            height="55"
            class="d-inline-block align-text-middle"
            style="stroke: black"
          />
          <span class="text-dark fw-bold" id="brandName">Teket</span>
        </a>
  
        <div class="d-flex align-items-center">
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            @click="$emit('toggle-sidebar')"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <ul v-if="navState == true" class="nav justify-content-end d-none d-lg-flex ms-auto">
            <li class="nav-item">
              <a href="/events" style="font-family: 'Font'" class="nav-link">
                <img
                  src="@/assets/calendar.png"
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
  
          <ul v-else class="nav justify-content-end d-none d-lg-flex ms-auto">
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
      </div>
    </nav>
  </template>
  
  <script setup>
  import "primeicons/primeicons.css";
  import { ref, onMounted } from 'vue';
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/store/user";
  
  const emit = defineEmits(['toggle-sidebar']);
  const navState = ref(true);
  
  const checkState = () => {
    const userStore = useUserStore();
    if (userStore.isAuthenticated) {
      console.log("User state verified");
      navState.value = false;
    } else {
      console.log("User state NOT verified");
    }
  };
  
  onMounted(() => {
    checkState();
  });
  </script>
  
  <style scoped>
  #brandName {
    font-family: "LogoFont";
  }
  
  /* Hide the regular navigation on mobile */
  @media (max-width: 991.98px) {
    .nav.justify-content-end {
      display: none !important;
    }
  }
  
  /* Show the regular navigation on desktop */
  @media (min-width: 992px) {
    .navbar-toggler {
      display: none !important; /* Hide the hamburger menu on desktop */
    }
  }
  </style>