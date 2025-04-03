<template>
  <nav class="navbar --bs-warning-bg-subtle navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="55"
          height="55"
          class="d-inline-block align-text-middle"
          style="stroke: black;"
        />
        <span class="text-dark fw-bold" id="brandName">Teket</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarContent" aria-controls="navbarContent"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
          <li class="nav-item d-flex justify-content-center">
            <a href="/events" style="font-family: 'Font'" class="nav-link">
              <img
                  src="../assets/calendar.png"
                  alt="ICON"
                  class="d-inline-block align-text-middle"
                  width="20"
                  height="20"
              />
              <span class="text-warning ms-lg-2 fw-semibold just">Events</span>
            </a>
          </li>
          <li class="nav-item ms-lg-4">
            <router-link to="/signIn">
              <button class="btn btn-warning fw-semibold">Sign In</button>
            </router-link>
          </li>
          <li class="nav-item ms-lg-3">
            <router-link to="/signUp"
            ><button class="btn btn-light fw-semibold">
              Sign Up
            </button></router-link
            >
          </li>
        </ul>
      </div>


    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
</script>

<style scoped>
#brandName {
  font-family: "LogoFont";
}

@media (max-width: 992px) {
  .navbar-nav .btn {
    width: 100%;
    margin: 5px 0;
  }
}
</style>
