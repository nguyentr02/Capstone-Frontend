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
      selectedType: "Type: Text", // 默认显示的类型
      showList: false, // 控制列表显示
    };
  },
  methods: {
    toggleList() {
      this.showList = !this.showList; // 点击后显示/隐藏列表
    },
    updateType(type) {
      this.selectedType = type; // 更新显示的类型
      this.showList = false; // 选中后隐藏列表
      this.$emit("update-type", type);
    },
  },
};
</script>

<style scoped>
.type-selector {
  border-radius: 15px;
  background-color: rgba(243, 243, 243, 1);
  border: 1px solid rgba(245, 245, 245, 1);
  display: flex;
  margin-top: 14px;
  width: 75%;
  max-width: 100%;
  padding-left: 20px;
  align-items: center;
  gap: 20px;
  line-height: 2;
  justify-content: space-between;
  cursor: pointer; /* 添加鼠标悬停效果 */
}

.type-text {
  color: #333;
  margin: auto 0;
}

.selector-icon {
  width: 51px;
}

@media (max-width: 991px) {
  .type-selector {
    margin-right: 2px;
  }
}
</style>

