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
          style="stroke: black;"
        />
        <span class="text-dark fw-bold" id="brandName">Teket</span>
      </a>

      <ul class="nav justify-content-end">
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
</style>
