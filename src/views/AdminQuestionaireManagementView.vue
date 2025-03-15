<template>
    <div class="admin_report_generation">

      <main>
          <AdminSideBar />
          <AdminQuestionaireManagement />
      </main>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminQuestionaireManagement from "@/components/admin/AdminQuestionaireManagement.vue";
  
  export default {
    components: {
      AdminSideBar,
      AdminQuestionaireManagement,
    },
  };
  </script>
  