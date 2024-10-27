<template>
    <div class="AdminEventEdit">
      <Navbar />
      <main>
          <EventInformationEdit />
      </main>
    </div>
  </template>
  
  <script>
  import EventInformationEdit from "@/components/admin/EventInformationEdit.vue";
  
  export default {
    components: {
      EventInformationEdit,
    },
  };
  </script>