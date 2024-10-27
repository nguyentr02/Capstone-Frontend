<template>
    <div class="AdminQuestionare">
      <Navbar />
      <main>
          <EventQuestionareEdit />
      </main>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminHomePage from "@/components/admin/AdminHomePage.vue";
  import EventQuestionareEdit from "@/components/admin/EventQuestionareEdit.vue";
  
  export default {
    components: {
      AdminHomePage,
      EventQuestionareEdit,
      AdminSideBar,
    },
  };
  </script>
  