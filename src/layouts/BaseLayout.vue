<script setup>
import Header from '../components/common/Header.vue'
import Footer from '../components/common/Footer.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- Navigation header -->
    <Header />

    <main class="main-content">
      <slot></slot>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}
</style>
