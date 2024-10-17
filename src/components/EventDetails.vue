<template>
  <div class="event-page">
    <!-- 返回按钮 -->
    <button class="back-button" @click="$router.go(-1)">←</button>

    <!-- 左侧事件详情 -->
    <div class="event-left">
      <img class="event-image" :src="eventData.image" alt="Event Image" />

      <div class="description">
        <h3>Description</h3>
        <p>{{ eventData.description }}</p>
      </div>
    </div>

    <!-- 右侧事件信息 -->
    <div class="event-right">
      <h1>{{ eventData.name }}</h1>
      <button class="register-button" @click="goToTicketSelection">Register Now</button>

      <div class="event-info">
        <p><strong>When</strong><br>{{ eventData.date }}</p>
        <p><strong>Location</strong><br>{{ eventData.location }}</p>
        <p><strong>Visit organizer's website:</strong> <a :href="eventData.website">{{ eventData.website }}</a></p>
      </div>

      <div class="event-map">
        <iframe
          :src="eventData.mapUrl"
          width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"
        ></iframe>
      </div>

      <div class="share-link">
        <p><strong>Share:</strong></p>
        <input type="text" readonly :value="eventData.shareLink" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          id: 1,
          name: '活动 1',
          description:
            'Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc sociosqu a hac semper nullam lectus laoreet. Vestibulum aenean condimentum ornare a ex ridiculus lacinia tellus per. Dolor fusce platea massa odio maximus cras curae ligula. Urna et fringilla at montes tincidunt. Luctus tempus habitant suscipit egestas id. Primis suspendisse himenaeos sem ad nunc posuere porttitor vitae. Semper nullam lectus laoreet. Vestibulum aenean condimentum ornare a ex ridiculus lacinia tellus per. Dolor fusce platea massa odio maximus cras curae ligula. Urna et fringilla at montes tincidunt. Luctus tempus habitant suscipit egestas id. Primis suspendisse himenaeos sem ad nunc posuere porttitor vitae.',
          date: '2024年10月13日，星期日',
          location: 'Melbourne Cricket Ground (MCG)，Hawthorn',
          website: 'https://example.com',
          mapUrl: 'https://www.google.com/maps/embed?pb=...',
          image: 'https://via.placeholder.com/600x400',
          shareLink: 'https://link.to.event1.com',
        },
        {
          id: 2,
          name: 'Event 2',
          description: 'Detailed description for Event 2.',
          date: 'October 14, 2024, Monday',
          location: 'Sydney Opera House, Sydney',
          website: 'https://example2.com',
          mapUrl: 'https://www.google.com/maps/embed?pb=...',
          image: 'https://via.placeholder.com/600x400',
          shareLink: 'https://link.to.event2.com',
        },
        // 更多事件...
      ],
      eventData: null,
    };
  },
  created() {
    const eventId = this.$route.params.id;
    this.loadEventDetails(eventId);
  },
  methods: {
    loadEventDetails(id) {
      // 查找匹配的事件数据
      this.eventData = this.events.find(event => event.id === parseInt(id, 10));
    },
    goToTicketSelection() {
      // 跳转到票种选择页面
      this.$router.push(`/ticket-selection`);
    }
  }
};
</script>

<style scoped>
.event-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
}

.back-button {
  position: absolute;
  left: 20px;
  top: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.event-left {
  width: 60%;
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.description {
  margin-top: 20px;
}

.event-right {
  width: 35%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.register-button {
  background-color: #00d200;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.register-button:hover {
  background-color: #00a300;
}

.event-info p {
  margin: 10px 0;
}

.event-map {
  margin-top: 20px;
}

.share-link {
  margin-top: 20px;
  width: 100%;
}

.share-link input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
</style>
