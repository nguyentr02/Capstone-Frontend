<template>
    <div class="admin_report_generation">
      <Navbar />
      <main>
          <AdminSideBar />
          <AdminPaymentManagement />
      </main>
      <Footer></Footer>
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
  