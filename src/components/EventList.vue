<template>  
  <div class="event-page">

    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search events..." 
        class="search-input"
      />
    </div>

    <FilterPopup :showFilter="showFilter" @closeFilter="closeFilter" @applyFilter="applyFilter" />

    <div class="filter-bar">
      <button class="open-filter-button" @click="showFilter = true">Open Filter</button>
    </div>

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
      searchQuery: '',  
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
        { id: 9, name: "Event 5", description: "Description of Event 5", activity: "Sport", price: 150 },
        { id: 10, name: "Event 6", description: "Description of Event 6", activity: "Music", price: 200 },
        { id: 11, name: "Event 7", description: "Description of Event 7", activity: "Art", price: 80 },
        { id: 12, name: "Event 8", description: "Description of Event 8", activity: "Food", price: 100 },
        { id: 13, name: "Event 9", description: "Description of Event 9", activity: "Sport", price: 120 },
        { id: 14, name: "Event 10", description: "Description of Event 10", activity: "Music", price: 180 },
        { id: 15, name: "Event 11", description: "Description of Event 11", activity: "Art", price: 250 },
        { id: 16, name: "Event 12", description: "Description of Event 12", activity: "Food", price: 30 },
        { id: 17, name: "Event 13", description: "Description of Event 13", activity: "Sport", price: 45 },
        { id: 18, name: "Event 14", description: "Description of Event 14", activity: "Music", price: 25 },
        { id: 19, name: "Event 15", description: "Description of Event 15", activity: "Art", price: 70 },
        { id: 20, name: "Event 16", description: "Description of Event 16", activity: "Food", price: 90 },
        { id: 21, name: "Event 17", description: "Description of Event 17", activity: "Sport", price: 50 },
        { id: 22, name: "Event 18", description: "Description of Event 18", activity: "Music", price: 110 },
        { id: 23, name: "Event 19", description: "Description of Event 19", activity: "Art", price: 40 },
        { id: 24, name: "Event 20", description: "Description of Event 20", activity: "Food", price: 60 },
        { id: 25, name: "Event 21", description: "Description of Event 21", activity: "Sport", price: 75 },
        { id: 26, name: "Event 22", description: "Description of Event 22", activity: "Music", price: 55 },
        { id: 27, name: "Event 23", description: "Description of Event 23", activity: "Art", price: 85 },
        { id: 28, name: "Event 24", description: "Description of Event 24", activity: "Food", price: 95 },
        { id: 29, name: "Event 25", description: "Description of Event 25", activity: "Sport", price: 130 },
        { id: 30, name: "Event 26", description: "Description of Event 26", activity: "Music", price: 100 },
        { id: 31, name: "Event 27", description: "Description of Event 27", activity: "Art", price: 60 },
        { id: 32, name: "Event 28", description: "Description of Event 28", activity: "Food", price: 80 },
        { id: 33, name: "Event 29", description: "Description of Event 29", activity: "Sport", price: 150 },
        { id: 34, name: "Event 30", description: "Description of Event 30", activity: "Music", price: 90 },
        { id: 35, name: "Event 31", description: "Description of Event 31", activity: "Art", price: 110 },
        { id: 36, name: "Event 32", description: "Description of Event 32", activity: "Food", price: 70 }
      ],
      currentPage: 1,
      itemsPerPage: 16,
      filterCriteria: {
        activity: "",
        location: "",
        minPrice: 0,
        maxPrice: Infinity,
      },
    };
  },
  watch: {
    // Reset to first page when filter or search criteria change
    filteredEvents() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEvents.slice(start, end);
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
      this.$router.push(`/events/${eventId}`); // Jump to event details page
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

</style>

<style scoped>
.event-page {
  margin: 20px;
}

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

/* Trending Events style */
.trending-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

/* All Events style */
.event-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

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
