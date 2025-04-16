<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { eventsMockData } from '@/mock/eventsMockUser.js'

const router = useRouter()
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('date')
const sortOrder = ref('desc')

// Mock data for events
const eventsData = ref([...eventsMockData])

// Computed property for filtered and sorted events
const filteredEvents = computed(() => {
  return eventsData.value
    .filter(event => {
      // Apply status filter
      if (statusFilter.value !== 'all' && event.status !== statusFilter.value) {
        return false
      }

      // Apply search filter (case insensitive)
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        return (
          event.name.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      let comparison = 0

      if (sortBy.value === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy.value === 'date') {
        comparison = new Date(a.date) - new Date(b.date)
      } else if (sortBy.value === 'tickets') {
        comparison = a.ticketsSold - b.ticketsSold
      } else if (sortBy.value === 'revenue') {
        comparison = parseFloat(a.revenue.replace('$', '').replace(',', '')) -
                     parseFloat(b.revenue.replace('$', '').replace(',', ''))
      }

      // Apply sort order
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
})

// Methods
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// Navigation methods
const viewEventDetails = (eventId) => {
  router.push(`/admin/events/${eventId}`)
}

const createNewEvent = () => {
  router.push('/admin/events/create')
}

const editEvent = (eventId) => {
  router.push(`/admin/events/edit/${eventId}`)
}

// Delete event (mock data only) (will use API in real app)
const deleteEvent = (eventId) => {
  if (confirm('Are you sure you want to delete this event?')) {
    eventsData.value = eventsData.value.filter(event => event.id !== eventId)
  }

  // Call API to delete event
}

// Fomat date to 'MMM DD, YYYY'
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Color classes for event status (Bootstrap-like)
const getStatusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-success text-white'
    case 'Upcoming':
      return 'bg-info text-white'
    case 'Completed':
      return 'bg-secondary text-white'
    case 'Cancelled':
      return 'bg-danger text-white'
    default:
      return 'bg-secondary text-white'
  }
}
</script>

<template>
    <div class="container">
      <div class="mb-4">
        <h1 class="h3 text-gray-800">Event Management</h1>
        <p class="text-gray-600 mt-1">Create, edit and manage your events</p>
      </div>

      <div class="bg-white rounded shadow-sm p-3 mb-4">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
          <div class="d-flex flex-column flex-sm-row gap-3">
            <div class="position-relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search events"
                class="form-control ps-2"
              />
            </div>

            <select
              v-model="statusFilter"
              class="form-select"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button
            @click="createNewEvent"
            class="btn btn-primary d-flex align-items-center justify-content-center gap-2 transition-colors"
          >
            <i class="bi bi-plus-lg"></i>
            Create New Event
          </button>
        </div>
      </div>


          <!-- <table class="table table-striped table-hover table-responsive">
            <thead>
              <tr class="bg-light border-bottom">
                <th class="py-3 text-start">
                  <div class="d-flex align-items-center cursor-pointer" @click="sortBy = 'name'; toggleSortOrder()">
                    Event Name
                    <i
                      v-if="sortBy === 'name'"
                      :class="sortOrder === 'asc' ? 'bi bi-sort-up-alt ms-1' : 'bi bi-sort-down-alt ms-1'"
                    ></i>
                  </div>
                </th>
                <th class="py-3 text-start">
                  <div class="d-flex align-items-center cursor-pointer" @click="sortBy = 'date'; toggleSortOrder()">
                    Date
                    <i
                      v-if="sortBy === 'date'"
                      :class="sortOrder === 'asc' ? 'bi bi-sort-up-alt ms-1' : 'bi bi-sort-down-alt ms-1'"
                    ></i>
                  </div>
                </th>
                <th class="py-3 text-start">Location</th>
                <th class="py-3 text-start">Status</th>
                <th class="py-3 text-start">
                  <div class="d-flex align-items-center cursor-pointer" @click="sortBy = 'tickets'; toggleSortOrder()">
                    Tickets Sold
                    <i
                      v-if="sortBy === 'tickets'"
                      :class="sortOrder === 'asc' ? 'bi bi-sort-up-alt ms-1' : 'bi bi-sort-down-alt ms-1'"
                    ></i>
                  </div>
                </th>
                <th class="py-3 text-start">
                  <div class="d-flex align-items-center cursor-pointer" @click="sortBy = 'revenue'; toggleSortOrder()">
                    Revenue
                    <i
                      v-if="sortBy === 'revenue'"
                      :class="sortOrder === 'asc' ? 'bi bi-sort-up-alt ms-1' : 'bi bi-sort-down-alt ms-1'"
                    ></i>
                  </div>
                </th>
                <th class="py-3 text-center">Actions</th>
              </tr>
            </thead> -->


          <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="mt-2 mb-2 rounded bg-white p-3  eventCard"
          :style="{ 'animation-delay': `${index * 0.1}s` }"
          :class="{ 
            'fadeInLeft-animation': true,
          }"
          @animationend="$event.target.classList.add('animated')"
          >
            <div class="row">
              <div class="col-xl-3 col-sm-6">
                <div class="fw-semibold text-gray-800">{{ event.name }}</div>
                <div class="text-sm text-gray-500">{{ event.organizer }}</div>
              </div>
              <div class="col-xl-2 col-sm-6">
                <div class="text-gray-800">{{ formatDate(event.date) }}</div>
                <div class="text-sm text-gray-500">{{ event.time }}</div>
              </div>
              <div class="col-xl-3 col-sm-6 col-xs-12">
                <div class="py-2 text-gray-800">{{ event.location }}</div>
              </div>
              <div class="col-xl-1 col-sm-3 col-xs-6"> 
                <span
                  :class="getStatusClass(event.status)"
                  class="badge rounded-pill"
                >
                  {{ event.status }}
                </span>
              </div>
              <div class="col-xl-1 col-sm-3 col-xs-6">
                <span class="py-2 fw-semibold text-gray-800">{{ event.revenue }}</span>
              </div>
              <div class="col">
                <div class="py-2 text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button
                      @click="viewEventDetails(event.id)"
                      class="btn btn-sm btn-outline-primary"
                      title="View Details"
                    >
                      <i class="pi pi-eye"></i>
                    </button>
                    <button
                      @click="editEvent(event.id)"
                      class="btn btn-sm btn-outline-success"
                      title="Edit Event"
                    >
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button
                      @click="deleteEvent(event.id)"
                      class="btn btn-sm btn-outline-danger"
                      title="Delete Event"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

        <div class="px-3 py-2 d-flex align-items-center justify-content-between border-top">
          <div class="text-sm text-gray-500">
            Showing
            <span class="fw-semibold">{{ filteredEvents.length }}</span>
            of
            <span class="fw-semibold">{{ eventsData.length }}</span>
            events
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary disabled">
              Previous
            </button>
            <button class="btn btn-sm btn-outline-secondary active">1</button>
            <button class="btn btn-sm btn-outline-secondary disabled">
              Next
            </button>
          </div>

      </div>
    </div>
</template>

<style scoped>
.eventCard {
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  transform: translateX(-50px);
}

.eventCard:hover {
  transform: scale(1.02) translateX(0) !important;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  opacity: 1; 
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: none; /* Change this to 'none' instead of translateX(0) */
  }
}

.eventCard.fadeInLeft-animation {
  animation: 0.75s fadeInLeft forwards;
}
</style>