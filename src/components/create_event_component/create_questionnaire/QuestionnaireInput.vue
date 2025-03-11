<template>
  <div class="input-wrapper">
    <span class="text-display">{{ label }}</span> <!-- 文字显示 -->
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
  display: inline-block; /* 让元素不会占满整行 */
  padding: 10px 15px; /* 让内容与边框有间距 */
  margin: 25px 0px; /* 居中对齐并添加上下间距 */
  border: 2px solid #3a3ab9; /* 蓝色边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #f9f9f9; /* 浅灰色背景 */
  min-width: 180px; /* 让它最小宽度变窄 */
  max-width: 250px; /* 让它不会太宽 */
  text-align: center; /* 让文字居中 */
  font-weight: bold; /* 让文字加粗 */
  color: #3a3ab9; /* 蓝色字体 */
}
</style>

