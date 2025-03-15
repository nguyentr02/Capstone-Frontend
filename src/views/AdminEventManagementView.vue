<template>
  <div class="admin_report_generation">

    <main>
      <AdminSideBar />
      <AdminEventManagement />
    </main>
  </div>
</template>

<script>
import AdminSideBar from "@/components/admin/AdminSideBar.vue";
import AdminEventManagement from "@/components/admin/AdminEventManagement.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    AdminSideBar,
    AdminEventManagement,
    Navbar,
    Footer,
  },
};
</script>
