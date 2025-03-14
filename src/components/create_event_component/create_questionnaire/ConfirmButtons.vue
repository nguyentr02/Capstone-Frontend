<template>
  <div class="button-container">
    <button class="button" @click="confirm">Confirm</button>
    <button class="button">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "ConfirmButtons",
  methods: {
    confirm() {
      this.$emit("confirm"); // 触发事件
    },
  },
};
</script>


<style scoped>
.button-container {
  align-self: flex-start;
  display: flex;
  margin-top: 84px;
  align-items: stretch;
  gap: 44px;
  color: rgba(0, 0, 0, 1);
  white-space: nowrap;
  text-align: center;
  line-height: 2;
}

.button {
  border: none;
  border-radius: 5px;
  background-color: rgba(162, 157, 235, 0.1);
  padding: 10px 53px;
  cursor: pointer;
}

@media (max-width: 991px) {
  .button-container {
    margin-left: 4px;
    margin-top: 40px;
    white-space: initial;
  }

  .button {
    padding: 10px 20px;
  }
}
</style>
