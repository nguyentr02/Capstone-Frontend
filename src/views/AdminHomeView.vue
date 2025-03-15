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

export default {
  components: {
    AdminHomePage,
    AdminSideBar,
  },
};
</script>

<style scoped>
AdminSideBar {
  background-color: blue;
}
</style>
