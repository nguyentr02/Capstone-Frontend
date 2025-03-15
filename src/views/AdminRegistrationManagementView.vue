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
  
  
  export default {
    components: {
      AdminSideBar,
      AdminRegistrationManagement,
      
    },
  };
  </script>
  