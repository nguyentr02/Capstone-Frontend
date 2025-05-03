<template>
  <AdminLayout>
    <div class="p-4">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">Event Management</h1>
        <p class="text-muted mt-1">Create, edit and manage your events</p>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="alert alert-info">Loading events...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-else>
        <!-- Action Bar -->
        <div class="bg-white rounded shadow-sm p-4 mb-4">
          <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
            <div class="d-flex flex-column flex-sm-row gap-3">
              <div class="position-relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search events..."
                  class="form-control"
                  style="padding-left:2.5rem; max-width:16rem;"
                />
                <i class="pi pi-search position-absolute text-muted" style="left:1rem; top:0.75rem;"></i>
              </div>
              <select v-model="statusFilter" class="form-select" style="max-width:16rem;">
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button @click="createNewEvent" class="btn btn-primary d-flex align-items-center">
              <i class="pi pi-plus me-2"></i>Create New Event
            </button>
          </div>
        </div>

        <!-- Events Table -->
        <div class="bg-white rounded shadow-sm overflow-hidden">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr class="bg-light border-bottom">
                  <th @click="sortBy='name'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor:pointer;">
                    Event Name
                    <i v-if="sortBy==='name'" :class="sortOrder==='asc'? 'pi pi-sort-up ms-1':'pi pi-sort-down ms-1'"></i>
                  </th>
                  <th @click="sortBy='date'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor:pointer;">
                    Date / Time
                    <i v-if="sortBy==='date'" :class="sortOrder==='asc'? 'pi pi-sort-up ms-1':'pi pi-sort-down ms-1'"></i>
                  </th>
                  <th class="px-3 py-2 text-start fs-6 text-muted">Location</th>
                  <th class="px-3 py-2 text-start fs-6 text-muted">Free?</th>
                  <th class="px-3 py-2 text-start fs-6 text-muted">Type</th>
                  <th class="px-3 py-2 text-start fs-6 text-muted">Status</th>
                  <th @click="sortBy='tickets'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor:pointer;">
                    Tickets Sold
                    <i v-if="sortBy==='tickets'" :class="sortOrder==='asc'? 'pi pi-sort-up ms-1':'pi pi-sort-down ms-1'"></i>
                  </th>
                  <th @click="sortBy='revenue'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor:pointer;">
                    Revenue
                    <i v-if="sortBy==='revenue'" :class="sortOrder==='asc'? 'pi pi-sort-up ms-1':'pi pi-sort-down ms-1'"></i>
                  </th>
                  <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="evt in filteredEvents" :key="evt.id" class="border-bottom">
                  <td class="px-3 py-2">
                    <div class="fw-medium text-dark">{{ evt.name }}</div>
                    <div class="fs-6 text-muted">{{ evt.organizer.firstName }} {{ evt.organizer.lastName }}</div>
                  </td>
                  <td class="px-3 py-2">
                    <div class="text-dark">{{ formatDate(evt.startDateTime) }}</div>
                    <div class="fs-6 text-muted">{{ formatTimeRange(evt.startDateTime, evt.endDateTime) }}</div>
                  </td>
                  <td class="px-3 py-2 text-dark">{{ evt.location }}</td>
                  <td class="px-3 py-2 text-dark">{{ evt.isFree ? 'Yes' : 'No' }}</td>
                  <td class="px-3 py-2 text-dark">{{ evt.eventType }}</td>
                  <td class="px-3 py-2">
                    <span :class="getStatusClass(evt.status)" class="px-2 py-1 rounded-pill small fw-medium">
                      {{ evt.status }}
                    </span>
                  </td>
                  <td class="px-3 py-2 text-dark">
                    {{ evt._count.registrations }} / {{ evt.capacity }}
                    <div class="progress" style="height:0.25rem; margin-top:0.25rem;">
                      <div class="progress-bar bg-primary" role="progressbar"
                        :style="{ width: (evt._count.registrations / evt.capacity) * 100 + '%' }"></div>
                    </div>
                  </td>
                  <td class="px-3 py-2 text-dark">{{ calculateRevenue(evt.tickets) }}</td>
                  <td class="px-3 py-2">
                    <div class="d-flex justify-content-center gap-2">
                      <button @click="viewEventDetails(evt.id)" class="btn btn-link text-primary p-0" title="View">
                        <i class="pi pi-eye"></i>
                      </button>
                      <button @click="editEvent(evt.id)" class="btn btn-link text-success p-0" title="Edit">
                        <i class="pi pi-pencil"></i>
                      </button>
                      <button @click="deleteEvent(evt.id)" class="btn btn-link text-danger p-0" title="Delete">
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredEvents.length === 0 && !loading">
                  <td colspan="9" class="px-3 py-4 text-center text-muted">
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
          <!-- Simplified paging -->
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
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { fetchEventsData, deleteEvent as apiDeleteEvent } from '@/api/events.js'

const router = useRouter()
const searchQuery  = ref('')
const statusFilter = ref('all')
const sortBy        = ref('date')
const sortOrder     = ref('desc')
const eventsData    = ref([])
const loading       = ref(false)
const error         = ref(null)

// Pull list on mount
onMounted(async () => {
  loading.value = true
  try {
    eventsData.value = await fetchEventsData()
  } catch (err) {
    error.value = 'Failed to load events data. Please try again later.'
    console.error("Failed to fetch events data:", err)
  } finally {
    loading.value = false
  }
})

// Filter and sort events
const filteredEvents = computed(() => {
  return eventsData.value
    .filter(evt => {
      if (statusFilter.value !== 'all' && evt.status !== statusFilter.value) {
        return false
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        return (
          evt.name.toLowerCase().includes(q) ||
          evt.location.toLowerCase().includes(q) ||
          `${evt.organizer.firstName} ${evt.organizer.lastName}`.toLowerCase().includes(q)
        )
      }
      return true
    })
    .sort((a, b) => {
      let cmp = 0
      if (sortBy.value === 'name') {
        cmp = a.name.localeCompare(b.name)
      } else if (sortBy.value === 'date') {
        cmp = new Date(a.startDateTime) - new Date(b.startDateTime)
      } else if (sortBy.value === 'tickets') {
        cmp = a._count.registrations - b._count.registrations
      } else if (sortBy.value === 'revenue') {
        cmp = calculateRevenue(a.tickets) - calculateRevenue(b.tickets)
      }
      return sortOrder.value === 'asc' ? cmp : -cmp
    })
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const viewEventDetails = id => router.push(`/admin/events/${id}`)
const createNewEvent  = () => router.push('/admin/events/create')
const editEvent       = id => router.push(`/admin/events/edit/${id}`)

// Call the backend to delete and update the local
const deleteEvent = async (id) => {
  if (!confirm('Are you sure you want to delete this event?')) return
  try {
    await apiDeleteEvent(id)
    eventsData.value = eventsData.value.filter(evt => evt.id !== id)
    alert('Event deleted successfully.')
  } catch (err) {
    console.error('Failed to delete event:', err)
    alert('Failed to delete event. Please try again.')
  }
}

// Assisted Formatting
const formatDate = dateStr =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

const formatTimeRange = (start, end) => {
  const fmt = date => new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return `${fmt(start)} - ${fmt(end)}`
}

const calculateRevenue = tickets =>
  tickets.reduce((sum, t) => sum + t.quantitySold * parseFloat(t.price), 0).toFixed(2)

const getStatusClass = status => {
  switch (status) {
    case 'Active':    return 'bg-light text-success'
    case 'Upcoming':  return 'bg-light text-primary'
    case 'Completed': return 'bg-light text-dark'
    case 'Cancelled': return 'bg-light text-danger'
    default:          return 'bg-light text-dark'
  }
}
</script>

<style scoped>
/* If there are customised styles, they can be added here */
</style>
