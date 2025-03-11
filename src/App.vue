<template>
  <div id="app" class="page-container">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped>

#app {
  width: 100%;
}
@media (min-width: 1024px) {
}
</style>