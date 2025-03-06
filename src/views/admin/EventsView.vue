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

// Color classes for event status
const getStatusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'Completed':
      return 'bg-gray-100 text-gray-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Event Management</h1>
        <p class="text-gray-600 mt-1">Create, edit and manage your events</p>
      </div>
      
      <!-- Action Bar -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <!-- Left side: Filters and Search -->
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Search Bar -->
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search events..." 
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <i class="pi pi-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            
            <!-- Status Filter -->
            <select 
              v-model="statusFilter"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <!-- Right side: Create Button -->
          <button 
            @click="createNewEvent"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            <i class="pi pi-plus mr-2"></i>
            Create New Event
          </button>
        </div>
      </div>
      
      <!-- Events Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gray-50 border-b">
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div class="flex items-center cursor-pointer" @click="sortBy = 'name'; toggleSortOrder()">
                    Event Name
                    <i 
                      v-if="sortBy === 'name'" 
                      :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'"
                      class="ml-1"
                    ></i>
                  </div>
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div class="flex items-center cursor-pointer" @click="sortBy = 'date'; toggleSortOrder()">
                    Date
                    <i 
                      v-if="sortBy === 'date'" 
                      :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'"
                      class="ml-1"
                    ></i>
                  </div>
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div class="flex items-center cursor-pointer" @click="sortBy = 'tickets'; toggleSortOrder()">
                    Tickets Sold
                    <i 
                      v-if="sortBy === 'tickets'" 
                      :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'"
                      class="ml-1"
                    ></i>
                  </div>
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <div class="flex items-center cursor-pointer" @click="sortBy = 'revenue'; toggleSortOrder()">
                    Revenue
                    <i 
                      v-if="sortBy === 'revenue'" 
                      :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'"
                      class="ml-1"
                    ></i>
                  </div>
                </th>
                <th class="px-4 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr 
                v-for="event in filteredEvents" 
                :key="event.id" 
                class="border-b hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3">
                  <div class="font-medium text-gray-800">{{ event.name }}</div>
                  <div class="text-sm text-gray-500">{{ event.organizer }}</div>
                </td>
                <td class="px-4 py-3">
                  <div class="text-gray-800">{{ formatDate(event.date) }}</div>
                  <div class="text-sm text-gray-500">{{ event.time }}</div>
                </td>
                <td class="px-4 py-3 text-gray-800">{{ event.location }}</td>
                <td class="px-4 py-3">
                  <span 
                    :class="getStatusClass(event.status)"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ event.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-800">
                  {{ event.ticketsSold }} / {{ event.capacity }}
                  <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      class="bg-blue-600 h-1.5 rounded-full" 
                      :style="`width: ${(event.ticketsSold / event.capacity) * 100}%`"
                    ></div>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-800">{{ event.revenue }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-center space-x-2">
                    <button 
                      @click="viewEventDetails(event.id)"
                      class="text-blue-600 hover:text-blue-800 p-1 rounded"
                      title="View Details"
                    >
                      <i class="pi pi-eye"></i>
                    </button>
                    <button 
                      @click="editEvent(event.id)"
                      class="text-green-600 hover:text-green-800 p-1 rounded"
                      title="Edit Event"
                    >
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button 
                      @click="deleteEvent(event.id)"
                      class="text-red-600 hover:text-red-800 p-1 rounded"
                      title="Delete Event"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Empty state -->
              <tr v-if="filteredEvents.length === 0">
                <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <i class="pi pi-calendar-times text-4xl mb-2"></i>
                    <p class="font-medium">No events found</p>
                    <p class="text-sm mt-1">Try adjusting your filters or create a new event</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination (simplified) -->
        <div class="px-4 py-3 flex items-center justify-between border-t">
          <div class="text-sm text-gray-500">
            Showing 
            <span class="font-medium">{{ filteredEvents.length }}</span> 
            of 
            <span class="font-medium">{{ eventsData.length }}</span> 
            events
          </div>
          <div class="flex space-x-2">
            <button class="border rounded px-3 py-1 text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <button class="border rounded px-3 py-1 text-sm bg-gray-100">1</button>
            <button class="border rounded px-3 py-1 text-sm disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>