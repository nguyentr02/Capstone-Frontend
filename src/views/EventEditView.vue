<template>
  <div>
    <DashBar />
    <!-- 将 fields 数据传递给 EventDetails 组件 -->
    <EventDetails ref="eventDetails" />

    <EventDescription />
    <!-- 监听 LinkGenerator 的两个事件 -->
    <LinkGenerator 
      @database-cleared="clearFieldsInMemory" 
      @confirm-click="saveDataToDatabase" 
    />
  </div>
</template>

<script>
import DashBar from "@/components/components_for_event_page/DashBar.vue";
import LinkGenerator from "@/components/components_for_event_page/link_generater.vue";
import EventDetails from "@/components/event_edit_component/information_list/EventDetails.vue";
import EventDescription from "@/components/event_edit_component/description_list/EventDescription.vue";

export default {
  name: "Event_Information_Edit",
  components: {
    DashBar,
    EventDetails,
    LinkGenerator,
    EventDescription,
  },
  methods: {
    clearFieldsInMemory() {
      localStorage.removeItem("fields");
      if (this.$refs.eventDetails) {
        this.$refs.eventDetails.fields = [];
      }
    },
    saveDataToDatabase() {
      const data = localStorage.getItem("fields");
    }
  }
};
</script>

