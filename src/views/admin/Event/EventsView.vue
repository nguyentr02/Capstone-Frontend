<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { eventsMockData } from '@/mock/eventsMock.js'

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
        comparison =
          parseFloat(a.revenue.replace('$', '').replace(',', '')) -
          parseFloat(b.revenue.replace('$', '').replace(',', ''))
      }
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const viewEventDetails = (eventId) => {
  router.push(`/admin/events/${eventId}`)
}

const createNewEvent = () => {
  router.push('/admin/events/create')
}

const editEvent = (eventId) => {
  router.push(`/admin/events/edit/${eventId}`)
}

const deleteEvent = (eventId) => {
  if (confirm('Are you sure you want to delete this event?')) {
    eventsData.value = eventsData.value.filter(event => event.id !== eventId)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Convert event status to Bootstrap classes
const getStatusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-light text-success'
    case 'Upcoming':
      return 'bg-light text-primary'
    case 'Completed':
      return 'bg-light text-dark'
    case 'Cancelled':
      return 'bg-light text-danger'
    default:
      return 'bg-light text-dark'
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">Event Management</h1>
        <p class="text-muted mt-1">Create, edit and manage your events</p>
      </div>
      
      <!-- Action Bar -->
      <div class="bg-white rounded shadow-sm p-4 mb-4">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
          <!-- Filters and Search -->
          <div class="d-flex flex-column flex-sm-row gap-3">
            <!-- Search Bar -->
            <div class="position-relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search events..." 
                class="form-control"
                style="padding-left: 2.5rem; max-width: 16rem;"
              />
              <i class="pi pi-search position-absolute text-muted" style="left: 1rem; top: 0.75rem;"></i>
            </div>
            <!-- Status Filter -->
            <select v-model="statusFilter" class="form-select" style="max-width: 16rem;">
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <!-- Create Button -->
          <button @click="createNewEvent" class="btn btn-primary d-flex align-items-center">
            <i class="pi pi-plus me-2"></i>
            Create New Event
          </button>
        </div>
      </div>
      
      <!-- Events Table -->
      <div class="bg-white rounded shadow-sm overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr class="bg-light border-bottom">
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'name'; toggleSortOrder()">
                    Event Name
                    <i v-if="sortBy === 'name'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'date'; toggleSortOrder()">
                    Date
                    <i v-if="sortBy === 'date'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Location</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Status</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'tickets'; toggleSortOrder()">
                    Tickets Sold
                    <i v-if="sortBy === 'tickets'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'revenue'; toggleSortOrder()">
                    Revenue
                    <i v-if="sortBy === 'revenue'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in filteredEvents" :key="event.id" class="border-bottom">
                <td class="px-3 py-2">
                  <div class="fw-medium text-dark">{{ event.name }}</div>
                  <div class="fs-6 text-muted">{{ event.organizer }}</div>
                </td>
                <td class="px-3 py-2">
                  <div class="text-dark">{{ formatDate(event.date) }}</div>
                  <div class="fs-6 text-muted">{{ event.time }}</div>
                </td>
                <td class="px-3 py-2 text-dark">{{ event.location }}</td>
                <td class="px-3 py-2">
                  <span :class="getStatusClass(event.status)" class="px-2 py-1 rounded-pill small fw-medium">
                    {{ event.status }}
                  </span>
                </td>
                <td class="px-3 py-2 text-dark">
                  {{ event.ticketsSold }} / {{ event.capacity }}
                  <div class="progress" style="height: 0.25rem; margin-top: 0.25rem;">
                    <div class="progress-bar bg-primary" role="progressbar" :style="{ width: (event.ticketsSold / event.capacity) * 100 + '%' }"></div>
                  </div>
                </td>
                <td class="px-3 py-2 text-dark">{{ event.revenue }}</td>
                <td class="px-3 py-2">
                  <div class="d-flex justify-content-center gap-2">
                    <button @click="viewEventDetails(event.id)" class="btn btn-link text-primary p-0" title="View Details">
                      <i class="pi pi-eye"></i>
                    </button>
                    <button @click="editEvent(event.id)" class="btn btn-link text-success p-0" title="Edit Event">
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button @click="deleteEvent(event.id)" class="btn btn-link text-danger p-0" title="Delete Event">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <!-- Empty state -->
              <tr v-if="filteredEvents.length === 0">
                <td colspan="7" class="px-3 py-4 text-center text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="pi pi-calendar-times fs-1 mb-2"></i>
                    <p class="fw-medium">No events found</p>
                    <p class="fs-6 mt-1">Try adjusting your filters or create a new event</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination (simplified) -->
        <div class="px-3 py-2 d-flex align-items-center justify-content-between border-top">
          <div class="fs-6 text-muted">
            Showing <span class="fw-medium">{{ filteredEvents.length }}</span> of <span class="fw-medium">{{ eventsData.length }}</span> events
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm" disabled>Previous</button>
            <button class="btn btn-outline-secondary btn-sm bg-light">1</button>
            <button class="btn btn-outline-secondary btn-sm" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
