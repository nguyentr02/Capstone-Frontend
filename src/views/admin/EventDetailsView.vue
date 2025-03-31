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
const questions = ref([])

// Mock ticket types for the event
const ticketTypes = ref([...mockTickets])

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
    <div class="p-3">
      <!-- Loading state -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 16rem;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <!-- Back button -->
        <button @click="router.push('/admin/events')" class="d-flex align-items-center text-primary mb-3" type="button">
          <i class="pi pi-arrow-left me-1"></i>
          Back to Events
        </button>

        <!-- Event Header -->
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between mb-4">
          <div>
            <h1 class="fs-2 fw-bold text-dark">{{ event.name }}</h1>
            <div class="d-flex align-items-center mt-2">
              <span :class="getStatusClass(event.status)" class="px-2 py-1 rounded-pill small fw-semibold me-2">
                {{ event.status }}
              </span>
              <span class="text-muted">{{ formatDate(event.date) }}</span>
            </div>
          </div>

          <div class="mt-4 mt-md-0">
            <button @click="editEvent" class="btn btn-primary" type="button">
              <i class="pi pi-pencil me-2"></i>
              Edit Event
            </button>
          </div>
        </div>

        <!-- Event Content -->
        <div class="row g-4">
          <!-- Left column - Details and Tabs -->
          <div class="col-12 col-lg-8">
            <!-- Event Image Card -->
            <div class="bg-white rounded shadow-sm overflow-hidden mb-4">
              <img :src="event.imageUrl" :alt="event.name" class="w-100" style="height: 16rem; object-fit: cover;">
              <div class="p-4">
                <h2 class="fs-4 fw-semibold text-dark mb-3">About This Event</h2>
                <p class="text-secondary mb-3">{{ event.description }}</p>

                <div class="row g-4 mt-3">
                  <div class="col-12 col-md-6">
                    <h3 class="fs-6 fw-semibold text-muted mb-1">Date and Time</h3>
                    <p class="text-dark mb-0">{{ formatDate(event.date) }}</p>
                    <p class="text-dark">{{ event.time }}</p>
                  </div>

                  <div class="col-12 col-md-6">
                    <h3 class="fs-6 fw-semibold text-muted mb-1">Location</h3>
                    <p class="text-dark mb-0">{{ event.location }}</p>
                    <p class="text-muted">{{ event.address }}</p>
                  </div>

                  <div class="col-12 col-md-6">
                    <h3 class="fs-6 fw-semibold text-muted mb-1">Organizer</h3>
                    <p class="text-dark mb-0">{{ event.organizer }}</p>
                    <p class="text-muted">{{ event.organizerContact }}</p>
                  </div>

                  <div class="col-12 col-md-6">
                    <h3 class="fs-6 fw-semibold text-muted mb-1">Capacity</h3>
                    <p class="text-dark mb-1">{{ event.ticketsSold }} / {{ event.capacity }} tickets sold</p>
                    <div class="progress" style="height: 0.5rem;">
                      <div class="progress-bar bg-primary" role="progressbar"
                        :style="{ width: (event.ticketsSold / event.capacity) * 100 + '%' }" aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>

                <!-- Event Features -->
                <div class="mt-3">
                  <h3 class="fs-6 fw-semibold text-muted mb-2">Event Features</h3>
                  <ul class="ms-3 text-secondary">
                    <li v-for="(feature, index) in event.features" :key="index" class="mb-1">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="bg-white rounded shadow-sm overflow-hidden">
              <div class="d-flex border-bottom">
                <button @click="activeTab = 'overview'" type="button"
                  class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                  :class="activeTab === 'overview' ? 'text-primary' : 'text-muted'">
                  Overview
                </button>
                <button @click="activeTab = 'tickets'" type="button"
                  class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                  :class="activeTab === 'tickets' ? 'text-primary' : 'text-muted'">
                  Tickets
                </button>
                <button @click="activeTab = 'attendees'" type="button"
                  class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                  :class="activeTab === 'attendees' ? 'text-primary' : 'text-muted'">
                  Attendees
                </button>
              </div>


            <!-- Tab Content -->
            <div class="p-3">
              <!-- Overview Tab -->
              <div v-if="activeTab === 'overview'">
                <div class="row g-4">
                  <div class="col-12 col-md-4">
                    <div class="bg-primary bg-opacity-10 p-3 rounded">
                      <div class="fs-6 fw-semibold text-primary mb-1">Total Revenue</div>
                      <div class="fs-2 fw-bold text-primary">{{ event.revenue }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-4">
                    <div class="bg-success bg-opacity-10 p-3 rounded">
                      <div class="fs-6 fw-semibold text-success mb-1">Tickets Sold</div>
                      <div class="fs-2 fw-bold text-success">{{ event.ticketsSold }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-4">
                    <div class="bg-secondary bg-opacity-10 p-3 rounded">
                      <div class="fs-6 fw-semibold text-secondary mb-1">Remaining Capacity</div>
                      <div class="fs-2 fw-bold text-secondary">{{ event.capacity - event.ticketsSold }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tickets Tab -->
              <div v-if="activeTab === 'tickets'">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr class="bg-light border-bottom">
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Ticket Type</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Price</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Sold</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Available</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ticket in ticketTypes" :key="ticket.id" class="border-bottom">
                        <td class="px-3 py-2 text-dark">{{ ticket.name }}</td>
                        <td class="px-3 py-2 text-dark">{{ ticket.price }}</td>
                        <td class="px-3 py-2 text-dark">{{ ticket.sold }}</td>
                        <td class="px-3 py-2 text-dark">{{ ticket.available }}</td>
                        <td class="px-3 py-2 text-dark">{{ ticket.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="mt-3 d-flex justify-content-end">
                  <button class="btn btn-primary" type="button">
                    <i class="pi pi-plus me-2"></i>
                    Add Ticket Type
                  </button>
                </div>
              </div>

              <!-- Attendees Tab -->
              <div v-if="activeTab === 'attendees'">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr class="bg-light border-bottom">
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Name</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Email</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Ticket Type</th>
                        <th class="px-3 py-2 text-start fs-6 fw-semibold text-muted">Purchase Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="attendee in attendees" :key="attendee.id" class="border-bottom">
                        <td class="px-3 py-2 text-dark fw-medium">{{ attendee.name }}</td>
                        <td class="px-3 py-2 text-dark">{{ attendee.email }}</td>
                        <td class="px-3 py-2 text-dark">{{ attendee.ticketType }}</td>
                        <td class="px-3 py-2 text-dark">{{ formatDate(attendee.purchaseDate) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div class="fs-6 text-muted">
                    Showing <span class="fw-semibold">{{ attendees.length }}</span> of <span class="fw-semibold">{{
                      event.ticketsSold }}</span> attendees
                  </div>

                  <button class="btn btn-success" type="button">
                    <i class="pi pi-download me-2"></i>
                    Export Attendees
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column - Quick Actions -->
        <div class="col-12 col-lg-4">
          <!-- Quick Stats -->
          <div class="bg-white rounded shadow-sm p-3 mb-4">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Event Stats</h2>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fs-6 text-muted">Tickets Sold</span>
                <span class="fs-6 fw-semibold">{{ event.ticketsSold }}/{{ event.capacity }}</span>
              </div>
              <div class="progress" style="height: 0.5rem;">
                <div class="progress-bar bg-primary" role="progressbar"
                  :style="{ width: (event.ticketsSold / event.capacity) * 100 + '%' }" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div>
            </div>

            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fs-6 text-muted">Revenue</span>
                <span class="fs-6 fw-semibold">{{ event.revenue }}</span>
              </div>
              <div class="progress" style="height: 0.5rem;">
                <div class="progress-bar bg-success" role="progressbar" style="width: 45%;" aria-valuenow="45"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded shadow-sm p-3 mb-4">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Quick Actions</h2>
            <div class="d-grid gap-3">
              <button class="btn btn-outline-primary w-100 d-flex align-items-center" type="button">
                <i class="pi pi-share-alt me-2"></i>
                Share Event
              </button>

              <button class="btn btn-outline-success w-100 d-flex align-items-center" type="button">
                <i class="pi pi-ticket me-2"></i>
                Manage Tickets
              </button>

              <button class="btn btn-outline-secondary w-100 d-flex align-items-center" type="button">
                <i class="pi pi-chart-bar me-2"></i>
                View Reports
              </button>

              <button v-if="event.status !== 'Cancelled'" class="btn btn-outline-danger w-100 d-flex align-items-center"
                type="button">
                <i class="pi pi-times-circle me-2"></i>
                Cancel Event
              </button>

              <button v-if="event.status === 'Cancelled'" class="btn btn-outline-success w-100 d-flex align-items-center"
                type="button">
                <i class="pi pi-check-circle me-2"></i>
                Reactivate Event
              </button>
            </div>
          </div>

          <!-- Event Timeline -->
          <div class="bg-white rounded shadow-sm p-3">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Event Timeline</h2>

            <div class="position-relative ps-4 pb-2 border-start border-2 border-light">
              <!-- Timeline items -->
              <div class="mb-3 position-relative">
                <div class="position-absolute"
                  style="left: -2.5rem; top: 0.375rem; width: 1rem; height: 1rem; border-radius: 50%; background-color: #0d6efd;">
                </div>
                <div class="fs-6 fw-semibold text-dark">Event Created</div>
                <div class="small text-muted">November 5, 2024</div>
              </div>

              <div class="mb-3 position-relative">
                <div class="position-absolute"
                  style="left: -2.5rem; top: 0.375rem; width: 1rem; height: 1rem; border-radius: 50%; background-color: #198754;">
                </div>
                <div class="fs-6 fw-semibold text-dark">First Ticket Sold</div>
                <div class="small text-muted">November 10, 2024</div>
              </div>

              <div class="mb-3 position-relative">
                <div class="position-absolute"
                  style="left: -2.5rem; top: 0.375rem; width: 1rem; height: 1rem; border-radius: 50%; background-color: #ffc107;">
                </div>
                <div class="fs-6 fw-semibold text-dark">Early Bird Tickets Sold Out</div>
                <div class="small text-muted">December 1, 2024</div>
              </div>

              <div class="position-relative">
                <div class="position-absolute"
                  style="left: -2.5rem; top: 0.375rem; width: 1rem; height: 1rem; border-radius: 50%; background-color: #6c757d;">
                </div>
                <div class="fs-6 fw-semibold text-dark">Event Date</div>
                <div class="small text-muted">{{ formatDate(event.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  <div style="background-color: #f0f0f0; padding: 20px; display: flex;">
    Test with direct styles
  </div>
</AdminLayout></template>


<style scoped>
.no-border-btn:hover {
  background-color: #e9ecef;
}
</style>