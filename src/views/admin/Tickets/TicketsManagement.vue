<!-- src/views/admin/Tickets/TicketsManagement.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

import { fetchEventDetails } from '@/api/aevents.js'
import { fetchTicketTypes } from '@/api/atickets.js'
import { usersMockData } from '@/mock/usersMock.js'
import { participantsMockData } from '@/mock/participantsMockData.js'

const route = useRoute()
const router = useRouter()
const eventId = Number(route.params.eventId)

const loading = ref(true)
const activeTab = ref('ticketTypes')

// Data stores
const event = ref(null)
const eventTicketTypes = ref([])

const ticketUsers = ref([])
const ticketParticipants = ref([])

// Initialization: Pull event details & ticket types, and fill in mock users/participants
onMounted(async () => {
  try {
    const eventData = await fetchEventDetails(eventId)
    event.value = eventData

    const tickets = await fetchTicketTypes(eventId)
    eventTicketTypes.value = Array.isArray(tickets) ? tickets : []

    // Mock:  Ticket Users 
    ticketUsers.value = usersMockData.slice(0, 2).map(user => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      ticketType: eventTicketTypes.value[0]?.name || '',
      purchaseDate: '2025-01-10T10:00:00Z'
    }))

    // Mock: Participants 
    ticketParticipants.value = participantsMockData
  } catch (err) {
    console.error('Error loading data:', err)
  } finally {
    loading.value = false
  }
})

// Formatting Dates
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

// Ticket Types operation
const createTicketType = () => router.push({ name: 'TicketTypeCreate', params: { eventId } }) // source from const eventId = Number(route.params.eventId)
const viewTicketDetails = (ticketId) => router.push(`/admin/tickets/${ticketId}`)
const editTicket = (ticketId) => { router.push({ name: 'TicketEdit', params: { eventId,ticketId } })} 
const deleteTicket = (ticketId) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    eventTicketTypes.value = eventTicketTypes.value.filter(t => t.id !== ticketId)
  }
}

// Ticket Users related
const userSearchQuery = ref('')
const userSortBy = ref('name')
const userSortOrder = ref('asc')
const toggleUserSortOrder = () => {
  userSortOrder.value = userSortOrder.value === 'asc' ? 'desc' : 'asc'
}
const filteredTicketUsers = computed(() => {
  let result = ticketUsers.value.filter(u => {
    const q = userSearchQuery.value.toLowerCase()
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.ticketType.toLowerCase().includes(q)
    )
  })
  result.sort((a, b) => {
    let cmp = 0
    if (userSortBy.value === 'name') {
      cmp = a.name.localeCompare(b.name)
    } else {
      cmp = new Date(a.purchaseDate) - new Date(b.purchaseDate)
    }
    return userSortOrder.value === 'asc' ? cmp : -cmp
  })
  return result
})
const viewTicketUserDetails = (id) => router.push(`/admin/tickets/users/${id}`)
const deleteTicketUser = (id) => {
  if (confirm('Are you sure you want to delete this ticket user?')) {
    ticketUsers.value = ticketUsers.value.filter(u => u.id !== id)
  }
}

// Participants related
const participantSearchQuery = ref('')
const participantSortBy = ref('name')
const participantSortOrder = ref('asc')
const toggleParticipantSortOrder = () => {
  participantSortOrder.value = participantSortOrder.value === 'asc' ? 'desc' : 'asc'
}
const filteredParticipants = computed(() => {
  let result = ticketParticipants.value.filter(p => {
    const q = participantSearchQuery.value.toLowerCase()
    const fullName = (p.first_name + ' ' + p.last_name).toLowerCase()
    return (
      fullName.includes(q) ||
      p.email.toLowerCase().includes(q)
    )
  })
  result.sort((a, b) => {
    let cmp = 0
    if (participantSortBy.value === 'name') {
      cmp = (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name)
    } else {
      cmp = new Date(a.created_at) - new Date(b.created_at)
    }
    return participantSortOrder.value === 'asc' ? cmp : -cmp
  })
  return result
})
const viewParticipantDetails = (id) => router.push(`/admin/tickets/participants/${id}`)
const deleteParticipant = (id) => {
  if (confirm('Are you sure you want to delete this participant?')) {
    ticketParticipants.value = ticketParticipants.value.filter(p => p.id !== id)
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-3">
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height:16rem">
        <div class="spinner-border text-primary" style="width:3rem;height:3rem" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <button @click="router.push('/admin/tickets')" class="btn btn-link text-primary mb-3">
          <i class="pi pi-arrow-left"></i> Back to Tickets
        </button>

        <!-- Event Header -->
        <div class="mb-4">
          <h1 class="fs-2 fw-bold text-dark">{{ event.name }}</h1>
          <div class="d-flex align-items-center">
            <span class="px-2 py-1 rounded-pill small fw-semibold"
                  :class="{
                    'bg-light text-success': event.status==='PUBLISHED',
                    'bg-light text-danger': event.status==='CANCELLED',
                    'bg-light text-secondary': event.status==='DRAFT'
                  }">
              {{ event.status }}
            </span>
            <span class="text-muted ms-2">{{ formatDate(event.startDateTime) }}</span>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded shadow-sm overflow-hidden mb-4">
          <div class="d-flex border-bottom">
            <button @click="activeTab='ticketTypes'" class="px-3 py-2 fs-6 fw-semibold bg-light border-0"
                    :class="activeTab==='ticketTypes'?'text-primary':'text-muted'">
              Ticket Types
            </button>
            <button @click="activeTab='ticketUsers'" class="px-3 py-2 fs-6 fw-semibold bg-light border-0"
                    :class="activeTab==='ticketUsers'?'text-primary':'text-muted'">
              Ticket Users
            </button>
            <button @click="activeTab='participants'" class="px-3 py-2 fs-6 fw-semibold bg-light border-0"
                    :class="activeTab==='participants'?'text-primary':'text-muted'">
              Participants
            </button>
          </div>
        </div>

        <!-- Ticket Types Tab -->
        <div v-if="activeTab==='ticketTypes'" class="bg-white rounded shadow-sm p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="fs-5 fw-semibold text-dark mb-0">Ticket Types</h2>
            <button @click="createTicketType" class="btn btn-primary">
              <i class="pi pi-plus me-1"></i> New Ticket Type
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr class="bg-light border-bottom">
                  <th class="px-3 py-2 text-start fs-6 text-muted">Ticket Name</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted">Price ($)</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted">Sold</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted">Available</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted">Total</th>
                  <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in eventTicketTypes" :key="ticket.id" class="border-bottom">
                  <td class="px-3 py-2 text-dark">{{ ticket.name }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ ticket.price }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ ticket.quantitySold }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ ticket.quantityTotal - ticket.quantitySold }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ ticket.quantityTotal }}</td>
                  <td class="px-3 py-2 text-center">
                    <div class="d-flex justify-content-center gap-2">
                      <button @click="viewTicketDetails(ticket.id)" class="btn btn-link text-primary p-0">
                        <i class="pi pi-eye"></i>
                      </button>
                      <button @click="editTicket(ticket.id)" class="btn btn-link text-success p-0">
                        <i class="pi pi-pencil"></i>
                      </button>
                      <button @click="deleteTicket(ticket.id)" class="btn btn-link text-danger p-0">
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="eventTicketTypes.length===0">
                  <td colspan="6" class="px-3 py-4 text-center text-muted">No tickets found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Ticket Users Tab -->
        <div v-if="activeTab==='ticketUsers'" class="bg-white rounded shadow-sm p-4">
          <h2 class="fs-5 fw-semibold text-dark mb-3">Ticket Users</h2>
          <div class="d-flex justify-content-start align-items-center mb-3">
            <input v-model="userSearchQuery" type="text" class="form-control" placeholder="Search ticket users..." style="max-width:300px;" />
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr class="bg-light border-bottom">
                  <th class="px-3 py-2 text-start fs-6 text-muted" @click="userSortBy='name'; toggleUserSortOrder()" style="cursor:pointer">
                    Name <i :class="userSortBy==='name'? (userSortOrder==='asc'?'pi pi-sort-up':'pi pi-sort-down') : ''" class="ms-1"></i>
                  </th>
                  <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted">Ticket Type</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted" @click="userSortBy='purchaseDate'; toggleUserSortOrder()" style="cursor:pointer">
                    Purchase Date <i :class="userSortBy==='purchaseDate'? (userSortOrder==='asc'?'pi pi-sort-up':'pi pi-sort-down') : ''" class="ms-1"></i>
                  </th>
                  <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in filteredTicketUsers" :key="u.id" class="border-bottom">
                  <td class="px-3 py-2 text-dark">{{ u.name }}</td>
                  <td class="px-3 py-2 text-dark">{{ u.email }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ u.ticketType }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ formatDate(u.purchaseDate) }}</td>
                  <td class="px-3 py-2 text-center">
                    <div class="d-flex justify-content-center gap-2">
                      <button @click="viewTicketUserDetails(u.id)" class="btn btn-link text-primary p-0"><i class="pi pi-eye"></i></button>
                      <button @click="deleteTicketUser(u.id)" class="btn btn-link text-danger p-0"><i class="pi pi-trash"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredTicketUsers.length===0">
                  <td colspan="5" class="px-3 py-4 text-center text-muted">No ticket users found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Participants Tab -->
        <div v-if="activeTab==='participants'" class="bg-white rounded shadow-sm p-4">
          <h2 class="fs-5 fw-semibold text-dark mb-3">Ticket Participants</h2>
          <div class="d-flex justify-content-start align-items-center mb-3">
            <input v-model="participantSearchQuery" type="text" class="form-control" placeholder="Search participants..." style="max-width:300px;" />
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr class="bg-light border-bottom">
                  <th class="px-3 py-2 text-start fs-6 text-muted" @click="participantSortBy='name'; toggleParticipantSortOrder()" style="cursor:pointer">
                    Name <i :class="participantSortBy==='name'? (participantSortOrder==='asc'?'pi pi-sort-up':'pi pi-sort-down') : ''" class="ms-1"></i>
                  </th>
                  <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                  <th class="px-3 py-2 text-end fs-6 text-muted" @click="participantSortBy='created_at'; toggleParticipantSortOrder()" style="cursor:pointer">
                    Registration Date <i :class="participantSortBy==='created_at'? (participantSortOrder==='asc'?'pi pi-sort-up':'pi pi-sort-down') : ''" class="ms-1"></i>
                  </th>
                  <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in filteredParticipants" :key="p.id" class="border-bottom">
                  <td class="px-3 py-2 text-dark">{{ p.first_name + ' ' + p.last_name }}</td>
                  <td class="px-3 py-2 text-dark">{{ p.email }}</td>
                  <td class="px-3 py-2 text-dark text-end">{{ formatDate(p.created_at) }}</td>
                  <td class="px-3 py-2 text-center">
                    <div class="d-flex justify-content-center gap-2">
                      <button @click="viewParticipantDetails(p.id)" class="btn btn-link text-primary p-0"><i class="pi pi-eye"></i></button>
                      <button @click="deleteParticipant(p.id)" class="btn btn-link text-danger p-0"><i class="pi pi-trash"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredParticipants.length===0">
                  <td colspan="4" class="px-3 py-4 text-center text-muted">No participants found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.no-border-btn:hover { background-color: #e9ecef; }
ul { margin:0; padding-left:1rem; }
</style>






