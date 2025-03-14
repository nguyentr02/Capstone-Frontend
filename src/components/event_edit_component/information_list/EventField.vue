<template>
  <section class="event-field">
    <!-- 可编辑的 label -->
    <div class="label-container">
      <input
        type="text"
        class="field-label"
        :value="label"
        @input="updateLabel($event.target.value)"
      />
    </div>

    <!-- 可编辑的 value -->
    <input
      type="text"
      class="field-value"
      :value="value"
      @input="updateValue($event.target.value)"
    />
  </section>
</template>

<script>
export default {
  name: "EventField",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    // 当 label 输入内容改变时，触发一个自定义事件，向父组件发送新值
    updateLabel(newLabel) {
      this.$emit("update:label", newLabel);
    },
    // 当 value 输入内容改变时，触发一个自定义事件，向父组件发送新值
    updateValue(newValue) {
      this.$emit("update:value", newValue);
    },
  },
};
</script>

<style scoped>
.event-field {
  display: flex;
  flex-direction: column;
  gap: 21px;
  align-items: flex-start; /* 将 align-items 改为 flex-start，更贴近默认左对齐 */
  justify-content: center;
  text-align: left; /* 如果需要左对齐 */
}

/* 让输入框的样式与原先类似 */
.label-container {
  width: 169px;
}

.field-label {
  color: #261bc3;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  width: 168px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #281dc0;
  background-color: #fff;
  padding: 0 8px; /* 适当添加内边距，便于输入 */
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.field-value {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  height: 36px;
  background-color: #f3f3f3;
  border: 1px solid #f5f5f5; /* 加上 border 保证可见的输入框边框 */
  padding: 0 8px; /* 适当添加内边距 */
  box-sizing: border-box;
}
</style>
