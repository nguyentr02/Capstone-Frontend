<template>
    <div class="type-selector" @click="toggleList">
      <span class="type-text">{{ selectedType }}</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d27a5dd6fdd5422919368551b122e5327ea0c1b7f3390680fd6434439f9ea9c?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385"
        alt="Type selector"
        class="selector-icon"
      />
    </div>
    <QuestionTypeList v-if="showList" @selectType="updateType" />
  </template>
  
  <script>
  import QuestionTypeList from "./QuestionTypeList.vue";
  
  export default {
    name: "QuestionnaireTypeSelector",
    components: { QuestionTypeList },
    data() {
      return {
        selectedType: "Type: Text", 
        showList: false, 
      };
    },
    methods: {
      toggleList() {
        this.showList = !this.showList; 
      },
      updateType(type) {
        this.selectedType = type; 
        this.showList = false; 
        this.$emit("update-type", type);
      },
    },
  };
  </script>