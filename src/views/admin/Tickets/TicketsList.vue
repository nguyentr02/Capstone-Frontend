<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { fetchEvents } from '@/api/aevents.js'
import { fetchTicketTypes } from '@/api/atickets.js'

const router = useRouter()

// Set browser tab title
onMounted(() => {
  document.title = 'Ticket Management - Admin'
})

/*—— Loading, search, filter, sort states ——*/
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('date')
const sortOrder = ref('desc')

/*—— Data stores ——*/
const eventsData = ref([])
const ticketsData = ref([])

/*—— Fetch events and ticket types from backend ——*/
onMounted(async () => {
  try {
    // Pull events
    const { events } = await fetchEvents({})
    eventsData.value = events

    // Pull all ticket types
    const allTickets = []
    await Promise.all(
      events.map(async (event) => {
        try {
          const result = await fetchTicketTypes(event.id)
          if (Array.isArray(result)) {
            allTickets.push(...result)
          }
        } catch (err) {
          console.error(`Failed to load tickets for event ${event.id}:`, err)
        }
      })
    )
    ticketsData.value = allTickets
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})

/*—— Compute filtered and sorted events ——*/
const filteredEvents = computed(() => {
  return eventsData.value
    .filter(event => {
      if (statusFilter.value !== 'all' && event.status !== statusFilter.value) {
        return false
      }
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        const organizerName = `${event.organizer.firstName} ${event.organizer.lastName}`.toLowerCase()
        return (
          event.name.toLowerCase().includes(q) ||
          event.location.toLowerCase().includes(q) ||
          organizerName.includes(q)
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
        cmp = getTicketsSold(a.id) - getTicketsSold(b.id)
      }
      return sortOrder.value === 'asc' ? cmp : -cmp
    })
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

/*—— Get all tickets of an event ——*/
const getTicketsByEventId = (eventId) => {
  return ticketsData.value.filter(ticket => ticket.eventId === eventId)
}

/*—— Calculate the number of tickets sold ——*/
const getTicketsSold = (eventId) => {
  return getTicketsByEventId(eventId)
    .reduce((sum, ticket) => sum + (Number(ticket.quantitySold) || 0), 0)
}

/*—— Format date/time ——*/
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}
const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-AU', {
    hour: '2-digit', minute: '2-digit'
  })
}

/*—— Navigate to ticket management details ——*/
const manageTickets = (eventId) => {
  router.push(`/admin/tickets/${eventId}`)
}
</script>

<template>
  <AdminLayout page-title="Ticket Management" active-menu="tickets">
    <div class="p-4">
      <!-- Header -->
      <div class="mb-4 d-flex align-items-center gap-2">
        <i class="pi pi-ticket text-primary fs-2"></i>
        <h1 class="fs-2 fw-bold text-dark mb-0">Ticket Management</h1>
      </div>
      <p class="text-muted mb-4">Manage and monitor tickets for your events</p>

      <!-- Search & filter -->
      <div class="bg-white rounded shadow-sm p-4 mb-4">
        <div class="d-flex flex-column flex-sm-row gap-3">
          <div class="position-relative" style="max-width: 16rem;">
            <input v-model="searchQuery" type="text" placeholder="Search events..." class="form-control" style="padding-left: 2.5rem;" />
            <i class="pi pi-search position-absolute text-muted" style="left: 1rem; top: 0.75rem;"></i>
          </div>
          <select v-model="statusFilter" class="form-select" style="max-width: 16rem;">
            <option value="all">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Table -->
      <div v-else class="bg-white rounded shadow-sm overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr class="bg-light border-bottom">
                <th @click="sortBy='name'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor: pointer;">
                  Event Name
                  <i :class="sortBy==='name' ? (sortOrder==='asc' ? 'pi pi-sort-up' : 'pi pi-sort-down') : ''" class="ms-1"></i>
                </th>
                <th @click="sortBy='date'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor: pointer;">
                  Date
                  <i :class="sortBy==='date' ? (sortOrder==='asc' ? 'pi pi-sort-up' : 'pi pi-sort-down') : ''" class="ms-1"></i>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Location</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Status</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Ticket Types</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Ticket Prices</th>
                <th @click="sortBy='tickets'; toggleSortOrder()" class="px-3 py-2 text-start fs-6 text-muted" style="cursor: pointer;">
                  Tickets Sold
                  <i :class="sortBy==='tickets' ? (sortOrder==='asc' ? 'pi pi-sort-up' : 'pi pi-sort-down') : ''" class="ms-1"></i>
                </th>
                <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in filteredEvents" :key="event.id" class="border-bottom">
                <td class="px-3 py-2">
                  <div class="fw-medium text-dark">{{ event.name }}</div>
                  <div class="fs-6 text-muted">Organizer: {{ event.organizer.firstName }} {{ event.organizer.lastName }}</div>
                </td>
                <td class="px-3 py-2">
                  <div class="text-dark">{{ formatDate(event.startDateTime) }}</div>
                  <div class="fs-6 text-muted">{{ formatTime(event.startDateTime) }}</div>
                </td>
                <td class="px-3 py-2 text-dark">{{ event.location }}</td>
                <td class="px-3 py-2">
                  <span
                    :class="{
                      'bg-light text-success': event.status==='PUBLISHED',
                      'bg-light text-danger': event.status==='CANCELLED',
                      'bg-light text-secondary': event.status==='DRAFT'
                    }"
                    class="px-2 py-1 rounded-pill small fw-medium"
                  >
                    {{ event.status }}
                  </span>
                </td>
                <td class="px-3 py-2 text-dark">
                  <ul class="list-unstyled mb-0">
                    <li v-for="ticket in getTicketsByEventId(event.id)" :key="ticket.id">{{ ticket.name }}</li>
                  </ul>
                </td>
                <td class="px-3 py-2 text-dark">
                  <ul class="list-unstyled mb-0">
                    <li v-for="ticket in getTicketsByEventId(event.id)" :key="ticket.id">${{ ticket.price }}</li>
                  </ul>
                </td>
                <td class="px-3 py-2 text-dark">
                  {{ getTicketsSold(event.id) }} / {{ event.capacity }}
                  <div class="progress mt-1" style="height: 0.25rem;">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      :style="{ width: getTicketsSold(event.id) / event.capacity * 100 + '%' }"
                    ></div>
                  </div>
                </td>
                <td class="px-3 py-2 text-center">
                  <button @click="manageTickets(event.id)" class="btn btn-link text-primary p-0" title="Manage Tickets">
                    <i class="pi pi-pencil"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredEvents.length === 0">
                <td colspan="8" class="px-3 py-4 text-center text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="pi pi-calendar-times fs-1 mb-2"></i>
                    <p class="fw-medium">No events found</p>
                    <p class="fs-6 mt-1">Try adjusting your filters.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination placeholder -->
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

<style scoped>
ul { margin: 0; padding-left: 1rem; }
</style>


