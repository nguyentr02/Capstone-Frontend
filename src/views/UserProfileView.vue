<script setup>
import userSideBar from "@/components/user/userSideBar.vue"
import navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Profile from "@/components/user/Profile.vue"
</script>

<template>
  <div class="main-layout d-flex flex-column min-vh-100">
    <navbar />

    <div class="content-wrapper d-flex flex-grow-1">
      <userSideBar />

      <main class="content flex-grow-1 p-4" style="margin-left: 240px; background-color: #f5f7fb;">
        <Profile />
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  position: relative;
}

.content-wrapper {
  position: relative;
}

/* Adjust content margin when sidebar is collapsed */
.sidebar-collapsed + .content {
  margin-left: 64px;
  transition: margin-left 0.3s ease;
}
</style>