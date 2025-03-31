<!-- src/views/admin/EventFormView.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.path.includes('/edit/'))
const eventId = isEditMode.value ? parseInt(route.params.id) : null
const loading = ref(true)
const saving = ref(false)
const activeTab = ref('basic')
const questions = ref([])

// Form state
const eventForm = ref({
  name: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  organizer: '',
  organizerContact: '',
  capacity: 100,
  status: 'Upcoming',
  imageUrl: '',
  features: ['', '', ''],
})

// Ticket types
const ticketTypes = ref([
  {
    id: 1,
    name: 'General Admission',
    price: 30.0,
    quantity: 800,
    description: 'Standard entry to the event',
  },
])

// Form validation
const errors = ref({})

// Locations list (for dropdown)
const locations = [
  'San Francisco Convention Center',
  'Metropolitan Pavilion, New York',
  'Riverside Park, Austin',
  'Grand Hotel, Chicago',
  'Ritz Carlton, Boston',
  'Tech Hub, Seattle',
  'Art Gallery, Los Angeles',
  'Mountain Convention Center, Denver',
  'Community Center, Portland',
  'Exhibition Center, San Diego',
]

onMounted(() => {
  if (isEditMode.value) {
    // Simulate API call to fetch event details for editing
    setTimeout(() => {
      // In a real app, this would be an API call
      eventForm.value = {
        name: 'Tech Conference 2025',
        description:
          'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing.',
        date: '2025-01-15',
        startTime: '09:00',
        endTime: '18:00',
        location: 'San Francisco Convention Center',
        address: '747 Howard St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103',
        organizer: 'TechCorp Inc.',
        organizerContact: 'events@techcorp.com',
        status: 'Active',
        capacity: 1000,
        imageUrl: 'https://placehold.co/600x400/eee/ccc?text=Tech+Conference',
        features: [
          'Keynote speeches from industry leaders',
          'Interactive workshops and hands-on sessions',
          'Networking opportunities with tech professionals',
        ],
      }

      ticketTypes.value = [
        {
          id: 1,
          name: 'General Admission',
          price: 30.0,
          quantity: 800,
          description: 'Standard entry to the event',
        },
        {
          id: 2,
          name: 'VIP',
          price: 100.0,
          quantity: 200,
          description: 'Premium experience with exclusive access',
        },
        {
          id: 3,
          name: 'Early Bird',
          price: 20.0,
          quantity: 50,
          description: 'Limited availability discounted tickets',
        },
      ]

      loading.value = false
    }, 500)
  } else {
    // Create mode - form is already initialized with defaults
    loading.value = false
  }
})

// Validate form fields
const validateForm = () => {
  errors.value = {}

  if (!eventForm.value.name) {
    errors.value.name = 'Event name is required'
  }

  if (!eventForm.value.date) {
    errors.value.date = 'Event date is required'
  }

  if (!eventForm.value.location) {
    errors.value.location = 'Location is required'
  }

  if (!eventForm.value.capacity || eventForm.value.capacity <= 0) {
    errors.value.capacity = 'Valid capacity is required'
  }

  // Validate at least one ticket type
  if (ticketTypes.value.length === 0) {
    errors.value.tickets = 'At least one ticket type is required'
  }

  return Object.keys(errors.value).length === 0
}

const addFeature = () => {
  eventForm.value.features.push('')
}

const removeFeature = (index) => {
  eventForm.value.features.splice(index, 1)
}

const addTicketType = () => {
  ticketTypes.value.push({
    id: Date.now(), // Temporary ID for new ticket types
    name: '',
    price: 0.0,
    quantity: 0,
    description: '',
  })
}

const removeTicketType = (index) => {
  ticketTypes.value.splice(index, 1)
}

const saveEvent = () => {
  if (!validateForm()) {
    // Form has errors
    return
  }

  saving.value = true

  // Simulate API call to save event
  setTimeout(() => {
    // In a real app, this would be an API call
    console.log('Event saved:', {
      event: eventForm.value,
      tickets: ticketTypes.value,
    })

    saving.value = false

    // Navigate back to events list
    router.push('/admin/events')
  }, 1000)
}

const cancelForm = () => {
  router.push('/admin/events')
}

const addQuestion = () => {
  console.log('Adding new question')
  const newId = Date.now()
  questions.value.push({
    id: newId,
    text: '',
    type: 'text',
    required: false,
    options: ['Option 1'],
    hasMaxLength: false,
    maxLength: 255,
    order: questions.value.length + 1,
  })
}

const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

const addOption = (question) => {
  question.options.push(`Option ${question.options.length + 1}`)
}

const removeOption = (question, optionIndex) => {
  if (question.options.length > 1) {
    question.options.splice(optionIndex, 1)
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- Loading state -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 16rem;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <!-- Form Header -->
        <div class="mb-4">
          <h1 class="fs-2 fw-bold text-dark">
            {{ isEditMode ? 'Edit Event' : 'Create New Event' }}
          </h1>
          <p class="text-muted mt-1">
            {{
              isEditMode
              ? 'Update the details of your event'
              : 'Fill out the form to create a new event'
            }}
          </p>
        </div>

        <!-- Form Tabs -->
        <div class="bg-white rounded shadow-sm mb-4">
          <div class="d-flex border-bottom overflow-auto">
            <!-- Basic information -->
            <button @click="activeTab = 'basic'" type="button"
              class="px-3 py-2 fs-6 fw-semibold text-nowrap bg-light border-0 no-border-btn"
              :class="activeTab === 'basic' ? 'text-primary' : 'text-muted'">
              <i class="pi pi-info-circle me-1"></i>
              Basic Information
            </button>

            <!-- Location -->
            <button @click="activeTab = 'location'" type="button"
              class="px-3 py-2 fs-6 fw-semibold text-nowrap bg-light border-0 no-border-btn"
              :class="activeTab === 'location' ? 'text-primary' : 'text-muted'">
              <i class="pi pi-map-marker me-1"></i>
              Location
            </button>

            <!-- Tickets -->
            <button @click="activeTab = 'tickets'" type="button"
              class="px-3 py-2 fs-6 fw-semibold text-nowrap bg-light border-0 no-border-btn"
              :class="activeTab === 'tickets' ? 'text-primary' : 'text-muted'">
              <i class="pi pi-ticket me-1"></i>
              Tickets
            </button>

            <!-- Features -->
            <button @click="activeTab = 'features'" type="button"
              class="px-3 py-2 fs-6 fw-semibold text-nowrap bg-light border-0 no-border-btn"
              :class="activeTab === 'features' ? 'text-primary' : 'text-muted'">
              <i class="pi pi-list me-1"></i>
              Features
            </button>

            <!-- Questionnaire -->
            <button @click="activeTab = 'questionnaire'" type="button"
              class="px-3 py-2 fs-6 fw-semibold text-nowrap bg-light border-0 no-border-btn"
              :class="activeTab === 'questionnaire' ? 'text-primary' : 'text-muted'">
              <i class="pi pi-list-alt me-1"></i>
              Questionnaire
            </button>
          </div>
        </div>


        <!-- Form Content -->
        <div class="bg-white rounded shadow-sm p-4">
          <form @submit.prevent="saveEvent">
            <!-- Basic Info Tab -->
            <div v-if="activeTab === 'basic'" class="mb-4">
              <div class="mb-3">
                <!-- Event Name -->
                <label class="form-label">
                  Event Name <span class="text-danger">*</span>
                </label>
                <input v-model="eventForm.name" type="text" placeholder="Enter event name" class="form-control"
                  :class="{ 'is-invalid': errors.name }" />
                <div v-if="errors.name" class="invalid-feedback">
                  {{ errors.name }}
                </div>
              </div>

              <div class="mb-3">
                <!-- Event Description -->
                <label class="form-label">Description</label>
                <textarea v-model="eventForm.description" placeholder="Describe your event" rows="4"
                  class="form-control"></textarea>
              </div>

              <div class="row g-3">
                <!-- Date -->
                <div class="col-12 col-md-4">
                  <label class="form-label">
                    Date <span class="text-danger">*</span>
                  </label>
                  <input v-model="eventForm.date" type="date" class="form-control"
                    :class="{ 'is-invalid': errors.date }" />
                  <div v-if="errors.date" class="invalid-feedback">
                    {{ errors.date }}
                  </div>
                </div>

                <!-- Start Time -->
                <div class="col-12 col-md-4">
                  <label class="form-label">Start Time</label>
                  <input v-model="eventForm.startTime" type="time" class="form-control" />
                </div>

                <!-- End Time -->
                <div class="col-12 col-md-4">
                  <label class="form-label">End Time</label>
                  <input v-model="eventForm.endTime" type="time" class="form-control" />
                </div>
              </div>

              <div class="row g-3 mt-3">
                <!-- Organizer Information -->
                <div class="col-12 col-md-6">
                  <label class="form-label">Organizer</label>
                  <input v-model="eventForm.organizer" type="text" placeholder="Organizing company or person"
                    class="form-control" />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Organizer Contact</label>
                  <input v-model="eventForm.organizerContact" type="email" placeholder="Contact email"
                    class="form-control" />
                </div>
              </div>

              <div class="row g-3 mt-3">
                <!-- Capacity -->
                <div class="col-12 col-md-6">
                  <label class="form-label">
                    Capacity <span class="text-danger">*</span>
                  </label>
                  <input v-model="eventForm.capacity" type="number" min="1" class="form-control"
                    :class="{ 'is-invalid': errors.capacity }" />
                  <div v-if="errors.capacity" class="invalid-feedback">
                    {{ errors.capacity }}
                  </div>
                </div>
                <!-- Status -->
                <div class="col-12 col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="eventForm.status" class="form-select">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div class="mb-3 mt-3">
                <!-- Image URL -->
                <label class="form-label">Image URL</label>
                <input v-model="eventForm.imageUrl" type="text" placeholder="URL to event image" class="form-control" />
                <div class="form-text">
                  Enter a URL for the event image. For best results, use a 16:9 aspect ratio image.
                </div>
              </div>
            </div>

            <!-- Location Tab -->
            <div v-if="activeTab === 'location'" class="mb-4">
              <div class="mb-3">
                <!-- Location Selection -->
                <label class="form-label">
                  Venue <span class="text-danger">*</span>
                </label>
                <select v-model="eventForm.location" class="form-select" :class="{ 'is-invalid': errors.location }">
                  <option value="">Select a venue</option>
                  <option v-for="location in locations" :key="location" :value="location">
                    {{ location }}
                  </option>
                  <option value="other">Other (specify below)</option>
                </select>
                <div v-if="errors.location" class="invalid-feedback">
                  {{ errors.location }}
                </div>
              </div>

              <div class="mb-3">
                <!-- Address Details -->
                <label class="form-label">Address</label>
                <input v-model="eventForm.address" type="text" placeholder="Street address" class="form-control mb-3" />
                <div class="row g-3">
                  <div class="col-12 col-md-4">
                    <input v-model="eventForm.city" type="text" placeholder="City" class="form-control" />
                  </div>
                  <div class="col-12 col-md-4">
                    <input v-model="eventForm.state" type="text" placeholder="State" class="form-control" />
                  </div>
                  <div class="col-12 col-md-4">
                    <input v-model="eventForm.zipCode" type="text" placeholder="Zip Code" class="form-control" />
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <p class="small fst-italic text-muted">
                  The address information helps attendees locate your event. It will be displayed on the event details
                  page.
                </p>
              </div>
            </div>

            <!-- Tickets Tab -->
            <div v-if="activeTab === 'tickets'" class="mb-4">
              <div v-if="errors.tickets" class="alert alert-danger">
                {{ errors.tickets }}
              </div>

              <div v-for="(ticket, index) in ticketTypes" :key="ticket.id" class="bg-light p-3 rounded mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <h3 class="h6 mb-0">Ticket Type {{ index + 1 }}</h3>
                  <button v-if="ticketTypes.length > 1" @click="removeTicketType(index)" type="button"
                    class="btn btn-link text-danger p-0">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>

                <div class="row g-3 mb-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label">Name</label>
                    <input v-model="ticket.name" type="text" placeholder="e.g. General Admission" class="form-control" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label">Description</label>
                    <input v-model="ticket.description" type="text" placeholder="Brief description of this ticket type"
                      class="form-control" />
                  </div>
                </div>

                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label">Price ($)</label>
                    <input v-model="ticket.price" type="number" step="0.01" min="0" class="form-control" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label">Quantity Available</label>
                    <input v-model="ticket.quantity" type="number" min="1" class="form-control" />
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <button @click="addTicketType" type="button" class="btn btn-link text-primary">
                  <i class="pi pi-plus me-1"></i>
                  Add Another Ticket Type
                </button>
              </div>

              <div class="alert alert-warning">
                <h4 class="h6">Important Note</h4>
                <p class="small">
                  Make sure the total number of tickets available does not exceed the event capacity. Current capacity: {{
                    eventForm.capacity }} attendees.
                </p>
              </div>
            </div>

            <!-- Features Tab -->
            <div v-if="activeTab === 'features'" class="mb-4">
              <div>
                <label class="form-label mb-3">Event Features</label>
                <p class="small text-muted mb-3">
                  List the key features or highlights of your event that would attract attendees.
                </p>

                <div v-for="(feature, index) in eventForm.features" :key="index" class="d-flex align-items-center mb-3">
                  <input v-model="eventForm.features[index]" type="text"
                    placeholder="e.g. Networking opportunities, Free refreshments, etc." class="form-control" />
                  <button @click="removeFeature(index)" type="button" class="btn btn-link text-danger ms-2"
                    :disabled="eventForm.features.length <= 1">
                    <i class="pi pi-times"></i>
                  </button>
                </div>

                <button @click="addFeature" type="button" class="btn btn-link text-primary mt-2">
                  <i class="pi pi-plus me-1"></i>
                  Add Another Feature
                </button>
              </div>
            </div>

            <!-- Questionnaire Tab -->
            <div v-if="activeTab === 'questionnaire'" class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 class="h6">Registration Questions</h3>
                  <p class="small text-muted">
                    Create questions that attendees will answer during registration
                  </p>
                </div>
                <button @click="addQuestion" type="button" class="btn btn-primary d-flex align-items-center">
                  <i class="pi pi-plus me-2"></i>
                  Add Question
                </button>
              </div>

              <div v-if="!questions.length" class="alert alert-light text-center">
                <div class="text-muted mb-2">
                  <i class="pi pi-list-alt"></i>
                </div>
                <h4 class="h6 mb-2">No questions</h4>
                <p class="small text-muted mb-3">
                  Add questions to collect information from your attendees during registration
                </p>
                <button @click="addQuestion" type="button" class="btn btn-primary d-inline-flex align-items-center">
                  <i class="pi pi-plus me-2"></i>
                  Add First Question
                </button>
              </div>

              <div v-else class="mb-4">
                <div v-for="(question, index) in questions" :key="question.id"
                  class="bg-white border rounded overflow-hidden mb-3">
                  <!-- Question header -->
                  <div class="bg-light px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                    <div class="d-flex align-items-center">
                      <i class="pi pi-bars text-muted me-3" style="cursor: move;"></i>
                      <span class="fw-semibold text-dark">Question {{ index + 1 }}</span>
                      <span v-if="question.required" class="small bg-danger text-white px-2 py-1 rounded-pill ms-2">
                        Required
                      </span>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="small text-muted bg-light px-2 py-1 rounded me-2">
                        {{ question.type }}
                      </span>
                      <button @click="removeQuestion(index)" type="button" class="btn btn-link text-danger p-0">
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Question content -->
                  <div class="p-3">
                    <div class="mb-3">
                      <label class="form-label">Question Text</label>
                      <input v-model="question.text" type="text" placeholder="Enter your question" class="form-control" />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Question Type</label>
                      <select v-model="question.type" class="form-select">
                        <option value="text">Text Input</option>
                        <option value="textarea">Text Area (long text)</option>
                        <option value="select">Dropdown</option>
                        <option value="radio">Multiple Choice (single selection)</option>
                        <option value="checkbox">Checkboxes (multiple selection)</option>
                        <option value="date">Date</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                      </select>
                    </div>
                  </div>

                  <!-- Options for select, radio or checkbox types -->
                  <div v-if="['select', 'radio', 'checkbox'].includes(question.type)" class="mb-3 p-3">
                    <label class="form-label mb-2">Options</label>
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex"
                      class="d-flex align-items-center mb-2">
                      <input v-model="question.options[optionIndex]" type="text" placeholder="Option text"
                        class="form-control" />
                      <button @click="removeOption(question, optionIndex)" type="button"
                        class="btn btn-link text-danger ms-2" :disabled="question.options.length <= 1">
                        <i class="pi pi-times"></i>
                      </button>
                    </div>

                    <button @click="addOption(question)" type="button" class="btn btn-link text-primary mt-2 small">
                      <i class="pi pi-plus me-1"></i>
                      Add Option
                    </button>
                  </div>

                  <!-- Additional settings -->
                  <div class="d-flex align-items-center gap-3">
                    <label class="d-flex align-items-center mb-0">
                      <input v-model="question.required" type="checkbox" class="form-check-input me-2" />
                      <span class="small text-dark">Required</span>
                    </label>

                    <label v-if="question.type === 'text' || question.type === 'textarea'"
                      class="d-flex align-items-center mb-0">
                      <input v-model="question.hasMaxLength" type="checkbox" class="form-check-input me-2" />
                      <span class="small text-dark">Set max length</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="alert alert-info">
                <h4 class="h6 fw-semibold mb-1">Tips for Creating Questions</h4>
                <ul class="list-disc list-inside small text-info">
                  <li>Keep questions clear and concise</li>
                  <li>Only make questions required if you absolutely need the information</li>
                  <li>Use appropriate question types for the data you're collecting</li>
                  <li>Consider the privacy implications of the data you collect</li>
                </ul>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-4 pt-3 border-top d-flex justify-content-end gap-3">
              <button @click="cancelForm" type="button" class="btn btn-outline-secondary">
                Cancel
              </button>

              <button type="submit" class="btn btn-primary d-flex align-items-center" :disabled="saving">
                <span v-if="!saving">{{ isEditMode ? 'Update Event' : 'Create Event' }}</span>
                <span v-else class="d-flex align-items-center">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.no-border-btn:hover {
  background-color: #e9ecef;
}
</style>
