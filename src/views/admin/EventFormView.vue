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
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <div v-else>
        <!-- Form Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isEditMode ? 'Edit Event' : 'Create New Event' }}
          </h1>
          <p class="text-gray-600 mt-1">
            {{
              isEditMode
                ? 'Update the details of your event'
                : 'Fill out the form to create a new event'
            }}
          </p>
        </div>

        <!-- Form Tabs -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <div class="flex border-b overflow-x-auto">
            <!-- Basic information -->
            <button
              @click="activeTab = 'basic'"
              class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              :class="
                activeTab === 'basic'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              "
            >
              <i class="pi pi-info-circle mr-1"></i>
              Basic Information
            </button>

            <!-- Location -->
            <button
              @click="activeTab = 'location'"
              class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              :class="
                activeTab === 'location'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              "
            >
              <i class="pi pi-map-marker mr-1"></i>
              Location
            </button>

            <!-- Tickets -->
            <button
              @click="activeTab = 'tickets'"
              class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              :class="
                activeTab === 'tickets'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              "
            >
              <i class="pi pi-ticket mr-1"></i>
              Tickets
            </button>

            <!-- Features -->
            <button
              @click="activeTab = 'features'"
              class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              :class="
                activeTab === 'features'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              "
            >
              <i class="pi pi-list mr-1"></i>
              Features
            </button>

            <!-- Questionnaire -->
            <button
              @click="activeTab = 'questionnaire'"
              class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              :class="
                activeTab === 'questionnaire'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              "
            >
              <i class="pi pi-list-alt mr-1"></i>
              Questionnaire
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <form @submit.prevent="saveEvent">
            <!-- Basic Info Tab -->
            <div v-if="activeTab === 'basic'" class="space-y-6">
              <div class="grid grid-cols-1 gap-6">
                <!-- Event Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Event Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="eventForm.name"
                    type="text"
                    placeholder="Enter event name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.name }"
                  />
                  <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
                </div>

                <!-- Event Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Description </label>
                  <textarea
                    v-model="eventForm.description"
                    placeholder="Describe your event"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <!-- Date and Time -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Date <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="eventForm.date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      :class="{ 'border-red-500': errors.date }"
                    />
                    <p v-if="errors.date" class="mt-1 text-xs text-red-500">{{ errors.date }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"> Start Time </label>
                    <input
                      v-model="eventForm.startTime"
                      type="time"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"> End Time </label>
                    <input
                      v-model="eventForm.endTime"
                      type="time"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <!-- Organizer Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"> Organizer </label>
                    <input
                      v-model="eventForm.organizer"
                      type="text"
                      placeholder="Organizing company or person"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Organizer Contact
                    </label>
                    <input
                      v-model="eventForm.organizerContact"
                      type="email"
                      placeholder="Contact email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <!-- Capacity and Status -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Capacity <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="eventForm.capacity"
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      :class="{ 'border-red-500': errors.capacity }"
                    />
                    <p v-if="errors.capacity" class="mt-1 text-xs text-red-500">
                      {{ errors.capacity }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"> Status </label>
                    <select
                      v-model="eventForm.status"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <!-- Image URL -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Image URL </label>
                  <input
                    v-model="eventForm.imageUrl"
                    type="text"
                    placeholder="URL to event image"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    Enter a URL for the event image. For best results, use a 16:9 aspect ratio
                    image.
                  </p>
                </div>
              </div>
            </div>

            <!-- Location Tab -->
            <div v-if="activeTab === 'location'" class="space-y-6">
              <div class="grid grid-cols-1 gap-6">
                <!-- Location Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Venue <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="eventForm.location"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.location }"
                  >
                    <option value="">Select a venue</option>
                    <option v-for="location in locations" :key="location" :value="location">
                      {{ location }}
                    </option>
                    <option value="other">Other (specify below)</option>
                  </select>
                  <p v-if="errors.location" class="mt-1 text-xs text-red-500">
                    {{ errors.location }}
                  </p>
                </div>

                <!-- Address Details -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"> Address </label>
                  <input
                    v-model="eventForm.address"
                    type="text"
                    placeholder="Street address"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <input
                        v-model="eventForm.city"
                        type="text"
                        placeholder="City"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <input
                        v-model="eventForm.state"
                        type="text"
                        placeholder="State"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <input
                        v-model="eventForm.zipCode"
                        type="text"
                        placeholder="Zip Code"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <!-- Location Notes -->
                <div>
                  <p class="text-sm text-gray-500 italic">
                    The address information helps attendees locate your event. It will be displayed
                    on the event details page.
                  </p>
                </div>
              </div>
            </div>

            <!-- Tickets Tab -->
            <div v-if="activeTab === 'tickets'" class="space-y-6">
              <div v-if="errors.tickets" class="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                {{ errors.tickets }}
              </div>

              <div
                v-for="(ticket, index) in ticketTypes"
                :key="ticket.id"
                class="bg-gray-50 p-4 rounded-lg mb-4"
              >
                <div class="flex justify-between items-start mb-4">
                  <h3 class="font-medium text-gray-800">Ticket Type {{ index + 1 }}</h3>
                  <button
                    v-if="ticketTypes.length > 1"
                    @click="removeTicketType(index)"
                    type="button"
                    class="text-red-500 hover:text-red-700"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"> Name </label>
                    <input
                      v-model="ticket.name"
                      type="text"
                      placeholder="e.g. General Admission"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      v-model="ticket.description"
                      type="text"
                      placeholder="Brief description of this ticket type"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"> Price ($) </label>
                    <input
                      v-model="ticket.price"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Quantity Available
                    </label>
                    <input
                      v-model="ticket.quantity"
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  @click="addTicketType"
                  type="button"
                  class="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <i class="pi pi-plus mr-1"></i>
                  Add Another Ticket Type
                </button>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 class="font-medium text-yellow-800 mb-1">Important Note</h4>
                <p class="text-sm text-yellow-700">
                  Make sure the total number of tickets available does not exceed the event
                  capacity. Current capacity: {{ eventForm.capacity }} attendees.
                </p>
              </div>
            </div>

            <!-- Features Tab -->
            <div v-if="activeTab === 'features'" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3"> Event Features </label>
                <p class="text-sm text-gray-500 mb-4">
                  List the key features or highlights of your event that would attract attendees.
                </p>

                <div
                  v-for="(feature, index) in eventForm.features"
                  :key="index"
                  class="flex items-center mb-3"
                >
                  <input
                    v-model="eventForm.features[index]"
                    type="text"
                    placeholder="e.g. Networking opportunities, Free refreshments, etc."
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    @click="removeFeature(index)"
                    type="button"
                    class="ml-2 text-red-500 hover:text-red-700"
                    :disabled="eventForm.features.length <= 1"
                  >
                    <i class="pi pi-times"></i>
                  </button>
                </div>

                <button
                  @click="addFeature"
                  type="button"
                  class="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                >
                  <i class="pi pi-plus mr-1"></i>
                  Add Another Feature
                </button>
              </div>
            </div>

            <!-- Questionnaire Tab -->
            <div v-if="activeTab === 'questionnaire'" class="space-y-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-medium text-gray-800">Registration Questions</h3>
                  <p class="text-sm text-gray-600">
                    Create questions that attendees will answer during registration
                  </p>
                </div>

                <button
                  @click="addQuestion"
                  type="button"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center"
                >
                  <i class="pi pi-plus mr-2"></i>
                  Add Question
                </button>
              </div>

              <!-- Empty state where there is no questions -->
              <div
                v-if="!questions.length"
                class="bg-gray-50 p-8 rounded-lg border-gray-200 text-center"
              >
                <div class="text-gray-500">
                  <i class="pi pi-list-alt"></i>
                </div>

                <h4 class="text-lg font-medium text-gray-700 mb-2">No questions</h4>

                <p class="text-gray-500 mb-4">
                  Add questions to collect information from your attendees during registration
                </p>
                <button
                  @click="addQuestion"
                  type="button"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center"
                >
                  <i class="pi pi-plus mr-2"></i>
                  Add First Question
                </button>
              </div>

              <!-- Question List -->
              <div v-else class="space-y-4">
                <div
                  v-for="(question, index) in questions"
                  :key="question.id"
                  class="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <!-- Question header -->
                  <div class="bg-gray-50 px-4 py-3 flex justify-between items-center border-b">
                    <div class="flex items-center">
                      <i class="pi pi-bars text-gray-400 mr-3 cursor-move"></i>
                      <span class="font-medium text-gray-700"> Question {{ index + 1 }}</span>
                      <span
                        v-if="question.required"
                        class="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full"
                      >
                        Required
                      </span>
                    </div>

                    <div class="flex items-center">
                      <span class="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded mr-2">
                        {{ question.type }}
                      </span>
                      <button
                        @click="removeQuestion(index)"
                        type="button"
                        class="text-red-500 hover:text-red-700"
                      >
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Question content -->
                  <div class="p-4">
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Question Text
                      </label>
                      <input
                        v-model="question.text"
                        type="text"
                        placeholder="Enter your question"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div class="mb-4">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Question Type
                      </label>
                      <select
                        v-model="question.type"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
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
                  <div v-if="['select', 'radio', 'checkbox'].includes(question.type)" class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2"> Options </label>

                    <div
                      v-for="(option, optionIndex) in question.options"
                      :key="optionIndex"
                      class="flex items-center mb-2"
                    >
                      <input
                        v-model="questions.options[optionIndex]"
                        type="text"
                        placeholder="Option text"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button
                        @click="removeOption(question, optIndex)"
                        type="button"
                        class="ml-2, text-red-500 hover:text-red-700"
                        :disabled="question.options.length <= 1"
                      >
                        <i class="pi pi-times"></i>
                      </button>
                    </div>

                    <button
                      @click="addOption(question)"
                      type="button"
                      class="flex items-center text-blue-600 hover:text-blue-800 mt-2 text-sm"
                    >
                      <i class="pi pi-plus mr-1"></i>
                      Add Option
                    </button>
                  </div>

                  <!-- Additional settings -->
                  <div class="flex items-center space-x-6">
                    <label class="flex items-center">
                      <input
                        v-model="question.required"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 rounded"
                      />
                      <span class="ml-2 text-sm text-gray-700">Required</span>
                    </label>

                    <label
                      v-if="question.type === 'text' || question.type === 'textarea'"
                      class="flex items-center"
                    >
                      <input
                        v-model="question.hasMaxLength"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 rounded"
                      />
                      <span class="ml-2 text-sm text-gray-700">Set max length</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-medium text-blue-800 mb-1">Tips for Creating Questions</h4>
                <ul class="list-disc list-inside text-sm text-blue-700 space-y-1">
                  <li>Keep questions clear and concise</li>
                  <li>Only make questions required if you absolutely need the information</li>
                  <li>Use appropriate question types for the data you're collecting</li>
                  <li>Consider the privacy implications of the data you collect</li>
                </ul>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
              <button
                @click="cancelForm"
                type="button"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="saving"
              >
                <span v-if="!saving">{{ isEditMode ? 'Update Event' : 'Create Event' }}</span>
                <div v-else class="flex items-center">
                  <div
                    class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"
                  ></div>
                  Saving...
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
