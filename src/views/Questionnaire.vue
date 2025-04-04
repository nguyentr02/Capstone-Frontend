<template>
  <div>
    <navbar />
    <!-- Step indicator: Current step is 1 (Complete Info Part 2: Questionnaire) -->
    <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="1" />

    <div class="container mt-4">
      <h4 class="section-title">Questionnaire</h4>

      <form @submit.prevent="goToReview">
        <!-- Questionnaire for each ticket -->
        <div
          v-for="(ticket, index) in ticketList"
          :key="ticket.id"
          class="card custom-card"
        >
          <h5 class="card-title">
            Participant #{{ index + 1 }} - Questionnaire
          </h5>

          <!-- Emergency Contact Information -->
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Emergency Contact Name</label>
              <input
                type="text"
                class="form-control"
                v-model="ticket.survey.emergencyContactName"
              />
              <small
                v-if="ticket.survey.errors && ticket.survey.errors.emergencyContactName"
                class="text-danger"
              >{{ ticket.survey.errors.emergencyContactName }}</small>
            </div>
            <div class="col-md-6">
              <label class="form-label">Emergency Contact Phone</label>
              <input
                type="tel"
                class="form-control"
                v-model="ticket.survey.emergencyContactPhone"
              />
              <small
                v-if="ticket.survey.errors && ticket.survey.errors.emergencyContactPhone"
                class="text-danger"
              >{{ ticket.survey.errors.emergencyContactPhone }}</small>
            </div>
          </div>

          <!-- Medical Conditions -->
          <div class="row g-3 mt-3">
            <div class="col-md-6">
              <label class="form-label">
                Any medical conditions we should be aware of?
              </label>
              <select class="form-select" v-model="ticket.survey.hasMedicalCondition">
                <option value="">Please select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <small
                v-if="ticket.survey.errors && ticket.survey.errors.hasMedicalCondition"
                class="text-danger"
              >{{ ticket.survey.errors.hasMedicalCondition }}</small>
            </div>
          </div>

          <!-- Reason for Registering -->
          <div class="row g-3 mt-3">
            <div class="col-md-12">
              <label class="form-label">Why are you registering for this event?</label>
              <textarea
                class="form-control"
                rows="3"
                v-model="ticket.survey.reason"
              ></textarea>
              <small
                v-if="ticket.survey.errors && ticket.survey.errors.reason"
                class="text-danger"
              >{{ ticket.survey.errors.reason }}</small>
            </div>
          </div>
        </div>

        <!-- Team Selection Section -->
        <div class="card custom-card">
          <h5 class="card-title">Team Options</h5>
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label">Would you like to join or create a team?</label>
              <select class="form-select" v-model="teamOption">
                <option value="">Please select</option>
                <option value="join">Join an existing team</option>
                <option value="create">Create a new team</option>
                <option value="none">I don't want to join a team</option>
              </select>
              <small v-if="teamOptionError" class="text-danger">{{ teamOptionError }}</small>
            </div>
          </div>
        </div>

        <!-- Bottom operation buttons -->
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-secondary" @click="goBackToPersonal">
            Previous
          </button>
          <button class="btn btn-primary" type="submit">NEXT</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import StepIndicator from "@/components/StepIndicator.vue";
import navbar from "@/components/navbar.vue";

const router = useRouter();
const route = useRoute();

// ticketList is passed from the PersonalInfo page
const ticketList = ref([]);
const teamOption = ref("");
const teamOptionError = ref("");

// onMounted: parse ticketList and add a default survey with an errors object if needed
onMounted(() => {
  if (route.query.tickets) {
    try {
      const parsed = JSON.parse(route.query.tickets);
      ticketList.value = parsed.map(ticket => ({
        ...ticket,
        survey: ticket.survey || {
          emergencyContactName: "",
          emergencyContactPhone: "",
          hasMedicalCondition: "",
          reason: "",
          errors: {}
        }
      }));
    } catch (error) {
      console.error("Failed to parse tickets", error);
    }
  } else {
    router.push({ name: "PersonalInfo" });
  }
});

// Function to validate the questionnaire form fields for each ticket and team option
const validateQuestionnaire = () => {
  let valid = true;
  const phonePattern = /^[0-9]{10,15}$/; // 10 to 15 digits

  ticketList.value.forEach(ticket => {
    // Reset errors for survey object
    ticket.survey.errors = {};

    // Validate Emergency Contact Name: required and at least 2 characters
    if (!ticket.survey.emergencyContactName || ticket.survey.emergencyContactName.trim().length < 2) {
      ticket.survey.errors.emergencyContactName =
        "Emergency contact name is required and must be at least 2 characters";
      valid = false;
    }

    // Validate Emergency Contact Phone: required and must be 10 to 15 digits
    if (!ticket.survey.emergencyContactPhone || !phonePattern.test(ticket.survey.emergencyContactPhone)) {
      ticket.survey.errors.emergencyContactPhone =
        "Emergency contact phone must be 10 to 15 digits";
      valid = false;
    }

    // Validate Medical Condition: required (must select yes or no)
    if (!ticket.survey.hasMedicalCondition) {
      ticket.survey.errors.hasMedicalCondition = "Please select your medical condition status";
      valid = false;
    }

    // Validate Reason: required and at least 10 characters
    if (!ticket.survey.reason || ticket.survey.reason.trim().length < 10) {
      ticket.survey.errors.reason =
        "Please provide a reason for registering (at least 10 characters)";
      valid = false;
    }
  });

  // Validate team option selection
  if (!teamOption.value) {
    teamOptionError.value = "Please select a team option";
    valid = false;
  } else {
    teamOptionError.value = "";
  }

  return valid;
};

// On form submission, validate and navigate to the Review page with the data
const goToReview = () => {
  if (validateQuestionnaire()) {
    router.push({
      name: "Review",
      query: {
        tickets: JSON.stringify(ticketList.value),
        teamOption: teamOption.value
      }
    });
  } else {
    alert("Please fix the errors in the form before proceeding.");
  }
};

const goBackToPersonal = () => {
  router.push({
    name: "PersonalInfo",
    query: { tickets: JSON.stringify(ticketList.value) }
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
.text-danger {
  font-size: 0.875rem;
}
</style>
