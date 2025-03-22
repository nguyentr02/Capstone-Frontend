<template>
  <div class="event-information-edit">
    <!-- 顶部区域：显示 DashBar 组件 -->
    <div class="dashbar-container">
      <DashBar />
    </div>

    <!-- 中间区域：左右两个块分别放置 EventDetails 和 EventDescription -->
    <!-- 使用 ref 方便在方法中获取子组件数据 -->
    <div class="content-container">
      <div class="left-block">
        <EventDetails ref="eventDetails" />
      </div>
      <div class="right-block">
        <EventDescription ref="eventDescription" />
      </div>
    </div>

    <!-- 底部区域：放置 LinkGenerator 组件 -->
    <div class="bottom-container">
      <!-- 监听 LinkGenerator 中触发的事件 -->
      <!-- 当清空数据库事件触发时调用 clearFieldsInMemory -->
      <!-- 当确认按钮（确认数据保存）事件触发时调用 saveDataToDatabase -->
      <LinkGenerator 
        @database-cleared="clearFieldsInMemory"  
        @confirm-click="saveDataToDatabase" 
      />
    </div>
  </div>
</template>

<script>
// 导入子组件
import DashBar from "@/components/components_for_event_page/DashBar.vue";
import EventDetails from "@/components/event_edit_component/information_list/EventDetails.vue";
import EventDescription from "@/components/event_edit_component/description_list/EventDescription.vue";
import LinkGenerator from "@/components/event_edit_component/link_generater.vue";
// 注意：确保 axios 已导入，否则 saveDataToDatabase 中会报错
// import axios from "axios";

export default {
  name: "Event_Information_Edit",
  components: {
    DashBar,
    EventDetails,
    EventDescription,
    LinkGenerator,
  },
  methods: {
    // 清空数据：删除 localStorage 中的数据，同时清空 EventDetails 和 EventDescription 子组件的数据
    clearFieldsInMemory() {
      localStorage.removeItem("fields");
      localStorage.removeItem("descriptions");
      // 如果 EventDetails 子组件存在，则清空其 fields 数据（假设其数据属性为 fields）
      if (this.$refs.eventDetails) {
        this.$refs.eventDetails.fields = [];
      }
      // 如果 EventDescription 子组件存在，则清空其 sections 数据（假设其数据属性为 sections）
      if (this.$refs.eventDescription) {
        this.$refs.eventDescription.sections = [];
      }
    },

    // 收集子组件数据并组合成 payload，模拟保存到后端
    async saveDataToDatabase() {
      // 从 EventDetails 子组件中获取 fields 数据
      const fields = this.$refs.eventDetails
        ? this.$refs.eventDetails.fields
        : [];
      // 从 EventDescription 子组件中获取 sections 数据
      const sections = this.$refs.eventDescription
        ? this.$refs.eventDescription.sections
        : [];
      // 组合数据成一个 payload 对象
      const payload = {
        fields,
        sections,
      };
      console.log("Saving to database:", payload);
      try {
        // 使用 axios 发送 POST 请求到后端接口（接口地址根据实际情况调整）
        const response = await axios.post("/api/saveData", payload);
        console.log("Save to DB success:", response.data);
        alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to save data!");
      }
    },
  },
};
</script>

<style scoped>
.event-information-edit {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  margin: 0 auto;
}

.create-questionnaire-view {
  width: 50%;
  min-height: 100vh;
  font-family: sans-serif;
  margin: 0 auto;
}

/* 顶部 DashBar 区域 */
.dashbar-container {
  padding: 16px;
  color: #fff;
}

/* content-container 中通过 ::after 清除浮动 */
.content-container {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  /* 关键：清除浮动 */
  position: relative;
}
.content-container::after {
  content: "";
  display: block;
  clear: both;
}

/* 左侧区域：EventQuestionnaireEdit */
.left-block {
  float: left;         
  width: 50%;          
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  margin-right: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

/* 右侧区域：QuestionnaireForm */
.right-block {
  float: left;        
  width: 45%;          
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  margin-right: 10px;
}

/* 底部区域：LinkGenerator */
.bottom-container {
  padding: 16px;
  text-align: center;
  margin-top: 20px;
}
</style>

