<template>
  <div>
    <navbar />
    <StepIndicator
      :steps="['Select Ticket', 'Complete Info', 'Questionnaire', 'Review', 'Checkout']"
      :currentStep="3"
    />

    <div class="container mt-4">
      <h4 class="section-title">Review Your Information</h4>

      <!-- Ticket switch button area -->
      <div class="ticket-tabs mb-3">
        <button
          v-for="(ticket, index) in ticketStore.ticketList"
          :key="ticket.id || index"
          @click="currentTicketIndex = index"
          :class="['btn', currentTicketIndex === index ? 'btn-primary' : 'btn-outline-secondary', 'me-2']"
        >
          Participant #{{ index + 1 }}
        </button>
      </div>

      <!-- Show preview of currently selected ticket only -->
      <div class="card custom-card preview-card">
        <div class="d-flex justify-content-between align-items-center preview-header">
          <h5>
            Participant #{{ currentTicketIndex + 1 }}
            <span class="ticket-type">({{ ticketTypeLabel(currentTicket.type) }})</span>
          </h5>
        </div>
        <div class="row preview-row">
          <div class="col-md-6"><strong>Email:</strong> {{ currentTicket.email }}</div>
          <div class="col-md-6">
            <strong>Full Name:</strong> {{ currentTicket.firstName }} {{ currentTicket.lastName }}
          </div>
          <div class="col-md-6">
            <strong>Date of Birth:</strong> {{ currentTicket.dateOfBirth }}
          </div>
          <div class="col-md-6">
            <strong>Phone:</strong> {{ currentTicket.phoneNumber }}
          </div>
          <div class="col-md-6">
            <strong>Country:</strong> {{ currentTicket.country }}
          </div>
          <div class="col-md-12">
            <strong>Address:</strong> {{ currentTicket.address }}
          </div>
          <div class="col-md-6">
            <strong>City:</strong> {{ currentTicket.city }}
          </div>
          <div class="col-md-3">
            <strong>State:</strong> {{ currentTicket.state }}
          </div>
          <div class="col-md-3">
            <strong>Zip Code:</strong> {{ currentTicket.zipCode }}
          </div>
          <div
            v-if="currentTicket.type === 'childRun' || currentTicket.type === 'childWalk'"
            class="col-md-12 mt-2"
          >
            <strong>Child ticket certificate:</strong>
            {{ currentTicket.proof ? currentTicket.proof.name : 'Not Uploaded' }}
          </div>
          <div class="col-md-6 mt-3">
            <strong>Emergency Contact Name:</strong>
            {{ currentTicket.survey?.emergencyContactName || '' }}
          </div>
          <div class="col-md-6 mt-3">
            <strong>Emergency Contact Phone:</strong>
            {{ currentTicket.survey?.emergencyContactPhone || '' }}
          </div>
          <div class="col-md-6 mt-3">
            <strong>Medical Condition:</strong>
            {{ currentTicket.survey?.hasMedicalCondition || '' }}
          </div>
          <div class="col-md-12 mt-3">
            <strong>Reason:</strong> {{ currentTicket.survey?.reason || '' }}
          </div>
        </div>
      </div>

      <!-- Bottom operating buttons -->
      <div class="d-flex justify-content-between mt-4">
        <div>
          <button class="btn btn-warning me-2" @click="goBackToQuestionnaire">
            Return to edit questionnaire
          </button>
          <button class="btn btn-info" @click="goBackToPersonalInfo">
            Return to modify personal information
          </button>
        </div>
        <button class="btn btn-success" @click="goToCheckout">
          Submit and Continue (Checkout)
        </button>
      </div>
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

// Index of tickets currently being previewed
const currentTicketIndex = ref(0)
const currentTicket = computed(() => ticketStore.ticketList[currentTicketIndex.value])

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

const goBackToQuestionnaire = () => {
  router.push({ name: 'Questionnaire' })
}

const goBackToPersonalInfo = () => {
  router.push({ name: 'PersonalInfo' })
}

const goToCheckout = () => {
  // The ticketStore.ticketList can be filtered before submission.
  router.push({ name: 'Checkout' })
}
</script>

<style scoped>
.custom-card {
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #fff;
}
.preview-header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
.preview-row > div {
  margin-bottom: 0.5rem;
}
.section-title {
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
}
.ticket-type {
  font-weight: 400;
  color: #888;
}

/* Ticket switch button area */
.ticket-tabs {
  margin-bottom: 1rem;
}
</style>
