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

        <div class="container-fluid mb-3">
          <div class = "d-flex ">
            <div class = "">
              <span class="fw-bold ms-lg-5 font-custom" style = "font-size: 30px">Events</span>
            </div>
            <div class = "">
              <span></span>
            </div>
            <div class = "ms-auto">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  style=""
                  :class="{ active: viewMode === 'grid' }"
                  @click="setViewMode('grid')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-grid"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
                    ></path>
                  </svg>
                  <span class="visually-hidden">Button</span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  :class="{ active: viewMode === 'list' }"
                  @click="setViewMode('list')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-list-task"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
                    ></path>
                    <path
                      d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
                    ></path>
                  </svg>
                  <span class="visually-hidden">Button</span>
                </button>
              </div>
            </div>
          </div>
        
        </div>

        <div class="row justify-content-center">
          <div
            class="card col-4 m-3 card-fixed-width"
            v-for="event in sortedEvents"
            :key="event.id"
            v-if="viewMode === 'grid'"
          >
            <!-- Use router-link instead of a tag -->
            <router-link
              :to="{ name: 'EventDetail', params: { id: event.id } }"
            >
              <img :src="event.banner" class="card-img-top" alt="img" />
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

          <table class="table" v-if="viewMode === 'list'">
            <!-- Use router-link instead of a tag -->
            <thead>
              <tr>
                <th scope="col">Event name</th>
                <th scope="col">Description</th>
                <th scope="col">Activity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="event in sortedEvents"
                :key="event.id"
                style="cursor: pointer"
                @click="navigateToDetails(event.id)"
              >
                <th scope="row">{{ event.name }}</th>
                <td>{{ event.description }}</td>
                <td>{{ event.activity }}</td>
                <td>{{ event.price }}</td>
              </tr>
            </tbody>
          </table>
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
import { useRouter } from 'vue-router';
import { ref, computed } from "vue";

const viewMode = ref("grid");
const router = useRouter();

function setViewMode(mode) {
  viewMode.value = mode;
  console.log(viewMode.value);
}

function navigateToDetails(itemId) {
  router.push({ name: "EventDetail", params: { id: itemId } });
}

// Event data
const events = ref([
  {
    id: 5,
    name: "Event 1",
    description: "Description of Event 1",
    activity: "Sport",
    price: 120,
    startTime: "2025-05-10T09:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 6,
    name: "Event 2",
    description: "Description of Event 2",
    activity: "Music",
    price: 90,
    startTime: "2025-05-08T14:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 7,
    name: "Event 3",
    description: "Description of Event 3",
    activity: "Art",
    price: 130,
    startTime: "2025-05-12T11:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 8,
    name: "Event 4",
    description: "Description of Event 4",
    activity: "Food",
    price: 60,
    startTime: "2025-05-09T10:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 9,
    name: "Event 5",
    description: "Description of Event 5",
    activity: "Sport",
    price: 150,
    startTime: "2025-05-11T16:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 10,
    name: "Event 6",
    description: "Description of Event 6",
    activity: "Music",
    price: 200,
    startTime: "2025-05-07T13:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 11,
    name: "Event 7",
    description: "Description of Event 7",
    activity: "Art",
    price: 80,
    startTime: "2025-05-13T15:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 12,
    name: "Event 8",
    description: "Description of Event 8",
    activity: "Food",
    price: 100,
    startTime: "2025-05-06T08:30",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 13,
    name: "Event 9",
    description: "Description of Event 9",
    activity: "Sport",
    price: 120,
    startTime: "2025-05-14T10:30",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 14,
    name: "Event 10",
    description: "Description of Event 10",
    activity: "Music",
    price: 180,
    startTime: "2025-05-05T17:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 15,
    name: "Event 11",
    description: "Description of Event 11",
    activity: "Art",
    price: 250,
    startTime: "2025-05-15T09:30",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 16,
    name: "Event 12",
    description: "Description of Event 12",
    activity: "Food",
    price: 30,
    startTime: "2025-05-04T12:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },

  {
    id: 17,
    name: "Event 13",
    description: "An exciting event featuring local sports and fun activities.",
    activity: "Sport",
    price: 110,
    startTime: "2025-05-16T08:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 18,
    name: "Event 14",
    description: "A vibrant music festival with live performances.",
    activity: "Music",
    price: 140,
    startTime: "2025-05-17T19:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 19,
    name: "Event 15",
    description: "An immersive art exhibition showcasing contemporary works.",
    activity: "Art",
    price: 95,
    startTime: "2025-05-18T11:30",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 20,
    name: "Event 16",
    description: "A delightful food festival with international cuisines.",
    activity: "Food",
    price: 85,
    startTime: "2025-05-19T12:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 21,
    name: "Event 17",
    description: "Join us for a fun run and community gathering.",
    activity: "Sport",
    price: 75,
    startTime: "2025-05-20T07:30",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 22,
    name: "Event 18",
    description: "A grand musical evening featuring renowned artists.",
    activity: "Music",
    price: 220,
    startTime: "2025-05-21T20:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 23,
    name: "Event 19",
    description:
      "An art fair showcasing local talents and creative exhibitions.",
    activity: "Art",
    price: 130,
    startTime: "2025-05-22T14:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
  },
  {
    id: 24,
    name: "Event 20",
    description: "A food truck rally with diverse culinary delights.",
    activity: "Food",
    price: 50,
    startTime: "2025-05-23T11:00",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
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
      match = match && event.activity === filterCriteria.value.selectedActivity;
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
  font-family: "Font";
}

/* Custom left padding */
.pl-custom {
  padding-left: 2%;
}

/* Card fixed width */
.card-fixed-width {
  width: 18rem;
}

.btn.active {
  background-color: #007bff;
  color: white;
}
</style>
