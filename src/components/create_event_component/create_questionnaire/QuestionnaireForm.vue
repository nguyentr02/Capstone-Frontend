<template>
  <section class="questionnaire-container">
    <form class="questionnaire-form">
      <QuestionnaireHeader />

      <!-- 这里是问卷名称输入框，当前示例用 readonly 只是演示 -->
      <QuestionnaireInput
        label="Questionnaire Name"
        class="questionnaire-input"
        :readonly="true"
      />

      <!-- 让用户输入 Type 文本，使用 v-model 绑定到 formData.type -->
      <div class="text-input-container">
        <input
          type="text"
          class="text-input"
          placeholder="Type: Text"
          v-model="formData.type"
        />
      </div>

      <!-- 这里是问卷类型输入框，当前示例用 readonly 只是演示 -->
      <QuestionnaireInput
        label="Questionnaire Type"
        class="questionnaire-type-input"
        :readonly="true"
      />

      <!-- 选择器子组件，会将选择结果通过 @update-type="..." 返回给父组件 -->
      <QuestionnaireTypeSelector @update-type="formData.selectedType = $event" />

      <!-- 点击 Confirm 后触发 handleConfirm()，再 $emit('add-field') 给父组件 -->
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
      formData: {
        type: "",
        selectedType: "",
      },
    };
  },
  methods: {
    handleConfirm() {
      // 组装一个新字段对象
      const newField = {
        name: this.formData.type || "Text",
        type: this.formData.selectedType || "Type: Text",
      };
      // 通过自定义事件把新字段传给父组件
      this.$emit("add-field", newField);

      // 提交后清空输入
      this.formData.type = "";
      this.formData.selectedType = "";
    },
  },
};
</script>


<style scoped>
.questionnaire-container {
  max-width: 100%;
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
