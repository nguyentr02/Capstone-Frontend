<template>
  <div>
    <navbar />

    <StepIndicator
      :steps="['Select Ticket', 'Complete Info', 'Questionnaire', 'Review', 'Checkout']"
      :currentStep="currentStep"
      @step-clicked="handleStepClick"
    />

    <div class="container mt-5">
      <h2 class="fw-bold mb-4">2024 NIKE MELBOURNE MARATHON FESTIVAL</h2>

      <!-- Example: Displaying ticket type information -->
      <div class="mb-5">
        <h4 class="mb-3"><strong>11:30AM | BIG M 5KM RUN</strong></h4>
        <!-- Child (5KM RUN) -->
        <div class="d-flex justify-content-between align-items-start border-bottom py-3">
          <div>
            <p class="fw-bold mb-1">Child (5KM RUN)</p>
            <p class="mb-0 text-secondary small">
              Ages 16 and under as of 10/3/2024<br />
              Australia residents only
            </p>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm" @click="decrement('childRun')">-</button>
            <input
              type="number"
              v-model.number="ticketStore.ticketCounts.childRun"
              min="0"
              class="form-control text-center mx-2"
              style="width: 60px;"
            />
            <button class="btn btn-outline-secondary btn-sm" @click="increment('childRun')">+</button>
          </div>
        </div>
      </div>

      <!-- Other tickets: Adult 2.5KM WALK and Child (2.5KM WALK) -->
      <div class="mb-5">
        <h4 class="mb-3"><strong>12:00PM | CHOBANI FIT 2.5KM WALK</strong></h4>
        <!-- Adult (2.5KM WALK) -->
        <div class="d-flex justify-content-between align-items-start border-bottom py-3">
          <div>
            <p class="fw-bold mb-1">Adult (2.5KM WALK)</p>
            <p class="mb-0 text-secondary small">Ages 17 and over</p>
          </div>
          <div class="d-flex align-items-center">
            <span class="me-2 text-primary fw-bold">AUD 45.00</span>
            <button class="btn btn-outline-secondary btn-sm" @click="decrement('adultWalk')">-</button>
            <input
              type="number"
              v-model.number="ticketStore.ticketCounts.adultWalk"
              min="0"
              class="form-control text-center mx-2"
              style="width: 60px;"
            />
            <button class="btn btn-outline-secondary btn-sm" @click="increment('adultWalk')">+</button>
          </div>
        </div>

        <!-- Child (2.5KM WALK) -->
        <div class="d-flex justify-content-between align-items-start border-bottom py-3">
          <div>
            <p class="fw-bold mb-1">Child (2.5KM WALK)</p>
            <p class="mb-0 text-secondary small">Ages 16 and under</p>
          </div>
          <div class="d-flex align-items-center">
            <span class="me-2 text-primary fw-bold">AUD 25.00</span>
            <button class="btn btn-outline-secondary btn-sm" @click="decrement('childWalk')">-</button>
            <input
              type="number"
              v-model.number="ticketStore.ticketCounts.childWalk"
              min="0"
              class="form-control text-center mx-2"
              style="width: 60px;"
            />
            <button class="btn btn-outline-secondary btn-sm" @click="increment('childWalk')">+</button>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="text-end mb-5">
        <button
          class="btn btn-primary px-4"
          :disabled="totalTickets === 0"
          @click="nextStep"
        >
          Next step
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/store/ticketStore'
import StepIndicator from '@/components/StepIndicator.vue'
import navbar from '@/components/navbar.vue'

const router = useRouter()
const ticketStore = useTicketStore()

// Steps that have been completed on the current page, ensuring that users cannot click ahead to future steps.
// For this page, assume currentStep is 0 (i.e., no previous step has been completed and the user cannot go back to the previous step).
const currentStep = 0

// Define the mapping of step indexes and route names, adapted to the actual project routing configuration
const stepRoutes = {
  0: 'SelectCategory', 
  1: 'PersonalInfo',
  2: 'Questionnaire',
  3: 'Review',
  4: 'Checkout'
}

// When the step indicator is clicked
const handleStepClick = (clickedStep) => {
  // Allows to return the completed step only if the clicked step index is less than the currentStep of the current page
  if (clickedStep < currentStep) {
    const routeName = stepRoutes[clickedStep]
    if (routeName) {
      router.push({ name: routeName })
    } else {
      console.warn(`未找到步骤 ${clickedStep} 对应的路由名称`)
    }
  }
}

// Calculation of the total number of votes
const totalTickets = computed(() => {
  const counts = ticketStore.ticketCounts
  return counts.childRun + counts.adultWalk + counts.childWalk
})

const increment = (type) => {
  ticketStore.ticketCounts[type]++
}
const decrement = (type) => {
  if (ticketStore.ticketCounts[type] > 0) {
    ticketStore.ticketCounts[type]--
  }
}

const nextStep = () => {
  // Generate default ticket data and jump to the next page
  ticketStore.generateTickets()
  router.push({ name: 'PersonalInfo' })
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #ddd !important;
}
</style>
