<template>
  <section class="event-section">
    <header class="section-header">
      <h2 class="section-title">{{ title }}</h2>
    </header>

    <div class="divider"></div>

    <div class="section-content">
      <template v-if="type === 'notice'">
        <span class="notice-description">{{ content.description }}</span>
      </template>
      <template v-else>
        <p class="event-content">{{ content }}</p>
      </template>
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
    subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: [String, Object],
      required: true,
    },
    type: {
      type: String,
      default: "event",
    },
  },
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
  font-family: Poppins;
  color: #000;
  margin: 0;
}


.divider {
  width: 100%;
  height: 3px;
  background-color: #d9d9d9;
}

.section-content {
  font-size: 20px;
  font-weight: 400;
  font-family: Poppins;
  line-height: 35px;
}

.event-content {
  color: #333;
  margin: 0;
}


.notice-description {
  color: #333;
}
</style>
