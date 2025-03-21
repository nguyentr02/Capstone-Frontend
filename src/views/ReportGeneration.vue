<template>

    <DashBar />
    <LinkGenerator />
    <ChartSettings />
  
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
};

</script>