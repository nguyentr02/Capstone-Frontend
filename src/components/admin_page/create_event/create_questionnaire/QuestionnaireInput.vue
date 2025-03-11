<template>
  <div class="input-wrapper">
    <input type="text" :placeholder="label" class="input-field" />
  </div>
</template>

<script>
export default {
  name: "QuestionnaireInput",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  align-self: flex-start;
  margin-top: 45px;
}

.input-field {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(40, 29, 192, 1);
  padding: 10px 30px;
  color: rgba(38, 27, 195, 1);
  text-align: center;
  line-height: 2;
}

@media (max-width: 991px) {
  .input-wrapper {
    margin-left: 3px;
    margin-top: 40px;
  }

  .input-field {
    padding: 10px 20px;
  }
}
</style>
