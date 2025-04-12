<!-- src/views/Checkout.vue -->
<template>
  <div>
    <navbar />
    <StepIndicator
      :steps="['Select Ticket', 'Complete Info', 'Questionnaire', 'Review', 'Checkout']"
      :currentStep="currentStep"
      @step-clicked="handleStepClick"
    />

    <div class="container mt-4">
      <h2 class="text-center mb-4">Checkout</h2>
      <div class="row">
        <!-- Left: Payment form -->
        <div class="col-md-8">
          <div class="card p-4 mb-4">
            <h4 class="mb-3">Credit / Debit Card</h4>
            <!-- card number -->
            <div class="mb-3">
              <label class="form-label">Card number</label>
              <input
                type="text"
                class="form-control"
                v-model="cardNumber"
                placeholder="1234 1234 1234 1234"
              />
              <div v-if="errorMessages.cardNumber" class="text-danger">
                {{ errorMessages.cardNumber }}
              </div>
            </div>
            <!-- Card Type & Cardholder Name -->
            <div class="row">
              <div class="col mb-3">
                <label class="form-label">Card Type</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="cardType"
                  placeholder="Visa / MasterCard / etc."
                />
                <div v-if="errorMessages.cardType" class="text-danger">
                  {{ errorMessages.cardType }}
                </div>
              </div>
              <div class="col mb-3">
                <label class="form-label">Card Holder Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="cardHolderName"
                  placeholder="Name on Card"
                />
                <div v-if="errorMessages.cardHolderName" class="text-danger">
                  {{ errorMessages.cardHolderName }}
                </div>
              </div>
            </div>
            <!-- Expiry time & CVV -->
            <div class="row">
              <div class="col mb-3">
                <label class="form-label">Expiration Date</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="expiry"
                  placeholder="MM/YY"
                />
                <div v-if="errorMessages.expiry" class="text-danger">
                  {{ errorMessages.expiry }}
                </div>
              </div>
              <div class="col mb-3">
                <label class="form-label">Security code</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="cvv"
                  placeholder="CVC"
                />
                <div v-if="errorMessages.cvv" class="text-danger">
                  {{ errorMessages.cvv }}
                </div>
              </div>
            </div>
            <!-- address -->
            <div class="mb-3">
              <label class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                v-model="address"
                placeholder="Street address"
              />
              <div v-if="errorMessages.address" class="text-danger">
                {{ errorMessages.address }}
              </div>
            </div>
            <!-- City, Suburb, Postcode -->
            <div class="row">
              <div class="col mb-3">
                <label class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="city"
                  placeholder="City"
                />
                <div v-if="errorMessages.city" class="text-danger">
                  {{ errorMessages.city }}
                </div>
              </div>
              <div class="col mb-3">
                <label class="form-label">Suburb</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="suburb"
                  placeholder="Suburb"
                />
                <div v-if="errorMessages.suburb" class="text-danger">
                  {{ errorMessages.suburb }}
                </div>
              </div>
              <div class="col mb-3">
                <label class="form-label">Postcode</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="postcode"
                  placeholder="0000"
                />
                <div v-if="errorMessages.postcode" class="text-danger">
                  {{ errorMessages.postcode }}
                </div>
              </div>
            </div>
            <!-- Save card information -->
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="saveCard" />
              <label class="form-check-label" for="saveCard">
                Save my credit card and billing information for future purchases
              </label>
            </div>
            <!-- Privacy Notice -->
            <p class="small text-muted">
              By continuing, you agree to our <a href="#">Privacy Policy</a>
            </p>
            <!-- Payment authorisation -->
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="allowPayment"
                v-model="paymentAllowed"
              />
              <label class="form-check-label" for="allowPayment">
                I authorize this payment
              </label>
              <div v-if="errorMessages.paymentAllowed" class="text-danger">
                {{ errorMessages.paymentAllowed }}
              </div>
            </div>
            <!-- Submit button -->
            <div class="text-end">
              <button class="btn btn-success" @click="confirmOrder">
                Complete Order
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div class="col-md-4">
          <div class="card p-4 order-summary">
            <h4 class="mb-3">Order Summary</h4>
            <p v-if="ticketStore.ticketList.length === 0" class="text-muted">No tickets selected</p>
            <div
              v-for="(ticket, index) in ticketStore.ticketList"
              :key="index"
              class="border-bottom pb-2 mb-3"
            >
              <p class="mb-1">
                <strong>Name:</strong> {{ ticket.firstName }} {{ ticket.lastName || '' }}
              </p>
              <p class="mb-1">
                <strong>Type:</strong> {{ ticketTypeLabel(ticket.type) }}
              </p>
              <p class="mb-1">
                <strong>Cost:</strong> ${{ getTicketPrice(ticket.type).toFixed(2) }}
              </p>
            </div>

            <hr />
            <p class="fw-bold mb-0">
              Total: ${{ totalCost.toFixed(2) }}
            </p>
          </div>
        </div>
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

// step completed on the current page (step index 4 on the Checkout page)
// Only allow users to click on completed steps that are smaller than the current page.
const currentStep = 4

// Unified step routing mapping, adjusted according to the actual project routing configuration
const stepRoutes = {
  0: 'SelectCategory',
  1: 'PersonalInfo',
  2: 'Questionnaire',
  3: 'Review',
  4: 'Checkout'
}

// Handling step click events: jumps are performed only if the step index clicked is less than currentStep
const handleStepClick = (stepIndex) => {
  if (stepIndex < currentStep) {
    const targetRoute = stepRoutes[stepIndex]
    if (targetRoute) {
      router.push({ name: targetRoute })
    } else {
      console.warn(`No route defined for step ${stepIndex}`)
    }
  }
}

// Payment form fields
const cardNumber = ref("")
const cardType = ref("")
const cardHolderName = ref("")
const expiry = ref("")
const cvv = ref("")
const address = ref("")
const city = ref("")
const suburb = ref("")
const postcode = ref("")
const paymentAllowed = ref(false)

// error message object (computing)
const errorMessages = ref({
  cardNumber: "",
  cardType: "",
  cardHolderName: "",
  expiry: "",
  cvv: "",
  address: "",
  city: "",
  suburb: "",
  postcode: "",
  paymentAllowed: ""
})

// Example fare method
function getTicketPrice(type) {
  switch (type) {
    case "adultWalk": return 45
    case "childRun": return 20
    case "childWalk": return 25
    default: return 0
  }
}

// Calculation of the total amount
const totalCost = computed(() => {
  return ticketStore.ticketList.reduce((sum, ticket) => {
    return sum + getTicketPrice(ticket.type)
  }, 0)
})

function ticketTypeLabel(type) {
  switch (type) {
    case "adultWalk": return "2.5KM WALK Adult Ticket"
    case "childRun": return "5KM RUN Children's Ticket"
    case "childWalk": return "2.5KM WALK Children's Ticket"
    default: return "Unknown ticket type"
  }
}

function confirmOrder() {
  // Clear the error message
  errorMessages.value = {
    cardNumber: "",
    cardType: "",
    cardHolderName: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    suburb: "",
    postcode: "",
    paymentAllowed: ""
  }

  let valid = true

  const cardNumClean = cardNumber.value.replace(/\s+/g, "")
  if (!/^\d{16}$/.test(cardNumClean)) {
    errorMessages.value.cardNumber = "Please enter a valid 16-digit card number."
    valid = false
  }
  if (cardType.value.trim() === "") {
    errorMessages.value.cardType = "Card type is required."
    valid = false
  }
  if (cardHolderName.value.trim() === "") {
    errorMessages.value.cardHolderName = "Card holder name is required."
    valid = false
  } else if (/^\d+$/.test(cardHolderName.value.trim())) {
    errorMessages.value.cardHolderName = "Card holder name cannot consist solely of digits."
    valid = false
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry.value)) {
    errorMessages.value.expiry = "Please enter a valid expiry date in MM/YY format."
    valid = false
  } else {
    const [monthStr, yearStr] = expiry.value.split("/")
    const month = parseInt(monthStr)
    const year = parseInt(yearStr)
    if (month < 1 || month > 12) {
      errorMessages.value.expiry = "Expiry month must be between 01 and 12."
      valid = false
    } else {
      const now = new Date()
      const currentYear = now.getFullYear() % 100
      const currentMonth = now.getMonth() + 1
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errorMessages.value.expiry = "The card has expired."
        valid = false
      }
    }
  }
  if (!/^\d{3,4}$/.test(cvv.value)) {
    errorMessages.value.cvv = "Please enter a valid 3 or 4 digit CVV."
    valid = false
  }
  if (address.value.trim() === "") {
    errorMessages.value.address = "Address is required."
    valid = false
  }
  if (city.value.trim() === "") {
    errorMessages.value.city = "City is required."
    valid = false
  } else if (/^\d+$/.test(city.value.trim())) {
    errorMessages.value.city = "City cannot consist solely of digits."
    valid = false
  }
  if (suburb.value.trim() === "") {
    errorMessages.value.suburb = "Suburb is required."
    valid = false
  } else if (/^\d+$/.test(suburb.value.trim())) {
    errorMessages.value.suburb = "Suburb cannot consist solely of digits."
    valid = false
  }
  if (!/^\d{4,5}$/.test(postcode.value)) {
    errorMessages.value.postcode = "Please enter a valid postcode (4 or 5 digits)."
    valid = false
  }
  if (!paymentAllowed.value) {
    errorMessages.value.paymentAllowed = "You must authorize the payment to complete the order."
    valid = false
  }

  if (valid) {
    alert("Order Completed! Payment Successful.")
    router.push({ name: 'SelectCategory' })
  }
}
</script>

<style scoped>
.card {
  border-radius: 6px;
  border: 1px solid #ccc;
}
.order-summary {
  position: sticky;
  top: 80px;
  padding: 1rem;
}
.text-danger {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
