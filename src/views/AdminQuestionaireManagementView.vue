<template>
    <div class="admin_report_generation">
      <Navbar />
      <main>
          <AdminSideBar />
          <AdminQuestionaireManagement />
      </main>
      <Footer></Footer>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminQuestionaireManagement from "@/components/admin/AdminQuestionaireManagement.vue";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
      AdminSideBar,
      AdminQuestionaireManagement,
      Navbar,
      Footer,
    },
  };
  </script>
  