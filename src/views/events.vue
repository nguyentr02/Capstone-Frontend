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
              v-model="searchText"
            />
          </div>
          <div class="col-4"></div>
        </div>

        <!-- Sorting and Filter Controls -->
        <div class="d-flex justify-content-center my-3">
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
                <a class="dropdown-item" href="#" @click.prevent="sortOption = 'time'">
                  Sort by Start Time
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="sortOption = 'name'">
                  Sort by Name
                </a>
              </li>
            </ul>
          </div>
          <button class="btn btn-secondary" @click="showFilter = true">
            Select Event Filter
          </button>
        </div>

        <h4 class="fw-bold pt-5 ms-5 font-custom">Events</h4>

        <div v-if="loading" class="text-center mt-5">Data loading...</div>
        <div v-else-if="error" class="text-center mt-5 text-danger">
          Data loading failed, please try again later!
        </div>
        <div v-else class="row justify-content-center">
          <div
            class="card col-4 m-3 card-fixed-width"
            v-for="event in sortedEvents"
            :key="event.id"
          >
            <router-link :to="{ name: 'EventDetail', params: { id: event.id } }">
              <img
                :src="event.banner || defaultBanner"
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
              <p class="card-text">Start: {{ formatDate(event.startDateTime) }}</p>
              <p class="card-text">Location: {{ event.location }}</p>
              <p class="card-text">
                Price:
                <!-- Display the first ticket price if the ticket data exists, otherwise judge it according to isFree. -->
                {{ event.tickets && event.tickets.length > 0 ? '$' + event.tickets[0].price : (event.isFree ? 'Free' : 'N/A') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter popup component -->
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
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/store/user";

const events = ref([]);
const loading = ref(true);
const error = ref(null);
const searchText = ref("");

// Current sorting option: "time" or "name".
const sortOption = ref("time");
const sortOptionLabel = computed(() =>
  sortOption.value === "time" ? "Start Time" : "Name"
);

// Filter conditions (this example only demonstrates eventType filtering, which can be expanded upon)
const filterCriteria = ref({
  selectedActivity: "",
  minPrice: 0,
  maxPrice: Infinity
});

const defaultBanner = "https://via.placeholder.com/288x180?text=Event+Banner";
const userStore = useUserStore();

// Asynchronously fetch the activity list data with token 
onMounted(async () => {
  try {
    const token = userStore.accessToken || localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:3000/api/events", {
      headers: token
        ? {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        : { "Content-Type": "application/json" }
    });
    if (!res.ok) {
      throw new Error(`Request failed with status code：${res.status}`);
    }
    const json = await res.json();
    // { success: true, data: { events: [...], pagination: { ... } } }
    events.value = json.data.events;
    console.log("Get Active List Success, Filter Criteria：", {
      search: searchText.value,
      ...filterCriteria.value
    });
  } catch (err) {
    console.error("Error getting list of events：", err);
    error.value = err.message || "make a mistake";
  } finally {
    loading.value = false;
  }
});

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
      match = match && event.eventType === filterCriteria.value.selectedActivity;
    }
    return match;
  });
});

const sortedEvents = computed(() => {
  return [...filteredEvents.value].sort((a, b) => {
    if (sortOption.value === "time") {
      return new Date(a.startDateTime) - new Date(b.startDateTime);
    } else if (sortOption.value === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
});

const showFilter = ref(false);
const closeFilter = () => (showFilter.value = false);

// Processing filter condition applications
const handleApplyFilter = (criteria) => {
  filterCriteria.value = {
    selectedActivity: criteria.selectedActivity || "",
    minPrice: criteria.minPrice || 0,
    maxPrice: criteria.maxPrice || Infinity
  };
  closeFilter();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString();
};
</script>

<style scoped>
.bg-custom {
  background-color: #edece8;
}
.font-custom {
  font-family: 'Font';
}
.pl-custom {
  padding-left: 2%;
}
.card-fixed-width {
  width: 18rem;
}
</style>
