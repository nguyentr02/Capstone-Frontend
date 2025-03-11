<template>
  <div class="type-selector">
    <span class="type-text">Type: Text</span>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d27a5dd6fdd5422919368551b122e5327ea0c1b7f3390680fd6434439f9ea9c?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385"
      alt="Type selector"
      class="selector-icon"
    />
  </div>
</template>

<script>
export default {
  name: "QuestionnaireTypeSelector",
};
</script>

<style scoped>
.type-selector {
  border-radius: 15px;
  background-color: rgba(243, 243, 243, 1);
  border: 1px solid rgba(245, 245, 245, 1);
  display: flex;
  margin-top: 14px;
  width: 388px;
  max-width: 100%;
  padding-left: 20px;
  align-items: stretch;
  gap: 20px;
  line-height: 2;
  justify-content: space-between;
}

.type-text {
  -webkit-text-stroke-width: 0.36px;
  -webkit-text-stroke-color: #f5f5f5;
  border-color: rgba(245, 245, 245, 1);
  margin: auto 0;
}

.selector-icon {
  aspect-ratio: 0.91;
  object-fit: contain;
  object-position: center;
  width: 51px;
  border-radius: 0;
  flex-shrink: 0;
}

@media (max-width: 991px) {
  .type-selector {
    margin-right: 2px;
  }
}
</style>
