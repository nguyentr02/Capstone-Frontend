<template>
  <section class="question-field">
    <input v-model="editableFieldName" class="field-label" readonly />
    <div class="field-type">Type: {{ fieldType }}</div>
  </section>
</template>

<script>
export default {
  name: "QuestionField",
  props: {
    fieldName: String, 
    fieldType: String,
  },
  emits: ['update:fieldName', 'update:fieldType'],
  computed: {
    editableFieldName: {
      get() {
        return this.fieldName;
      },
      set(newValue) {
        this.$emit("update:fieldName", newValue);
      },
    },
  },
};
</script>

<style scoped>
.question-field {
  display: flex;
  flex-direction: column;
  gap: 23.401px;
}

.field-label {
  color: #261bc3;
  font-size: 16px;
  font-weight: 500;
  font-family: Poppins;
  width: 191px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #281dc0;
  background-color: #ffffff;
  margin: 0;

  /* ✅ 让文本在边框内居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.field-type {
  color: #302d27;
  font-size: 16px;
  font-weight: 500;
  font-family: Poppins;
  width: 70%;
  height: 53px;
  border-radius: 15px;
  background-color: #f3f3f3;
  border-color: #f5f5f5;
  padding: 0 52px;
  align-items: center;
  display: flex;
}
</style>
