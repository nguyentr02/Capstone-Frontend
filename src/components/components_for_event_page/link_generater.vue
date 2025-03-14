<template>
  <section class="link-generator">
    <div class="control-panel">
      <button class="generate-button" @click="generateLink">
        generate link here
      </button>
      <div class="action-buttons">
        <!-- Confirm 按钮：打印数据库 (localStorage 中的 fields) -->
        <button class="confirm-button" @click="confirmLink">
          Confirm
        </button>
        <!-- Cancel 按钮：删除数据库 (localStorage 中的 fields)，并通知父组件 -->
        <button class="cancel-button" @click="cancelAction">
          Cancel
        </button>
      </div>
    </div>
    <!-- 显示生成的链接或默认文本 -->
    <div class="link-display">
      {{ generatedLink || "empty_empty_empty" }}
    </div>
  </section>
</template>

<script>
export default {
  name: "LinkGenerator",
  data() {
    return {
      generatedLink: "",
    };
  },
  methods: {
    // 模拟生成链接
    generateLink() {
      this.generatedLink = "https://example.com/link/" + Date.now();
    },
    // Confirm：打印数据库 (localStorage 中的 fields)
    confirmLink() {
      const data = localStorage.getItem("fields");
      if (data) {
        console.log("database collected:", JSON.parse(data));
        alert("database collected:\n" + data);
      } else {
        alert("database is empty!");
      }
    },
    // Cancel：删除数据库 (localStorage 中的 fields) 并通知父组件
    cancelAction() {
      localStorage.removeItem("fields");
      alert("database deleted");
      // 清空链接
      this.generatedLink = "";
      // 通知父组件清空内存中的 fields
      this.$emit("database-cleared");
    },
  },
};
</script>

<style scoped>
.link-generator {
  display: flex;
  align-items: stretch;
  gap: 40px 46px;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 16px;
  flex-wrap: wrap;
  max-width: 100%;
}

@media (max-width: 640px) {
  .link-generator {
    margin-bottom: -5px;
  }
}

.control-panel {
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
  text-align: center;
  line-height: 23.9px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 0;
  width: fit-content;
  margin-bottom: auto;
}

@media (max-width: 640px) {
  .control-panel {
    margin-top: auto;
  }
}

.generate-button {
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgba(119, 120, 176, 1);
  padding: 10px 109px;
  color: inherit;
  font: inherit;
}

@media (max-width: 991px) {
  .generate-button {
    padding-left: 40px;
    padding-right: 40px;
  }
}

.action-buttons {
  display: flex;
  margin-top: 21px;
  align-items: stretch;
  gap: 20px;
  justify-content: space-between;
}

.confirm-button {
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgba(238, 18, 18, 0.84);
  padding: 10px 55px;
  color: inherit;
  font: inherit;
}

@media (max-width: 991px) {
  .confirm-button {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.cancel-button {
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgba(119, 120, 176, 0.84);
  padding: 10px 55px;
  white-space: nowrap;
  color: inherit;
  font: inherit;
}

@media (max-width: 991px) {
  .cancel-button {
    padding-left: 20px;
    padding-right: 20px;
    white-space: initial;
  }
}

.link-display {
  border: 1px solid rgba(121, 121, 121, 1);
  background-color: rgba(246, 246, 246, 1);
  align-self: start;
  padding: 40px 20px;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  white-space: nowrap;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  width: fit-content;
  margin: auto 0;
}

@media (max-width: 991px) {
  .link-display {
    max-width: 100%;
    padding-right: 20px;
    white-space: initial;
  }
}
</style>

  