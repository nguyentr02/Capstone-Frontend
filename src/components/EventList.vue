<template> 
  <div class="event-page">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search events..." 
        class="search-input"
      />
    </div>

    <!-- 筛选弹出框 -->
    <FilterPopup :showFilter="showFilter" @closeFilter="closeFilter" @applyFilter="applyFilter" />

    <!-- 搜索过滤按钮 -->
    <div class="filter-bar">
      <button class="open-filter-button" @click="showFilter = true">Open Filter</button>
    </div>

    <!-- 事件列表 -->
    <div class="event-list">
      <h2>Trending Events</h2>
      <div class="trending-cards">
        <div
          class="event-card trending"
          v-for="event in filteredTrendingEvents"
          :key="event.id"
          @click="goToEventDetails(event.id)"
        >
          <h3>{{ event.name }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>

      <h2>All Events</h2>
      <div class="event-cards">
        <div
          class="event-card"
          v-for="event in paginatedEvents"
          :key="event.id"
          @click="goToEventDetails(event.id)"
        >
          <h3>{{ event.name }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>

      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FilterPopup from './FilterPopup.vue';

export default {
  components: {
    FilterPopup,
  },
  data() {
    return {
      showFilter: false,
      searchQuery: '',  // 搜索栏输入的内容
      trendingEvents: [
        { id: 1, name: "Trending Event 1", description: "Description of Trending Event 1", activity: "Sport", price: 100 },
        { id: 2, name: "Trending Event 2", description: "Description of Trending Event 2", activity: "Music", price: 150 },
        { id: 3, name: "Trending Event 3", description: "Description of Trending Event 3", activity: "Art", price: 200 },
        { id: 4, name: "Trending Event 4", description: "Description of Trending Event 4", activity: "Food", price: 50 },
      ],
      events: [
        { id: 5, name: "Event 1", description: "Description of Event 1", activity: "Sport", price: 120 },
        { id: 6, name: "Event 2", description: "Description of Event 2", activity: "Music", price: 90 },
        { id: 7, name: "Event 3", description: "Description of Event 3", activity: "Art", price: 130 },
        { id: 8, name: "Event 4", description: "Description of Event 4", activity: "Food", price: 60 },
        { id: 9, name: "Event 5", description: "Description of Event 5", activity: "Sport", price: 140 },
        { id: 10, name: "Event 6", description: "Description of Event 6", activity: "Music", price: 80 },
        { id: 11, name: "Event 7", description: "Description of Event 7", activity: "Art", price: 110 },
        { id: 12, name: "Event 8", description: "Description of Event 8", activity: "Food", price: 70 },
      ],
      currentPage: 1,
      itemsPerPage: 8,
      filterCriteria: {
        activity: "",
        location: "",
        minPrice: 0,
        maxPrice: Infinity,
      },
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredEvents.slice(start, start + this.itemsPerPage);
    },
    filteredEvents() {
      return this.events.filter(event => {
        return (
          (!this.filterCriteria.activity || event.activity === this.filterCriteria.activity) &&
          (event.price >= this.filterCriteria.minPrice && event.price <= this.filterCriteria.maxPrice) &&
          (event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || event.description.toLowerCase().includes(this.searchQuery.toLowerCase()))  // 过滤搜索内容
        );
      });
    },
    filteredTrendingEvents() {
      return this.trendingEvents.filter(event => {
        return (
          (!this.filterCriteria.activity || event.activity === this.filterCriteria.activity) &&
          (event.price >= this.filterCriteria.minPrice && event.price <= this.filterCriteria.maxPrice) &&
          (event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || event.description.toLowerCase().includes(this.searchQuery.toLowerCase()))  // 过滤搜索内容
        );
      });
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToEventDetails(eventId) {
      this.$router.push(`/events/${eventId}`); // 跳转到事件详情页面
    },
    closeFilter() {
      this.showFilter = false;
    },
    applyFilter(filterData) {
      this.filterCriteria = {
        activity: filterData.selectedActivity,
        location: filterData.location,
        minPrice: filterData.minPrice || 0,
        maxPrice: filterData.maxPrice || Infinity,
      };
      this.closeFilter();
    },
  },
};
</script>

<style scoped>
.event-page {
  margin: 20px;
}

/* 搜索栏样式 */
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 过滤栏样式 */
.filter-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.open-filter-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.open-filter-button:hover {
  background-color: #369e6f;
}

/* Trending Events 样式 */
.trending-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

/* All Events 样式 */
.event-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

/* 事件卡片样式 */
.event-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s;
  text-align: center;
}

.event-card:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

/* 分页部分样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background-color: #0a075f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:enabled {
  background-color: #1a1a7f;
}

/* 响应式布局：适配不同屏幕 */
@media (max-width: 1200px) {
  .trending-cards,
  .event-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .trending-cards,
  .event-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .trending-cards,
  .event-cards {
    grid-template-columns: 1fr;
  }
}
</style>
