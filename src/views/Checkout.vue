<template> 
  <div>
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

            <!-- Row: Card Type & Card Holder Name -->
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

            <!-- Row: Expiration Date & Security Code -->
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

            <!-- Address -->
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

            <!-- Row: City, Suburb & Postcode -->
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

            <!-- Privacy Tips -->
            <p class="small text-muted">
              By continuing, you agree to our <a href="#">Privacy Policy</a>
            </p>

            <!-- Payment Authorization -->
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
            <p v-if="ticketList.length === 0" class="text-muted">No tickets selected</p>
            <!-- Loop through each participant -->
            <div
              v-for="(ticket, index) in ticketList"
              :key="index"
              class="border-bottom pb-2 mb-3"
            >
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import StepIndicator from "@/components/StepIndicator.vue";
import navbar from "@/components/navbar.vue";

const router = useRouter();
const route = useRoute();

// Participant data passed from the Review page
const ticketList = ref([]);

const cardNumber = ref("");
const cardType = ref("");
const cardHolderName = ref("");
const expiry = ref("");
const cvv = ref("");
const address = ref("");
const city = ref("");
const suburb = ref("");
const postcode = ref("");
const paymentAllowed = ref(false);

// Error messages for each field
const errorMessages = reactive({
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
});

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

// Validate the payment form and confirm the order
function confirmOrder() {
  // Clear previous error messages
  errorMessages.cardNumber = "";
  errorMessages.cardType = "";
  errorMessages.cardHolderName = "";
  errorMessages.expiry = "";
  errorMessages.cvv = "";
  errorMessages.address = "";
  errorMessages.city = "";
  errorMessages.suburb = "";
  errorMessages.postcode = "";
  errorMessages.paymentAllowed = "";

  let valid = true;

  // Validate card number: remove spaces and ensure 16 digits
  const cardNumClean = cardNumber.value.replace(/\s+/g, "");
  if (!/^\d{16}$/.test(cardNumClean)) {
    errorMessages.cardNumber = "Please enter a valid 16-digit card number.";
    valid = false;
  }

  // Validate card type
  if (cardType.value.trim() === "") {
    errorMessages.cardType = "Card type is required.";
    valid = false;
  }

  // Validate card holder name
  if (cardHolderName.value.trim() === "") {
    errorMessages.cardHolderName = "Card holder name is required.";
    valid = false;
  }

  // Validate expiry date: must be in MM/YY format and not expired
  if (!/^\d{2}\/\d{2}$/.test(expiry.value)) {
    errorMessages.expiry = "Please enter a valid expiry date in MM/YY format.";
    valid = false;
  } else {
    const [monthStr, yearStr] = expiry.value.split("/");
    const month = parseInt(monthStr);
    const year = parseInt(yearStr);
    if (month < 1 || month > 12) {
      errorMessages.expiry = "Expiry month must be between 01 and 12.";
      valid = false;
    } else {
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errorMessages.expiry = "The card has expired.";
        valid = false;
      }
    }
  }

  // Validate CVV: must be 3 or 4 digits
  if (!/^\d{3,4}$/.test(cvv.value)) {
    errorMessages.cvv = "Please enter a valid 3 or 4 digit CVV.";
    valid = false;
  }

  // Validate address
  if (address.value.trim() === "") {
    errorMessages.address = "Address is required.";
    valid = false;
  }

  // Validate city
  if (city.value.trim() === "") {
    errorMessages.city = "City is required.";
    valid = false;
  }

  // Validate suburb
  if (suburb.value.trim() === "") {
    errorMessages.suburb = "Suburb is required.";
    valid = false;
  }

  // Validate postcode: must be 4 or 5 digits
  if (!/^\d{4,5}$/.test(postcode.value)) {
    errorMessages.postcode = "Please enter a valid postcode (4 or 5 digits).";
    valid = false;
  }

  // Validate payment authorization checkbox
  if (!paymentAllowed.value) {
    errorMessages.paymentAllowed = "You must authorize the payment to complete the order.";
    valid = false;
  }

  if (valid) {
    alert("Order Completed! Payment Successful.");
    router.push({ name: "SelectCategory" });
  }
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
.text-danger {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
