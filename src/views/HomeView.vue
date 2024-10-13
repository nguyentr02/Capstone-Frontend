<template>
  <div id="app" class="page-container">
    <Navbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<style scoped>
/* 搜索和筛选栏 */
.search-filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 10px;
  background-color: #f7e3e3;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 搜索输入框 */
.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
}

/* 筛选按钮 */
.filter-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #369e6f;
}

/* 活动展示部分 */
.events-section {
  margin: 20px;
}

/* 活动卡片部分 */
.event-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.event-card {
  background-color: #d9d9d9;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.event-card:hover {
  transform: scale(1.05);
}
</style>