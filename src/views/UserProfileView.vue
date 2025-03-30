<template>
    <div class="admin_report_generation">
  
      <main>
        <Navbar/>
        <Profile />
      </main>
    </div>
  </template>
  
  <script>
  import Profile from "@/components/user/Profile.vue";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
        Profile,
        Navbar,
        Footer,
    },
  };
  </script>