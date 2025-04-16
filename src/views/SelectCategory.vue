<template>
  <navbar />
  <!-- Step indicator: current step is 0 -->
  <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="0" />

  <div class="container mt-5">
    <!-- Page Title -->
    <h2 class="fw-bold mb-4">2024 NIKE MELBOURNE MARATHON FESTIVAL</h2>

    <!-- 项目1：11:30AM | BIG M 5KM RUN -->
    <div class="mb-5">
      <h4 class="mb-3"><strong>11:30AM | BIG M 5KM RUN</strong></h4>

      <!-- Adult：SOLD OUT -->
      <div class="d-flex justify-content-between align-items-start border-bottom py-3">
        <div>
          <p class="fw-bold mb-1">Adult</p>
          <p class="mb-0 text-secondary small">
            Ages 17 and over as of 10/3/2024<br />
            Australia residents only
          </p>
        </div>
        <div>
          <span class="badge bg-danger">SOLD OUT</span>
        </div>
      </div>

      <!-- International Participant：SOLD OUT -->
      <div class="d-flex justify-content-between align-items-start border-bottom py-3">
        <div>
          <p class="fw-bold mb-1">International Participant</p>
          <p class="mb-0 text-secondary small">
            Collect your Race Bib from the Race Week Office
          </p>
        </div>
        <div>
          <span class="badge bg-danger">SOLD OUT</span>
        </div>
      </div>

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
          <button class="btn btn-outline-secondary btn-sm" @click="decrementChildRun">-</button>
          <input
            type="number"
            v-model.number="tickets.childRun"
            min="0"
            class="form-control text-center mx-2"
            style="width: 60px;"
          />
          <button class="btn btn-outline-secondary btn-sm" @click="incrementChildRun">+</button>
        </div>
      </div>
    </div>

    <!-- 项目2：12:00PM | CHOBANI FIT 2.5KM WALK -->
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
          <button class="btn btn-outline-secondary btn-sm" @click="decrementAdultWalk">-</button>
          <input
            type="number"
            v-model.number="tickets.adultWalk"
            min="0"
            class="form-control text-center mx-2"
            style="width: 60px;"
          />
          <button class="btn btn-outline-secondary btn-sm" @click="incrementAdultWalk">+</button>
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
          <button class="btn btn-outline-secondary btn-sm" @click="decrementChildWalk">-</button>
          <input
            type="number"
            v-model.number="tickets.childWalk"
            min="0"
            class="form-control text-center mx-2"
            style="width: 60px;"
          />
          <button class="btn btn-outline-secondary btn-sm" @click="incrementChildWalk">+</button>
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import StepIndicator from "@/components/StepIndicator.vue";
import navbar from "@/components/navbar.vue";

const router = useRouter();
const tickets = ref({
  childRun: 0,    // 5KM RUN Number of children's tickets
  adultWalk: 0,   // 2.5KM WALK Number of audlt's tickets
  childWalk: 0,   // 2.5KM WALK Number of children's tickets
});

// Calculate the total number of votes
const totalTickets = computed(() => {
  return tickets.value.childRun + tickets.value.adultWalk + tickets.value.childWalk;
});

// Click "Next" to pass the ticket type quantity to the next step (PersonalInfo)
const nextStep = () => {
  router.push({
    name: "PersonalInfo",
    query: {
      childRun: tickets.value.childRun,
      adultWalk: tickets.value.adultWalk,
      childWalk: tickets.value.childWalk,
    },
  });
};

// Addition and subtraction logic
const incrementChildRun = () => {
  tickets.value.childRun++;
};
const decrementChildRun = () => {
  if (tickets.value.childRun > 0) tickets.value.childRun--;
};

const incrementAdultWalk = () => {
  tickets.value.adultWalk++;
};
const decrementAdultWalk = () => {
  if (tickets.value.adultWalk > 0) tickets.value.adultWalk--;
};

const incrementChildWalk = () => {
  tickets.value.childWalk++;
};
const decrementChildWalk = () => {
  if (tickets.value.childWalk > 0) tickets.value.childWalk--;
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #ddd !important;
}
</style>
