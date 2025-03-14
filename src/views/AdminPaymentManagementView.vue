<template>
    <div class="admin_report_generation">
      <main>
          <AdminSideBar />
          <AdminPaymentManagement />
      </main>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminPaymentManagement from "@/components/admin/AdminPaymentManagement.vue";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
      AdminSideBar,
      AdminPaymentManagement,
      Navbar,
      Footer,
    },
  };
  </script>
  