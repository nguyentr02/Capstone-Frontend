<template>
    <div class="admin_report_generation">
      <main>
          <AdminSideBar />
          <AdminReportGeneration />
      </main>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminReportGeneration from "@/components/admin/AdminReportGeneration.vue";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
      AdminSideBar,
      AdminReportGeneration,
      Navbar,
      Footer,
    },
  };
  </script>
  