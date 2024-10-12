<template>
  <div class="event-details">
    <h2>Event Details for ID: {{ id }}</h2>
    <p>This is where detailed information about the event will be shown.</p>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>

<style scoped>
.event-details {
  margin: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
</style>
