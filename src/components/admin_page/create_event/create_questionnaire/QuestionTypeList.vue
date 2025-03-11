<template>
  <div class="type-list">
    <div class="type-item">Type: Text</div>
    <div class="type-item">Type: Text</div>
    <div class="type-item">Type: Text</div>
    <div class="type-item">Type: Text</div>
    <div class="type-item">Type: Text</div>
  </div>
</template>

<script>
export default {
  name: "QuestionTypeList",
};
</script>

<style scoped>
.type-list {
  background-color: rgba(243, 243, 243, 1);
  border: 1px solid rgba(245, 245, 245, 1);
  align-self: flex-end;
  display: flex;
  margin-top: 15px;
  width: 201px;
  max-width: 100%;
  padding: 23px 40px 23px 15px;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
}

.type-item {
  -webkit-text-stroke-width: 0.36px;
  -webkit-text-stroke-color: #f5f5f5;
  border-color: rgba(245, 245, 245, 1);
}

.type-item:not(:first-child) {
  margin-top: 19px;
}

@media (max-width: 991px) {
  .type-list {
    margin-right: 2px;
    padding-right: 20px;
  }
}
</style>
