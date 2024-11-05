<template>
    <div class="admin_report_generation">
      <Navbar />
      <main>
          <AdminSideBar />
          <AdminRegistrationManagement />
      </main>
      <Footer></Footer>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminRegistrationManagement from "@/components/admin/AdminRegistrationManagement.vue";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
      AdminSideBar,
      AdminRegistrationManagement,
      Navbar,
      Footer,
    },
  };
  </script>
  