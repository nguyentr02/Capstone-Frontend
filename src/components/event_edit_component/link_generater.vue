<template>
  <!-- 外层容器，包含生成链接、确认、取消按钮及链接显示区域 -->
  <section class="link-generator">
    <div class="control-panel">
      <!-- 点击此按钮调用 generateLink 方法生成链接 -->
      <button class="generate-button" @click="generateLink">
        generate link here
      </button>
      <div class="action-buttons">
        <!-- Confirm 按钮：点击后调用 confirmLink 方法打印 localStorage 中的数据 -->
        <button class="confirm-button" @click="confirmLink">
          Confirm
        </button>
        <!-- Cancel 按钮：点击后调用 cancelAction 方法删除数据，并通过 $emit 通知父组件 -->
        <button class="cancel-button" @click="cancelAction">
          Cancel
        </button>
      </div>
    </div>
    <!-- 显示生成的链接或当链接为空时显示默认文本 -->
    <div class="link-display">
      {{ generatedLink || "empty_empty_empty" }}
    </div>
  </section>
</template>

<script>
// 从工具文件中引入生成链接的函数
import { generateLink } from "@/components/components_for_event_page/linkGenerator.js";

export default {
  name: "LinkGenerator",
  data() {
    return {
      // 用于存储生成的链接文本
      generatedLink: "",
    };
  },
  methods: {
    // 调用外部 generateLink 函数生成链接，并更新 data 中的 generatedLink
    generateLink() {
      this.generatedLink = generateLink();
    },

    // 从 localStorage 获取数据并显示（同时打印到控制台）
    confirmLink() {
      // 获取 localStorage 中的 'fields' 和 'descriptions'
      const fieldsData = localStorage.getItem("fields");
      const descriptionsData = localStorage.getItem("descriptions");
  
      let message = "";
      // 如果 fields 数据存在，则添加到消息中；否则提示为空
      if (fieldsData) {
        message += "Fields:\n" + fieldsData + "\n\n";
      } else {
        message += "Fields are empty!\n\n";
      }
  
      // 同理处理 descriptions 数据
      if (descriptionsData) {
        message += "Descriptions:\n" + descriptionsData;
      } else {
        message += "Descriptions are empty!";
      }
  
      // 输出到控制台，并通过 alert 弹窗显示数据
      console.log("database collected:", { fields: fieldsData, descriptions: descriptionsData });
      alert(message);

      // 注意：如果希望父组件收到确认事件，请在这里调用 $emit
      // 例如：this.$emit("confirm-click", { fields: fieldsData, descriptions: descriptionsData });
    },

    // 取消操作：删除 localStorage 中的相应数据，清空链接，并通知父组件清空内存数据
    cancelAction() {
      // 删除 localStorage 中的数据
      localStorage.removeItem("fields");
      localStorage.removeItem("descriptions");
      alert("database deleted");
      // 清空链接显示
      this.generatedLink = "";
      // 使用 $emit 向父组件发送事件，通知其已清空数据
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

  