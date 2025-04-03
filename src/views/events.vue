<template>
  <div>
    <navbar />
    <div class="bg-custom">
      <div class="container mt-3">
        <h4 class="fw-bold pt-5 ms-5 font-custom">
          Looking for your upcoming perfect event
        </h4>
        <div class="input-group row ps-5 mt-4">
          <div class="col-4 pl-custom">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="addon-wrapping"
              v-model="searchText"
            />
          </div>
          <div class="col-4"></div>
        </div>

        <!-- Sorting and Filter Controls -->
        <div class="d-flex justify-content-center my-3">
          <!-- Dropdown for sorting options -->
          <div class="dropdown me-3">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by: {{ sortOptionLabel }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="sortDropdown">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="sortOption = 'time'"
                  >Sort by Start Time</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="sortOption = 'name'"
                  >Sort by Name</a
                >
              </li>
            </ul>
          </div>
          <!-- Filter Button -->
          <button class="btn btn-secondary" @click="showFilter = true">
            Select Event Filter
          </button>
        </div>

        <h4 class="fw-bold pt-5 ms-5 font-custom">Events</h4>
        <div class="row justify-content-center">
          <div
            class="card col-4 m-3 card-fixed-width"
            v-for="event in sortedEvents"
            :key="event.id"
          >
            <!-- Use router-link instead of a tag -->
            <router-link :to="{ name: 'EventDetail', params: { id: event.id } }">
              <img
                src="https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp"
                class="card-img-top"
                alt="img"
              />
            </router-link>
            <div class="card-body">
              <router-link
                :to="{ name: 'EventDetail', params: { id: event.id } }"
                class="link-warning"
              >
                <h5 class="card-title">{{ event.name }}</h5>
              </router-link>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">Start: {{ event.startTime }}</p>
              <p class="card-text">Activity: {{ event.activity }}</p>
              <p class="card-text">Price: ${{ event.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Include the filter popup component -->
      <FilterPopup
        :showFilter="showFilter"
        @closeFilter="closeFilter"
        @applyFilter="handleApplyFilter"
      />
    </div>
  </div>
</template>

<script setup>
import navbar from "@/components/navbar.vue";
import FilterPopup from "@/components/FilterPopup.vue";
import { ref, computed } from "vue";

// Simulated event data
const events = ref([
  {
    id: 5,
    name: "Event 1",
    description: "Description of Event 1",
    activity: "Sport",
    price: 120,
    startTime: "2025-05-10T09:00",
  },
  {
    id: 6,
    name: "Event 2",
    description: "Description of Event 2",
    activity: "Music",
    price: 90,
    startTime: "2025-05-08T14:00",
  },
  {
    id: 7,
    name: "Event 3",
    description: "Description of Event 3",
    activity: "Art",
    price: 130,
    startTime: "2025-05-12T11:00",
  },
  {
    id: 8,
    name: "Event 4",
    description: "Description of Event 4",
    activity: "Food",
    price: 60,
    startTime: "2025-05-09T10:00",
  },
  {
    id: 9,
    name: "Event 5",
    description: "Description of Event 5",
    activity: "Sport",
    price: 150,
    startTime: "2025-05-11T16:00",
  },
  {
    id: 10,
    name: "Event 6",
    description: "Description of Event 6",
    activity: "Music",
    price: 200,
    startTime: "2025-05-07T13:00",
  },
  {
    id: 11,
    name: "Event 7",
    description: "Description of Event 7",
    activity: "Art",
    price: 80,
    startTime: "2025-05-13T15:00",
  },
  {
    id: 12,
    name: "Event 8",
    description: "Description of Event 8",
    activity: "Food",
    price: 100,
    startTime: "2025-05-06T08:30",
  },
  {
    id: 13,
    name: "Event 9",
    description: "Description of Event 9",
    activity: "Sport",
    price: 120,
    startTime: "2025-05-14T10:30",
  },
  {
    id: 14,
    name: "Event 10",
    description: "Description of Event 10",
    activity: "Music",
    price: 180,
    startTime: "2025-05-05T17:00",
  },
  {
    id: 15,
    name: "Event 11",
    description: "Description of Event 11",
    activity: "Art",
    price: 250,
    startTime: "2025-05-15T09:30",
  },
  {
    id: 16,
    name: "Event 12",
    description: "Description of Event 12",
    activity: "Food",
    price: 30,
    startTime: "2025-05-04T12:00",
  },
]);

// Text for the search box
const searchText = ref("");

// Current sorting option: "time" or "name"
const sortOption = ref("time");

// Compute display label based on the sorting option
const sortOptionLabel = computed(() => {
  return sortOption.value === "time" ? "Start Time" : "Name";
});

// Filter criteria
const filterCriteria = ref({
  selectedActivity: "",
  minPrice: 0,
  maxPrice: Infinity,
});

// Filter events based on search text and filter criteria
const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    let match = true;
    if (searchText.value.trim() !== "") {
      match =
        match &&
        event.name
          .toLowerCase()
          .includes(searchText.value.trim().toLowerCase());
    }
    if (filterCriteria.value.selectedActivity) {
      match =
        match && event.activity === filterCriteria.value.selectedActivity;
    }
    match =
      match &&
      event.price >= filterCriteria.value.minPrice &&
      event.price <= filterCriteria.value.maxPrice;
    return match;
  });
});

// Sort filtered events based on the sorting option
const sortedEvents = computed(() => {
  return [...filteredEvents.value].sort((a, b) => {
    if (sortOption.value === "time") {
      return new Date(a.startTime) - new Date(b.startTime);
    } else if (sortOption.value === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
});

// Control filter popup display
const showFilter = ref(false);
const closeFilter = () => {
  showFilter.value = false;
};

// Update filter criteria after applying filter
const handleApplyFilter = (criteria) => {
  filterCriteria.value = {
    selectedActivity: criteria.selectedActivity || "",
    minPrice: criteria.minPrice || 0,
    maxPrice: criteria.maxPrice || Infinity,
  };
  closeFilter();
};
</script>

<style scoped>
/* Custom background color */
.bg-custom {
  background-color: #edece8;
}

/* Custom font */
.font-custom {
  font-family: 'Font';
}

/* Custom left padding */
.pl-custom {
  padding-left: 2%;
}

/* Card fixed width */
.card-fixed-width {
  width: 18rem;
}
</style>
