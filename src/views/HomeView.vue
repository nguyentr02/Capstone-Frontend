<template>
  <div>
    <!-- Search and filter bar -->
    <div class="search-filter-bar">
      <input 
        type="text" 
        class="search-input" 
        placeholder="Search events..." 
        v-model="searchQuery" 
      />
      <button class="filter-button" @click="toggleFilter">Filter</button>
    </div>

    <!-- Activity Showcase Section -->
    <div class="events-section" v-if="!showFilter">
      <h2>Trending Events</h2>
      <div class="event-cards">
        <div class="event-card" v-for="n in 4" :key="n"></div>
      </div>

      <h2>All Events</h2>
      <div class="event-cards">
        <div class="event-card" v-for="n in 12" :key="n"></div>
      </div>
    </div>

    <!-- Filter pop-up box -->
    <FilterPopup :showFilter="showFilter" @closeFilter="toggleFilter" />
  </div>
</template>

<script>
import FilterPopup from "@/views/FilterPopup.vue";

export default {
  components: { FilterPopup },
  data() {
    return {
      showFilter: false,
      searchQuery: "",
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
  },
};
</script>

<style scoped>

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

.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
}

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

.events-section {
  margin: 20px;
}

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
