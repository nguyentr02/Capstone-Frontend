<template>
  <div class="input-wrapper">
    <span class="text-display">{{ label }}</span> 
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
  display: inline-block; 
  padding: 10px 15px; 
  margin: 25px 0px; 
  border: 2px solid #3a3ab9; 
  border-radius: 8px; 
  background-color: #f9f9f9; 
  min-width: 180px; 
  max-width: 250px; 
  text-align: center; 
  font-weight: bold;
  color: #3a3ab9; 
}
</style>

