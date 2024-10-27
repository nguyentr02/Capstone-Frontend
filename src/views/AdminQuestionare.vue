<template>
    <div class="AdminQuestionare">
      <Navbar />
      <main>
          <EventQuestionareEdit />
      </main>
    </div>
  </template>
  
  <script>
  import EventQuestionareEdit from "@/components/admin/EventQuestionareEdit.vue";
  
  export default {
    components: {
      EventQuestionareEdit,
    },
  };
  </script>
  