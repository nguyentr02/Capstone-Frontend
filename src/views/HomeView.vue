<template>
    <div id="app" class="page-container">
    <AppEventList />
    <AppEventCard />
  </div>

</template>

<script>
import AppEventCard from "../components/EventCard.vue";
import AppEventList from "../components/EventList.vue";

export default {
  name: "HomeView",
  components: {
    AppEventList,
  },
};

</script>

<style scoped>
</style>
