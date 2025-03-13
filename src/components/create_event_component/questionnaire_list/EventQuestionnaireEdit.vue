<template>
  <main class="questionnaire-container">
    <div class="questionnaire-wrapper">
      <header class="questionnaire-header">Event Questionnaire Edit</header>
      <section class="fields-container">
        <!-- 循环显示父组件传进来的 fields -->
        <QuestionField
          v-for="(field, index) in fields"
          :key="index"
          v-model:fieldName="field.name"
          v-model:fieldType="field.type"
        />
        <!-- 如果还需要添加按钮，可以保留 AddFieldButton，但需要从父组件添加数据 -->
        <!-- <AddFieldButton @addField="..."/> -->
      </section>
      <!-- 如果此处 ConfirmButtons 不再需要，可删除 -->
      <!-- <ConfirmButtons @confirm="handleConfirm" /> -->
    </div>
  </main>
</template>

<script>
import QuestionField from "./QuestionField.vue";
import AddFieldButton from "./AddFieldButton.vue";
import ConfirmButtons from "../create_questionnaire/ConfirmButtons.vue";

export default {
  name: "EventQuestionnaireEdit",
  components: {
    QuestionField,
    AddFieldButton,
    ConfirmButtons,
  },
  // ✅ 改为使用 props 接收父组件的 fields
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },
};
</script>



<style scoped>
.questionnaire-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: screen;
  background-color: #ffffff;
  padding: 20px;
}

.questionnaire-wrapper {
  width: 100%;
  max-width: 864px;
}

.questionnaire-header {
  font-size: 0px 4px 4px rgba(0, 0, 0, 0);
  font-weight: 600;
  color: #000000;
  font-family: Poppins;
  margin-bottom: 39px;
}

.fields-container {
  display: flex;
  flex-direction: column;
  gap: 39px;
}

@media (max-width: 991px) {
  .questionnaire-header {
    font-size: 48px;
  }
}

@media (max-width: 640px) {
  .questionnaire-header {
    font-size: 36px;
  }
}
</style>
