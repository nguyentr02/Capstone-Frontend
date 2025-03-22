<template>
    <DashBar />

    <ChartSettings @confirm-settings="handleConfirmSettings" />
    
    <div v-if="settingsData" class="received-settings">
      <h2>received data</h2>
      <p><strong>chart type：</strong> {{ settingsData.chartType }}</p>
      <p><strong>X axis：</strong> {{ settingsData.xValue }}</p>
      <p><strong>Y axis：</strong> {{ settingsData.yValue }}</p>
      <p><strong>topic：</strong> {{ settingsData.chartTopic }}</p>
    </div>

    <LinkGenerator />

  </template>
  
  <script>
  import DashBar from "@/components/components_for_event_page/DashBar.vue";
  import LinkGenerator from "@/components/event_edit_component/link_generater.vue";
  import ChartSettings from "@/components/Report_generation_component/setting/ChartSettings.vue";
  
  export default {
    name: "ReportGeneration",
    components: {
      DashBar,
      ChartSettings,
      LinkGenerator,
    },
    data() {
      return {
        settingsData: null,
      };
    },
    methods: {
      handleConfirmSettings(data) {
        this.settingsData = data;
      },
    },
  };
  </script>
  
  <style scoped>
  .received-settings {
    margin-top: 24px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .received-settings h2 {
    margin-bottom: 12px;
  }
  </style>
  