<script>
import HomePage from "@/components/HomePage.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
    HomePage,
  },
};
</script>

<template>
  <div class="homePage">
    <Navbar />
    <main>
      <HomePage />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
}
</style>
