<template>
  <section class="questionnaire-container">
    <form class="questionnaire-form">
      <QuestionnaireHeader />

      <QuestionnaireInput
        label="Questionnaire Name"
        class="questionnaire-input"
      />

      <div class="text-input-container">
        <input type="text" class="text-input" placeholder="Type: Text" />
      </div>

      <QuestionnaireInput
        label="Questionnaire Type"
        class="questionnaire-type-input"
      />

      <QuestionnaireTypeSelector />

      <QuestionTypeList />

      <ConfirmButtons />
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
  margin-top: 21px;
  width: 388px;
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
