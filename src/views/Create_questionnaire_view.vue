<template>
    <div class="Create_questionnaire_view">
      <main>
        <QuestionnaireForm />
      </main>
    </div>
  </template>
  
  <script>
  import AdminSideBar from "@/components/admin/AdminSideBar.vue";
  import AdminHomePage from "@/components/admin/AdminHomePage.vue";
  import QuestionnaireForm from "@/components/create_event_component/create_questionnaire/QuestionnaireForm.vue";
  
  export default {
    components: {
      AdminHomePage,
      AdminSideBar,
      QuestionnaireForm,
    },
  };
  </script>