<template>
  <navbar />
  <!-- Step indicator: Current step is 1 (Complete Info Part 2: Questionnaire) -->
  <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="1" />

  <div class="container mt-4">
    <h4 class="section-title">Questionnaire</h4>

    <form @submit.prevent="goToReview">
      <!-- Fill out the questionnaire for each ticket -->
      <div v-for="(ticket, index) in ticketList" :key="ticket.id" class="card custom-card">
        <h5 class="card-title">
          Participant #{{ index + 1 }} - Questionnaire
        </h5>

        <!-- Example question: Emergency contact information -->
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Emergency Contact Name</label>
            <input type="text" class="form-control" v-model="ticket.survey.emergencyContactName" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Emergency Contact Phone</label>
            <input type="tel" class="form-control" v-model="ticket.survey.emergencyContactPhone" />
          </div>
        </div>

        <!-- Sample question: Do you have special medical needs? -->
        <div class="row g-3 mt-3">
          <div class="col-md-6">
            <label class="form-label">Any medical conditions we should be aware of?</label>
            <select class="form-select" v-model="ticket.survey.hasMedicalCondition">
              <option value="">Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <!-- Sample question: Reasons for participating in the event -->
        <div class="row g-3 mt-3">
          <div class="col-md-12">
            <label class="form-label">Why are you registering for this event?</label>
            <textarea class="form-control" rows="3" v-model="ticket.survey.reason"></textarea>
          </div>
        </div>
      </div>

      <!-- Bottom operation button -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-secondary" @click="goBackToPersonal">Previous</button>
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

// ticketList data passed from the PersonalInfo page
const ticketList = ref([]);

onMounted(() => {
  if (route.query.tickets) {
    try {
      const parsed = JSON.parse(route.query.tickets);
      // Add a survey object to each ticket if it doesn't exist
      ticketList.value = parsed.map(ticket => ({
        ...ticket,
        survey: ticket.survey || {
          emergencyContactName: "",
          emergencyContactPhone: "",
          hasMedicalCondition: "",
          reason: "",
        }
      }));
    } catch (error) {
      console.error("Failed to parse tickets", error);
    }
  } else {
    router.push({ name: "PersonalInfo" });
  }
});

// Jump to the Review page
const goToReview = () => {
  router.push({
    name: "Review",
    query: { tickets: JSON.stringify(ticketList.value) },
  });
};

const goBackToPersonal = () => {
  router.push({
    name: "PersonalInfo",
    query: { tickets: JSON.stringify(ticketList.value) },
  });
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
</style>
