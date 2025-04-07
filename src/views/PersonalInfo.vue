<template>
  <div>
    <navbar />
    <StepIndicator
      :steps="['Select Ticket', 'Complete Info', 'Questionnaire', 'Review', 'Checkout']"
      :currentStep="1"
      @step-clicked="handleStepClick"
    />

    <div class="container mt-4">
      <h4 class="section-title">YOUR INFORMATION</h4>

      <!-- Ticket switch button area -->
      <div class="ticket-tabs mb-3">
        <button
          v-for="(ticket, index) in ticketStore.ticketList"
          :key="ticket.id || index"
          @click="currentTicketIndex = index"
          :class="['btn', currentTicketIndex === index ? 'btn-primary' : 'btn-outline-secondary', 'me-2']"
        >
          Participant #{{ index + 1 }}
          <span v-if="!isTicketComplete(ticket)" class="incomplete-badge">!</span>
        </button>
      </div>

      <form @submit.prevent="goToQuestionnaire">
        <!-- Show only the currently selected ticket form -->
        <div class="card custom-card">
          <h5 class="card-title">
            Participant #{{ currentTicketIndex + 1 }} - {{ ticketTypeLabel(currentTicket.type) }}
          </h5>

          <!-- For adult tickets -->
          <div v-if="currentTicket.type === 'adultWalk'">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="currentTicket.email" required />
                <small v-if="currentTicket.errors.email" class="text-danger">
                  {{ currentTicket.errors.email }}
                </small>
              </div>
            </div>
            <div class="row g-3 mt-3">
              <div class="col-md-4">
                <label class="form-label">First Name</label>
                <input type="text" class="form-control" v-model="currentTicket.firstName" required />
                <small v-if="currentTicket.errors.firstName" class="text-danger">
                  {{ currentTicket.errors.firstName }}
                </small>
              </div>
              <div class="col-md-4">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-control" v-model="currentTicket.lastName" required />
                <small v-if="currentTicket.errors.lastName" class="text-danger">
                  {{ currentTicket.errors.lastName }}
                </small>
              </div>
              <div class="col-md-4">
                <label class="form-label">Date of Birth</label>
                <input type="date" class="form-control" v-model="currentTicket.dateOfBirth" required />
                <small v-if="currentTicket.errors.dateOfBirth" class="text-danger">
                  {{ currentTicket.errors.dateOfBirth }}
                </small>
              </div>
            </div>
          </div>

          <!-- For children's tickets -->
          <div v-else-if="currentTicket.type === 'childRun' || currentTicket.type === 'childWalk'">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Parent/Guardian Email</label>
                <input type="email" class="form-control" v-model="currentTicket.email" required />
                <small v-if="currentTicket.errors.email" class="text-danger">
                  {{ currentTicket.errors.email }}
                </small>
              </div>
            </div>
            <div class="row g-3 mt-3">
              <div class="col-md-4">
                <label class="form-label">Child's First Name</label>
                <input type="text" class="form-control" v-model="currentTicket.firstName" required />
                <small v-if="currentTicket.errors.firstName" class="text-danger">
                  {{ currentTicket.errors.firstName }}
                </small>
              </div>
              <div class="col-md-4">
                <label class="form-label">Child's Last Name</label>
                <input type="text" class="form-control" v-model="currentTicket.lastName" required />
                <small v-if="currentTicket.errors.lastName" class="text-danger">
                  {{ currentTicket.errors.lastName }}
                </small>
              </div>
              <div class="col-md-4">
                <label class="form-label">Date of Birth</label>
                <input type="date" class="form-control" v-model="currentTicket.dateOfBirth" required />
                <small v-if="currentTicket.errors.dateOfBirth" class="text-danger">
                  {{ currentTicket.errors.dateOfBirth }}
                </small>
              </div>
            </div>
            <div class="row g-3 mt-3">
              <div class="col-md-12">
                <label class="form-label">Child ticket certificate (upload document)</label>
                <input type="file" class="form-control" @change="handleFileUpload($event, currentTicketIndex)" required />
                <div v-if="currentTicket.proof" class="upload-status">
                  Uploaded: {{ currentTicket.proof.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Public information: phone, country, address, etc. -->
          <div class="row g-3 mt-3">
            <div class="col-md-6">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-control" v-model="currentTicket.phoneNumber" required />
              <small v-if="currentTicket.errors.phoneNumber" class="text-danger">
                {{ currentTicket.errors.phoneNumber }}
              </small>
            </div>
            <div class="col-md-6">
              <label class="form-label">Country</label>
              <select class="form-select" v-model="currentTicket.country" required>
                <option value="" disabled>Please select</option>
                <option>United States</option>
                <option>Australia</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>China</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mt-3">
            <div class="col-md-12">
              <label class="form-label">Address</label>
              <input type="text" class="form-control" placeholder="Street Address" v-model="currentTicket.address" required />
            </div>
            <div class="col-md-4">
              <label class="form-label">City</label>
              <input type="text" class="form-control" v-model="currentTicket.city" required />
            </div>
            <div class="col-md-4">
              <label class="form-label">State</label>
              <input type="text" class="form-control" v-model="currentTicket.state" required />
            </div>
            <div class="col-md-4">
              <label class="form-label">Zip Code</label>
              <input type="text" class="form-control" v-model="currentTicket.zipCode" required />
              <small v-if="currentTicket.errors.zipCode" class="text-danger">
                {{ currentTicket.errors.zipCode }}
              </small>
            </div>
          </div>
        </div>

        <!-- Bottom buttons -->
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-outline-danger" @click="goBack">Start Over</button>
          <button class="btn btn-primary" type="submit">NEXT</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/store/ticketStore'
import StepIndicator from '@/components/StepIndicator.vue'
import navbar from '@/components/navbar.vue'

const router = useRouter()
const ticketStore = useTicketStore()

// Index of tickets currently being edited
const currentTicketIndex = ref(0)
const currentTicket = computed(() => ticketStore.ticketList[currentTicketIndex.value])

// Determine whether a ticket is fully filled out (simple judgement of the presence of required fields only)
const isTicketComplete = (ticket) => {
  return (
    ticket.email?.trim() &&
    ticket.firstName?.trim() &&
    ticket.lastName?.trim() &&
    ticket.dateOfBirth &&
    ticket.phoneNumber?.trim() &&
    ticket.zipCode?.trim()
  )
}

const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  ticketStore.ticketList[index].proof = file
}

const goBack = () => {
  router.push({ name: 'SelectCategory' })
}

// Verify that all ticket information is completely filled out
const validateForm = () => {
  let isValid = true
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const zipPattern = /^[0-9]{5}$/
  const phonePattern = /^[0-9]{10,15}$/

  ticketStore.ticketList.forEach(ticket => {
    ticket.errors = {}

    if (!emailPattern.test(ticket.email)) {
      ticket.errors.email = 'Incorrect mailbox format'
      isValid = false
    }
    if (!ticket.firstName.trim()) {
      ticket.errors.firstName = 'First name cannot be empty'
      isValid = false
    }
    if (!ticket.lastName.trim()) {
      ticket.errors.lastName = 'Last name cannot be empty'
      isValid = false
    }
    if (!phonePattern.test(ticket.phoneNumber)) {
      ticket.errors.phoneNumber = 'Phone number must be 10 to 15 digits'
      isValid = false
    }
    if (!zipPattern.test(ticket.zipCode)) {
      ticket.errors.zipCode = 'Zip Code must be 5 digits'
      isValid = false
    }
    if (!ticket.dateOfBirth) {
      ticket.errors.dateOfBirth = 'Date of birth cannot be empty'
      isValid = false
    } else {
      const dob = new Date(ticket.dateOfBirth)
      const today = new Date()
      if (dob >= today) {
        ticket.errors.dateOfBirth = 'Date of birth must be before today'
        isValid = false
      } else {
        const age = Math.floor((today - dob) / (365.25 * 24 * 3600 * 1000))
        if (age < 1 || age > 120) {
          ticket.errors.dateOfBirth = 'Please enter a valid age (1-120 years)'
          isValid = false
        }
        if (ticket.type === 'adultWalk' && age < 14) {
          ticket.errors.dateOfBirth = 'Adult tickets require 14 years or older'
          isValid = false
        }
        if ((ticket.type === 'childRun' || ticket.type === 'childWalk') && age >= 14) {
          ticket.errors.dateOfBirth = 'Child tickets require age below 14 years'
          isValid = false
        }
      }
    }
  })

  return isValid
}

const goToQuestionnaire = () => {
  if (validateForm()) {
    router.push({ name: 'Questionnaire' })
  } else {
    alert('Please fix the errors in all participant forms before submitting.')
  }
}

const ticketTypeLabel = (type) => {
  switch (type) {
    case 'adultWalk':
      return '2.5KM WALK Adult Ticket'
    case 'childRun':
      return "5KM RUN Children's Ticket"
    case 'childWalk':
      return "2.5KM WALK Children's Ticket"
    default:
      return 'Unknown ticket type'
  }
}
</script>

<style scoped>
.custom-card {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #fff;
}
.section-title {
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
}
.card-title {
  font-weight: 700;
  margin-bottom: 1rem;
  color: #555;
}
.text-danger {
  font-size: 0.875rem;
}
.upload-status {
  margin-top: 0.5rem;
  color: #28a745;
}
.ticket-tabs {
  margin-bottom: 1rem;
}
.incomplete-badge {
  color: red;
  margin-left: 5px;
  font-weight: bold;
}
</style>
