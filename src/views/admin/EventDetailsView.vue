<!-- src/views/admin/EventDetailsView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

import { mockAttendees } from '@/mock/attendeesMock'
import { mockTickets } from '@/mock/ticketsMock'

const route = useRoute()
const router = useRouter()
const eventId = parseInt(route.params.id)
const event = ref(null)
const loading = ref(true)
const activeTab = ref('overview')

// Mock ticket types for the event
const ticketTypes = ref([ ...mockTickets])

// Mock attendees for the event
const attendees = ref([...mockAttendees])

onMounted(() => {
  // Simulate API call to fetch event details
  setTimeout(() => {
    // In a real app, this would be an API call
    event.value = {
      id: eventId,
      name: 'Tech Conference 2025',
      description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing. The event includes keynote speeches, workshops, networking sessions, and exhibitions from leading technology companies.',
      date: '2025-01-15',
      time: '09:00 AM - 06:00 PM',
      location: 'San Francisco Convention Center',
      address: '747 Howard St, San Francisco, CA 94103',
      organizer: 'TechCorp Inc.',
      organizerContact: 'events@techcorp.com',
      status: 'Active',
      capacity: 1000,
      ticketsSold: 450,
      revenue: '$13,500',
      imageUrl: 'https://placehold.co/600x400/eee/ccc?text=Tech+Conference',
      features: [
        'Keynote speeches from industry leaders',
        'Interactive workshops and hands-on sessions',
        'Networking opportunities with tech professionals',
        'Exhibition hall with the latest technology products',
        'Catered lunch and refreshments included'
      ]
    }
    loading.value = false
  }, 500)
})

const editEvent = () => {
  router.push(`/admin/events/edit/${eventId}`)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

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
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else>
        <!-- Back button -->
        <button 
          @click="router.push('/admin/events')" 
          class="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <i class="pi pi-arrow-left mr-1"></i>
          Back to Events
        </button>
        
        <!-- Event Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{{ event.name }}</h1>
            <div class="flex items-center mt-2">
              <span 
                :class="getStatusClass(event.status)"
                class="px-2 py-1 rounded-full text-xs font-medium mr-2"
              >
                {{ event.status }}
              </span>
              <span class="text-gray-600">{{ formatDate(event.date) }}</span>
            </div>
          </div>
          
          <div class="mt-4 md:mt-0">
            <button 
              @click="editEvent"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <i class="pi pi-pencil mr-2"></i>
              Edit Event
            </button>
          </div>
        </div>
        
        <!-- Event Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left column - Details and Tabs -->
          <div class="lg:col-span-2">
            <!-- Event Image -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <img :src="event.imageUrl" :alt="event.name" class="w-full h-64 object-cover">
              <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">About This Event</h2>
                <p class="text-gray-700 mb-4">{{ event.description }}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-1">Date and Time</h3>
                    <p class="text-gray-800">{{ formatDate(event.date) }}</p>
                    <p class="text-gray-800">{{ event.time }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-1">Location</h3>
                    <p class="text-gray-800">{{ event.location }}</p>
                    <p class="text-gray-600">{{ event.address }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-1">Organizer</h3>
                    <p class="text-gray-800">{{ event.organizer }}</p>
                    <p class="text-gray-600">{{ event.organizerContact }}</p>
                  </div>
                  
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-1">Capacity</h3>
                    <p class="text-gray-800">{{ event.ticketsSold }} / {{ event.capacity }} tickets sold</p>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        class="bg-blue-600 h-2 rounded-full" 
                        :style="`width: ${(event.ticketsSold / event.capacity) * 100}%`"
                      ></div>
                    </div>
                  </div>
                </div>
                
                <!-- Event Features -->
                <div class="mt-6">
                  <h3 class="text-sm font-medium text-gray-500 mb-2">Event Features</h3>
                  <ul class="list-disc pl-5 text-gray-700">
                    <li v-for="(feature, index) in event.features" :key="index" class="mb-1">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Tabs Navigation -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="flex border-b">
                <button 
                  @click="activeTab = 'overview'"
                  class="px-4 py-3 text-sm font-medium transition-colors"
                  :class="activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'"
                >
                  Overview
                </button>
                <button 
                  @click="activeTab = 'tickets'"
                  class="px-4 py-3 text-sm font-medium transition-colors"
                  :class="activeTab === 'tickets' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'"
                >
                  Tickets
                </button>
                <button 
                  @click="activeTab = 'attendees'"
                  class="px-4 py-3 text-sm font-medium transition-colors"
                  :class="activeTab === 'attendees' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'"
                >
                  Attendees
                </button>
              </div>
              
              <!-- Tab Content -->
              <div class="p-4">
                <!-- Overview Tab -->
                <div v-if="activeTab === 'overview'" class="overflow-hidden">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                      <div class="text-sm font-medium text-blue-800 mb-1">Total Revenue</div>
                      <div class="text-2xl font-bold text-blue-900">{{ event.revenue }}</div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                      <div class="text-sm font-medium text-green-800 mb-1">Tickets Sold</div>
                      <div class="text-2xl font-bold text-green-900">{{ event.ticketsSold }}</div>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                      <div class="text-sm font-medium text-purple-800 mb-1">Remaining Capacity</div>
                      <div class="text-2xl font-bold text-purple-900">{{ event.capacity - event.ticketsSold }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Tickets Tab -->
                <div v-if="activeTab === 'tickets'" class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="bg-gray-50 border-b">
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Ticket Type</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Sold</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Available</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ticket in ticketTypes" :key="ticket.id" class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 text-gray-800 font-medium">{{ ticket.name }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ ticket.price }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ ticket.sold }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ ticket.available }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ ticket.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div class="mt-4 flex justify-end">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      <i class="pi pi-plus mr-2"></i>
                      Add Ticket Type
                    </button>
                  </div>
                </div>
                
                <!-- Attendees Tab -->
                <div v-if="activeTab === 'attendees'" class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="bg-gray-50 border-b">
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Ticket Type</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Purchase Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="attendee in attendees" :key="attendee.id" class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 text-gray-800 font-medium">{{ attendee.name }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ attendee.email }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ attendee.ticketType }}</td>
                        <td class="px-4 py-3 text-gray-800">{{ formatDate(attendee.purchaseDate) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div class="mt-4 flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                      Showing <span class="font-medium">{{ attendees.length }}</span> of <span class="font-medium">{{ event.ticketsSold }}</span> attendees
                    </div>
                    
                    <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      <i class="pi pi-download mr-2"></i>
                      Export Attendees
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right column - Quick Actions -->
          <div>
            <!-- Quick Stats -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Event Stats</h2>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm text-gray-600">Tickets Sold</span>
                    <span class="text-sm font-medium">{{ event.ticketsSold }}/{{ event.capacity }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full" 
                      :style="`width: ${(event.ticketsSold / event.capacity) * 100}%`"
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm text-gray-600">Revenue</span>
                    <span class="text-sm font-medium">{{ event.revenue }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-green-600 h-2 rounded-full" 
                      style="width: 45%"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              
              <div class="space-y-3">
                <button class="w-full flex items-center p-2 border rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors">
                  <i class="pi pi-share-alt mr-2"></i>
                  Share Event
                </button>
                
                <button class="w-full flex items-center p-2 border rounded-lg text-green-600 border-green-200 hover:bg-green-50 transition-colors">
                  <i class="pi pi-ticket mr-2"></i>
                  Manage Tickets
                </button>
                
                <button class="w-full flex items-center p-2 border rounded-lg text-purple-600 border-purple-200 hover:bg-purple-50 transition-colors">
                  <i class="pi pi-chart-bar mr-2"></i>
                  View Reports
                </button>
                
                <button v-if="event.status !== 'Cancelled'" class="w-full flex items-center p-2 border rounded-lg text-red-600 border-red-200 hover:bg-red-50 transition-colors">
                  <i class="pi pi-times-circle mr-2"></i>
                  Cancel Event
                </button>
                
                <button v-if="event.status === 'Cancelled'" class="w-full flex items-center p-2 border rounded-lg text-green-600 border-green-200 hover:bg-green-50 transition-colors">
                  <i class="pi pi-check-circle mr-2"></i>
                  Reactivate Event
                </button>
              </div>
            </div>
            
            <!-- Event Timeline -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Event Timeline</h2>
              
              <div class="relative pl-8 pb-2 border-l-2 border-gray-200">
                <!-- Timeline items -->
                <div class="mb-6 relative">
                  <div class="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div class="text-sm font-medium text-gray-800">Event Created</div>
                  <div class="text-xs text-gray-500">November 5, 2024</div>
                </div>
                
                <div class="mb-6 relative">
                  <div class="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-green-500"></div>
                  <div class="text-sm font-medium text-gray-800">First Ticket Sold</div>
                  <div class="text-xs text-gray-500">November 10, 2024</div>
                </div>
                
                <div class="mb-6 relative">
                  <div class="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div class="text-sm font-medium text-gray-800">Early Bird Tickets Sold Out</div>
                  <div class="text-xs text-gray-500">December 1, 2024</div>
                </div>
                
                <div class="relative">
                  <div class="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-gray-500"></div>
                  <div class="text-sm font-medium text-gray-800">Event Date</div>
                  <div class="text-xs text-gray-500">{{ formatDate(event.date) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>