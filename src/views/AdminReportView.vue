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

  
  export default {
    components: {
      AdminSideBar,
      AdminReportGeneration,
    },
  };
  </script>
  