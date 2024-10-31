<template>
  <div class="admin_homepage">
    <main>
      <AdminSideBar />
      <AdminHomePage />
    </main>
  </div>
</template>

<script>
import AdminSideBar from "@/components/admin/AdminSideBar.vue";
import AdminHomePage from "@/components/admin/AdminHomePage.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    AdminHomePage,
    AdminSideBar,
    Navbar,
  },
};
</script>

<style scoped>
AdminSideBar {
  background-color: blue;
}
</style>
