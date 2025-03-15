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
  
  export default {
    components: {
      AdminSideBar,
      AdminPaymentManagement,
    },
  };
  </script>
  