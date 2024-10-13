<template>
    <article class="event-card">
      <div class="event-image"></div>
      <div class="event-details">
        <div class="event-date">
          <span class="event-month">{{ month }}</span>
          <span class="event-day">{{ day }}</span>
        </div>
        <div class="event-info">
          <h2 class="event-title">{{ title }}</h2>
          <p class="event-description">{{ description }}</p>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    props: {
      month: String,
      day: String,
      title: String,
      description: String
    }
  }
  </script>
  
  <style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  border-radius: 21px;
  background-color: #d9d9d9;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  max-height: 320px; /* 控制整个卡片的最大高度 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 调整阴影大小和透明度 */
}

.event-image {
  flex-shrink: 0;
  height: 150px; /* 控制图片高度 */
  background-color: #d9d9d9;
}

.event-details {
  flex-grow: 1;
  background-color: #fff;
  padding: 16px 24px;
  gap: 16px;
  display: flex;
  border-radius: 0 0 19px 19px;
}

  
 .event-date {
  display: flex;
  flex-direction: column;
  font-weight: 700;
}

.event-month {
  color: #7000ff;
  font-size: 12px;
}

.event-day {
  color: #000;
  font-size: 30px;
}

.event-info {
  flex: 1;
}

.event-title {
  color: #000;
  font-size: 16px; /* 缩小字体 */
  font-weight: 700;
  line-height: 24px; /* 缩小行高 */
  margin: 0 0 12px; /* 缩小底部间距 */
}

.event-description {
  color: #6a6a6a;
  font-size: 14px; /* 缩小字体 */
  font-weight: 400;
  line-height: 20px; /* 缩小行高 */
  margin: 0;
}

@media (max-width: 991px) {
  .event-details {
    padding: 16px 16px; /* 窄屏幕时再减小内边距 */
  }
}

</style>