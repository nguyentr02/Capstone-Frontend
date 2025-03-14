<template>
  <div class="event-information-edit">
    <DashBar />
    <!-- 使用 ref 便于后续获取子组件数据 -->
    <EventDetails ref="eventDetails" />
    <EventDescription ref="eventDescription" />
    <LinkGenerator 
      @database-cleared="clearFieldsInMemory" 
      @confirm-click="saveDataToDatabase" 
    />
  </div>
</template>

<script>
import DashBar from "@/components/components_for_event_page/DashBar.vue";
import EventDetails from "@/components/event_edit_component/information_list/EventDetails.vue";
import EventDescription from "@/components/event_edit_component/description_list/EventDescription.vue";
import LinkGenerator from "@/components/event_edit_component/link_generater.vue";

export default {
  name: "Event_Information_Edit",
  components: {
    DashBar,
    EventDetails,
    EventDescription,
    LinkGenerator,
  },
  methods: {
    
    // 清空数据：清空 localStorage 及子组件中存储的数据
    clearFieldsInMemory() {
      localStorage.removeItem("fields");
      localStorage.removeItem("descriptions");
      if (this.$refs.eventDetails) {
        this.$refs.eventDetails.fields = [];
      }
      if (this.$refs.eventDescription) {
        this.$refs.eventDescription.sections = [];
      }
    },

    // 收集子组件数据，组合后模拟发送到后端
    async saveDataToDatabase() {
      // 从 EventDetails 获取 fields 数据
      const fields = this.$refs.eventDetails
        ? this.$refs.eventDetails.fields
        : [];
      // 从 EventDescription 获取 sections 数据
      const sections = this.$refs.eventDescription
        ? this.$refs.eventDescription.sections
        : [];
      // 组合数据
      const payload = {
        fields,
        sections,
      };
      console.log("Saving to database:", payload);
      try {
        // 模拟发送请求，实际接口地址请根据后端接口进行调整
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
}
</style>

