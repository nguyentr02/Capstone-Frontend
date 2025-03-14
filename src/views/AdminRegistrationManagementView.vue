<template>
    <div class="admin_report_generation">
      <main>
          <AdminSideBar />
          <AdminRegistrationManagement />
      </main>
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
  