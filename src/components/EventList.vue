<template>
    <main class="event-list">
      <section v-for="(row, index) in eventRows" :key="index" class="event-row">
        <EventCard
          v-for="event in row"
          :key="event.id"
          :month="event.month"
          :day="event.day"
          :title="event.title"
          :description="event.description"
        />
      </section>
    </main>
  </template>
  
  <script>
  import EventCard from './EventCard.vue';
  
  export default {
    components: {
      EventCard
    },
    data() {
      return {
        events: [
          {
            id: 1,
            month: 'APR',
            day: '14',
            title: 'Wonder Girls 2024 Wonder Girls World Tour San Francisco',
            description: "We'll get you directly seated and inside for you to enjoy the show."
          },
          {
            id: 2,
            month: 'APR',
            day: '12',
            title: 'JYJ 2024 JYJ Worldwide Concert Barcelona',
            description: "We'll get you directly seated and inside for you to enjoy the show."
          },
          {
            id: 3,
            month: 'APR',
            day: '8',
            title: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
            description: 'Directly seated and inside for you to enjoy the show.'
          },
          {
            id: 4,
            month: 'APR',
            day: '14',
            title: 'Wonder Girls 2024 Wonder Girls World Tour San Francisco',
            description: "We'll get you directly seated and inside for you to enjoy the show."
          },
          {
            id: 5,
            month: 'APR',
            day: '12',
            title: 'JYJ 2024 JYJ Worldwide Concert Barcelona',
            description: "We'll get you directly seated and inside for you to enjoy the show."
          },
          {
            id: 6,
            month: 'APR',
            day: '8',
            title: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
            description: 'Directly seated and inside for you to enjoy the show.'
          },
          {
            id: 7,
            month: 'APR',
            day: '14',
            title: 'Wonder Girls 2024 Wonder Girls World Tour San Francisco',
            description: "We'll get you directly seated and inside for you to enjoy the show."
          },
          {
            id: 8,
            month: 'APR',
            day: '12',
            title: 'JYJ 2024 JYJ Worldwide Concert Barcelona',
            description: "We'll get you directly seated and inside for you to enjoy the show."
          },
          {
            id: 9,
            month: 'APR',
            day: '8',
            title: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
            description: 'Directly seated and inside for you to enjoy the show.'
          },
        ]
      };
    },
    computed: {
  eventRows() {
    const rows = [];
    for (let i = 0; i < this.events.length; i += 3) {
      const row = this.events.slice(i, i + 3);
      if (row.length > 0) rows.push(row); // 只添加有卡片的行
    }
    return rows;
  }
}

  }
  </script>
  
  <style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center; /* 居中对齐 */
  max-width: 900px; /* 控制整体宽度 */
  margin: 60px auto;
}
  
.event-row {
  display: flex;
  gap: 20px;
  justify-content: center; /* 居中对齐卡片 */
}
  
  @media (max-width: 991px) {
    .event-row {
      flex-direction: column;
      align-items: center; /* 小屏幕上居中对齐 */
    }
  }
  </style>