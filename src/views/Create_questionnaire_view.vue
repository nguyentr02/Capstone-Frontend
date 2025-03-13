<template>
  <div class="Create_questionnaire_view">
    <main>
      <!-- 1. 监听子组件的 add-field 事件，执行 addFieldToList -->
      <QuestionnaireForm @add-field="addFieldToList" />

      <!-- 2. 将 fields 通过 props 传给 EventQuestionnaireEdit -->
      <EventQuestionnaireEdit :fields="fields" />

      <link_generater />
      <DashBar />
    </main>
  </div>
</template>

<script>
import QuestionnaireForm from "@/components/create_event_component/create_questionnaire/QuestionnaireForm.vue";
import link_generater from "@/components/create_event_component/link_generater.vue";
import DashBar from "@/components/create_event_component/DashBar.vue";
import EventQuestionnaireEdit from "@/components/create_event_component/questionnaire_list/EventQuestionnaireEdit.vue";

export default {
  name: "CreateQuestionnaireView",
  components: {
    QuestionnaireForm,
    link_generater,
    DashBar,
    EventQuestionnaireEdit,
  },
  data() {
    return {
      fields: [
        { name: "event code", type: "number" },
        { name: "name", type: "Text" },
        { name: "phone number", type: "Text" },
        { name: "rating", type: "rating bar" },
      ],
    };
  },
  methods: {
    // 父组件监听到 add-field 事件后，把新字段 push 到 fields 数组里
    addFieldToList(newField) {
      this.fields.push(newField);
    },
  },
};
</script>
