<template>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <header class="event-header">
      <h1 class="brand-title">Adminfy</h1>
      <h2 class="event-subtitle">{{ pageTitle }}</h2>
    </header>
  </template>
  
  <style scoped>
  .event-header {
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: #7000ff;
    padding: 24px 32px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 991px) {
    .event-header {
      padding: 20px 24px;
    }
  }
  
  @media (max-width: 640px) {
    .event-header {
      padding: 16px 20px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
  
  .brand-title {
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
  
  @media (max-width: 991px) {
    .brand-title {
      font-size: 22px;
    }
  }
  
  @media (max-width: 640px) {
    .brand-title {
      font-size: 20px;
    }
  }
  
  .event-subtitle {
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 500;
    opacity: 0.9;
    margin: 0;
  }
  
  @media (max-width: 991px) {
    .event-subtitle {
      font-size: 18px;
    }
  }
  
  @media (max-width: 640px) {
    .event-subtitle {
      font-size: 16px;
    }
  }
  </style>

<script>
export default {
  name: "DashBar",
  data() {
    return {
      pageTitle: "Loading..."
    };
  },
  mounted() {
    // 获取当前路由的路径，并提取最后一部分
    this.updateTitle();
  },
  watch: {
    // 监听路由变化，动态更新标题
    $route() {
      this.updateTitle();
    }
  },
  methods: {
    updateTitle() {
      // 提取 URL 的最后一部分，例如 "/Create_questionnaire_view"
      const pathSegments = this.$route.path.split("/");
      this.pageTitle = pathSegments[pathSegments.length - 1] || "Admin Page";

      // 设置浏览器标签页标题
      document.title = this.pageTitle;
    }
  }
};
</script>