<template>
  <navbar />
  <!-- Step indicator: Current step is 2 -->
  <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="2" />

  <div class="container mt-4">
    <h2 class="text-center mb-4">Checkout</h2>
    <div class="row">
      <!-- Left: Payment form -->
      <div class="col-md-8">
        <div class="card p-4 mb-4">
          <h4 class="mb-3">Credit / Debit Card</h4>

          <!-- Card Number -->
          <div class="mb-3">
            <label class="form-label">Card number</label>
            <input type="text" class="form-control" v-model="cardNumber" placeholder="1234 1234 1234 1234" />
          </div>

          <!-- Row: Card Type & Card Holder Name -->
          <div class="row">
            <div class="col mb-3">
              <label class="form-label">Card Type</label>
              <input type="text" class="form-control" placeholder="Visa / MasterCard / etc." />
            </div>
            <div class="col mb-3">
              <label class="form-label">Card Holder Name</label>
              <input type="text" class="form-control" placeholder="Name on Card" />
            </div>
          </div>

          <!-- Row: Expiration Date & Security Code -->
          <div class="row">
            <div class="col mb-3">
              <label class="form-label">Expiration Date</label>
              <input type="text" class="form-control" v-model="expiry" placeholder="MM/YY" />
            </div>
            <div class="col mb-3">
              <label class="form-label">Security code</label>
              <input type="text" class="form-control" v-model="cvv" placeholder="CVC" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Address</label>
            <input type="text" class="form-control" placeholder="Street address" />
          </div>

          <div class="row">
            <div class="col mb-3">
              <label class="form-label">City</label>
              <input type="text" class="form-control" placeholder="City" />
            </div>
            <div class="col mb-3">
              <label class="form-label">Suburb</label>
              <input type="text" class="form-control" placeholder="Suburb" />
            </div>
            <div class="col mb-3">
              <label class="form-label">Postcode</label>
              <input type="text" class="form-control" placeholder="0000" />
            </div>
          </div>

          <!-- Save card information -->
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="saveCard" />
            <label class="form-check-label" for="saveCard">
              Save my credit card and billing information for future purchases
            </label>
          </div>

          <!-- Privacy Tips -->
          <p class="small text-muted">
            By continuing, you agree to our <a href="#">Privacy Policy</a>
          </p>

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
          <p v-if="ticketList.length === 0" class="text-muted">No tickets selected</p>
          <!-- Loop through each participant -->
          <div v-for="(ticket, index) in ticketList" :key="index" class="border-bottom pb-2 mb-3">
            <p class="mb-1"><strong>Name:</strong> {{ ticket.name }}</p>
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import StepIndicator from "@/components/StepIndicator.vue";
import navbar from "@/components/navbar.vue";

const router = useRouter();
const route = useRoute();

// Participant data passed from the Review page
const ticketList = ref([]);

const cardNumber = ref("");
const expiry = ref("");
const cvv = ref("");

onMounted(() => {
  if (route.query.tickets) {
    try {
      ticketList.value = JSON.parse(route.query.tickets);
    } catch (error) {
      console.error("Error parsing tickets:", error);
    }
  }
});

// Return the corresponding unit price according to the ticket type (example value)
function getTicketPrice(type) {
  switch (type) {
    case "adultWalk":
      return 45;
    case "childRun":
      return 20;
    case "childWalk":
      return 25;
    default:
      return 0;
  }
}

// Calculate the total amount (one ticket per participant)
const totalCost = computed(() => {
  return ticketList.value.reduce((sum, ticket) => {
    return sum + getTicketPrice(ticket.type);
  }, 0);
});

function confirmOrder() {
  alert("Order Completed! Payment Successful.");
  router.push({ name: "SelectCategory" });
}

function ticketTypeLabel(type) {
  switch (type) {
    case "adultWalk":
      return "2.5KM WALK Adult Ticket";
    case "childRun":
      return "5KM RUN Children's Tickets";
    case "childWalk":
      return "2.5KM WALK Children's Tickets";
    default:
      return "Unknown ticket type";
  }
}
</script>

<style scoped>
.card {
  border-radius: 6px;
  border: 1px solid #ccc;
}
.border-bottom {
  border-bottom: 1px solid #eee;
}
.order-summary {
  position: sticky;
  top: 80px;
  padding: 1rem;
}
</style>
