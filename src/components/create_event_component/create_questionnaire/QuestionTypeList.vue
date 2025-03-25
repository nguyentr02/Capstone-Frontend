<template>
  <div class="type-list">
    <div class="type-item" v-for="type in types" :key="type" @click="selectType(type)">
      {{ type }}
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionTypeList",
  data() {
    return {
      types: ["Type: Text", "Type: Rating bar", "Type: number", "Type: date", "Type: ???"],
    };
  },
  methods: {
    selectType(type) {
      this.$emit("selectType", type); // 触发事件，传递选中的类型
    },
  },
};
</script>

<style scoped>
.type-list {
  background-color: rgba(243, 243, 243, 1);
  border: 1px solid rgba(245, 245, 245, 1);
  display: flex;
  margin-top: 15px;
  width: 200px;
  max-width: 100%;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.type-item {
  cursor: pointer;
  padding: 8px 10px;
  transition: background-color 0.3s;
}

.type-item:hover {
  background-color: rgba(200, 200, 200, 0.3);
}

.type-item:not(:first-child) {
  margin-top: 5px;
}
</style>

