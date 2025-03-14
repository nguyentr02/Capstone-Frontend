<template>
  <section class="event-section">
    <header class="section-header">
      <input 
        class="section-title"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        placeholder="Descript the Notice in Here"
      />
    </header>

    <div class="divider"></div>

    <div class="section-content">
      <textarea
        ref="autoTextarea"
        class="event-content"
        :value="content"
        @input="onInput"
        placeholder="Enter event content"
      ></textarea>
    </div>
    
  </section>
</template>

<script>
export default {
  name: "EventSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    // 当用户输入时，触发更新父组件数据并自动调整高度
    onInput(event) {
      // 1. 通知父组件更新 content
      this.$emit("update:content", event.target.value);
      // 2. 调整 textarea 高度
      this.autoResize();
    },
    autoResize() {
      const textarea = this.$refs.autoTextarea;
      if (textarea) {
        // 先将高度设置为 auto，才能正确获取 scrollHeight
        textarea.style.height = "auto";
        // 再设置成 scrollHeight，让 textarea 正好容纳所有文本
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    },
  },
  mounted() {
    // 组件挂载后，若 content 初始就有多行文本，可立即执行一次自适应
    this.autoResize();
  },
  updated() {
    // 若 content 可能在父组件被修改，也可在 updated 时再次自适应
    this.autoResize();
  }
};
</script>

<style scoped>
.event-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  font-family: Poppins, sans-serif;
  color: #000;
  margin: 0;
  border: none;
  outline: none;
  width: 100%;
}

.divider {
  width: 100%;
  height: 3px;
  background-color: #d9d9d9;
}

.section-content {
  font-size: 20px;
  font-weight: 400;
  font-family: Poppins, sans-serif;
  line-height: 35px;
}

.event-content {
  width: 100%;
  box-sizing: border-box;
  color: #333;
  margin: 0;
  padding: 8px;
  font-size: 18px;
  line-height: 1.5;
  outline: none;
  resize: none;           /* 禁止用户手动拖拽 */
  overflow-y: hidden;     /* 隐藏滚动条，由脚本控制高度 */
  border: none;
  white-space: pre-wrap;  /* 保持换行和空格 */
}
</style>

