<template>
  <section class="questionnaire-container">
    <form class="questionnaire-form">
      <QuestionnaireHeader />

      <!-- 这行先留着，也可改成 v-model="questionnaireName" -->
      <QuestionnaireInput
        label="Questionnaire Name"
        class="questionnaire-input"
        :readonly="true"
      />

      <div class="text-input-container">
        <!-- 让用户输入 Type 文本，使用 v-model 绑定到 formData.type -->
        <input
          type="text"
          class="text-input"
          placeholder="Type: Text"
          v-model="formData.type"
        />
      </div>

      <QuestionnaireInput
        label="Questionnaire Type"
        class="questionnaire-type-input"
        :readonly="true"
      />

      <QuestionnaireTypeSelector />

      <!-- 点击 Confirm 时，handleConfirm 触发 $emit("add-field", ...) -->
      <ConfirmButtons @confirm="handleConfirm" />
    </form>
  </section>
</template>

<script>
import QuestionnaireHeader from "./QuestionnaireHeader.vue";
import QuestionnaireInput from "./QuestionnaireInput.vue";
import QuestionnaireTypeSelector from "./QuestionnaireTypeSelector.vue";
import QuestionTypeList from "./QuestionTypeList.vue";
import ConfirmButtons from "./ConfirmButtons.vue";

export default {
  name: "QuestionnaireForm",
  components: {
    QuestionnaireHeader,
    QuestionnaireInput,
    QuestionnaireTypeSelector,
    QuestionTypeList,
    ConfirmButtons,
  },
  data() {
    return {
      // 用于存储当前表单输入
      formData: {
        type: "",
      },
    };
  },
  methods: {
    handleConfirm() {
      // 点击 Confirm 时，向父组件传递新字段
      const newField = {
        // 这里可根据你的需求，比如:
        name: "New Field",
        type: this.formData.type || "Text",
      };
      this.$emit("add-field", newField);

      // 提交后清空输入
      this.formData.type = "";
    },
  },
};
</script>


<style scoped>
.questionnaire-container {
  max-width: 497px;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 16px;
  color: #302d27;
  font-weight: 500;
}

.questionnaire-form {
  border-radius: 12px;
  background-color: rgba(162, 157, 235, 0.1);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  width: 100%;
  padding: 53px 48px;
  flex-direction: column;
  align-items: stretch;
}

.text-input-container {
  margin-top: 18px;
  width: 70%;
  max-width: 100%;
}

.text-input {
  -webkit-text-stroke-width: 0.36px;
  -webkit-text-stroke-color: #f5f5f5;
  border: 1px solid rgba(245, 245, 245, 1);
  border-radius: 15px;
  background-color: rgba(243, 243, 243, 1);
  width: 100%;
  padding: 20px;
  line-height: 2;
}

@media (max-width: 991px) {
  .questionnaire-form {
    max-width: 100%;
    padding: 20px;
  }

  .text-input-container {
    margin-left: 3px;
  }
}
</style>
