<template>
  <div id="app" class="page-container">
    <AppNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from "./components/Navbar.vue";
import AppFooter from "./components/Footer.vue";

export default {
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
