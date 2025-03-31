<template>
  <navbar />
  <!-- Step indicator: Current step is 1 (Complete Info Part 1: Personal information) -->
  <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="0" />

  <div class="container mt-4">
    <h4 class="section-title">YOUR INFORMATION</h4>
    <form @submit.prevent="goToQuestionnaire">
      <!-- Generate a personal information form for each ticket -->
      <div v-for="(ticket, index) in ticketList" :key="ticket.id" class="card custom-card">
        <h5 class="card-title">
          Participant #{{ index + 1 }}
          <span class="ticket-type">({{ ticketTypeLabel(ticket.type) }})</span>
        </h5>

        <!-- Email & Confirm Email -->
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="ticket.email" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Confirm Email</label>
            <input type="email" class="form-control" v-model="ticket.confirmEmail" required />
          </div>
        </div>

        <!-- Name, Gender, DOB -->
        <div class="row g-3 mt-3">
          <div class="col-md-4">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" v-model="ticket.name" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Gender</label>
            <select class="form-select" v-model="ticket.gender" required>
              <option value="" disabled>Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Date of Birth</label>
            <input type="date" class="form-control" v-model="ticket.dob" required />
          </div>
        </div>

        <!-- Phone & Country -->
        <div class="row g-3 mt-3">
          <div class="col-md-6">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-control" v-model="ticket.phone" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Country</label>
            <select class="form-select" v-model="ticket.country" required>
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

        <!-- Address, City, State, Zip -->
        <div class="row g-3 mt-3">
          <div class="col-md-12">
            <label class="form-label">Address</label>
            <input type="text" class="form-control" placeholder="Street Address" v-model="ticket.address" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">City</label>
            <input type="text" class="form-control" v-model="ticket.city" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">State</label>
            <input type="text" class="form-control" v-model="ticket.state" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Zip</label>
            <input type="text" class="form-control" v-model="ticket.zip" required />
          </div>
        </div>

        <!-- ID / Passport -->
        <div class="row g-3 mt-3">
          <div class="col-md-6">
            <label class="form-label">ID/Passport Number</label>
            <input type="text" class="form-control" v-model="ticket.idNumber" required />
          </div>
        </div>

        <!-- For children's tickets: upload proof -->
        <div v-if="ticket.type === 'childRun' || ticket.type === 'childWalk'" class="row g-3 mt-3">
          <div class="col-md-12">
            <label class="form-label">Child ticket certificate (upload document)</label>
            <input type="file" class="form-control" @change="handleFileUpload($event, index)" required />
            <div v-if="ticket.proof" class="upload-status">
              Uploaded: {{ ticket.proof.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom operation button -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-outline-danger" @click="goBack">Start Over</button>
        <button class="btn btn-primary" type="submit">NEXT</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import StepIndicator from "@/components/StepIndicator.vue";
import navbar from "@/components/navbar.vue";

const router = useRouter();
const route = useRoute();

// Build a list of participants based on the number of ticket types passed in from the SelectCategory page
const ticketList = ref([]);

onMounted(() => {
  const childRunCount = parseInt(route.query.childRun || 0);
  const adultWalkCount = parseInt(route.query.adultWalk || 0);
  const childWalkCount = parseInt(route.query.childWalk || 0);
  let currentId = 1;
  // Generate objects according to quantity
  for (let i = 0; i < childRunCount; i++) {
    ticketList.value.push({
      id: currentId++,
      type: "childRun",
      email: "",
      confirmEmail: "",
      name: "",
      gender: "",
      dob: "",
      phone: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      idNumber: "",
      proof: null,
    });
  }
  for (let i = 0; i < adultWalkCount; i++) {
    ticketList.value.push({
      id: currentId++,
      type: "adultWalk",
      email: "",
      confirmEmail: "",
      name: "",
      gender: "",
      dob: "",
      phone: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      idNumber: "",
      proof: null,
    });
  }
  for (let i = 0; i < childWalkCount; i++) {
    ticketList.value.push({
      id: currentId++,
      type: "childWalk",
      email: "",
      confirmEmail: "",
      name: "",
      gender: "",
      dob: "",
      phone: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      idNumber: "",
      proof: null,
    });
  }
});

// Handle file upload
const handleFileUpload = (event, index) => {
  ticketList.value[index].proof = event.target.files[0];
};

const goBack = () => {
  router.push({ name: "SelectCategory" });
};

// After submission, jump to the questionnaire page and serialize the current ticketList
const goToQuestionnaire = () => {
  router.push({
    name: "Questionnaire",
    query: { tickets: JSON.stringify(ticketList.value) },
  });
};

const ticketTypeLabel = (type) => {
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
};
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
.ticket-type {
  font-weight: 400;
  color: #888;
}
.upload-status {
  margin-top: 0.5rem;
  color: #28a745;
}
label.form-label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #444;
}
</style>
