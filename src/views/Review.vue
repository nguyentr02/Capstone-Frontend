<template>
  <div>
    <navbar />
    <!-- Step indicator: Current step is 2 (Preview Information) -->
    <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="2" />

    <div class="container mt-4">
      <h4 class="section-title">Review Your Information</h4>

      <div v-for="(ticket, index) in ticketList" :key="ticket.id" class="card custom-card preview-card">
        <div class="d-flex justify-content-between align-items-center preview-header">
          <h5>
            Participant #{{ index + 1 }}
            <span class="ticket-type">({{ ticketTypeLabel(ticket.type) }})</span>
          </h5>
        </div>

        <div class="row preview-row">
          <div class="col-md-6"><strong>Email:</strong> {{ ticket.email }}</div>
          <div class="col-md-6"><strong>Full Name:</strong> {{ ticket.name }}</div>
          <div class="col-md-6"><strong>Gender:</strong> {{ ticket.gender }}</div>
          <div class="col-md-6"><strong>Date of Birth:</strong> {{ ticket.dob }}</div>
          <div class="col-md-6"><strong>Phone:</strong> {{ ticket.phone }}</div>
          <div class="col-md-6"><strong>Country:</strong> {{ ticket.country }}</div>
          <div class="col-md-12"><strong>Address:</strong> {{ ticket.address }}</div>
          <div class="col-md-6"><strong>City:</strong> {{ ticket.city }}</div>
          <div class="col-md-3"><strong>State:</strong> {{ ticket.state }}</div>
          <div class="col-md-3"><strong>Zip:</strong> {{ ticket.zip }}</div>
          <div class="col-md-12"><strong>ID/Passport:</strong> {{ ticket.idNumber }}</div>
          <div v-if="ticket.type === 'childRun' || ticket.type === 'childWalk'" class="col-md-12">
            <strong>Child ticket certificate:</strong> {{ ticket.proof ? ticket.proof.name : "Not Uploaded" }}
          </div>

          <!-- Display questionnaire information with default values to avoid undefined errors -->
          <div class="col-md-6 mt-3">
            <strong>Emergency Contact Name:</strong> {{ ticket.survey.emergencyContactName || '' }}
          </div>
          <div class="col-md-6 mt-3">
            <strong>Emergency Contact Phone:</strong> {{ ticket.survey.emergencyContactPhone || '' }}
          </div>
          <div class="col-md-6 mt-3">
            <strong>Medical Condition:</strong> {{ ticket.survey.hasMedicalCondition || '' }}
          </div>
          <div class="col-md-12 mt-3">
            <strong>Reason:</strong> {{ ticket.survey.reason || '' }}
          </div>
        </div>
      </div>

      <!-- Bottom operation buttons -->
      <div class="d-flex justify-content-between mt-4">
        <div>
          <button class="btn btn-warning me-2" @click="goBackToQuestionnaire">Return to edit questionnaire</button>
          <button class="btn btn-info" @click="goBackToPersonalInfo">Return to modify personal information</button>
        </div>
        <button class="btn btn-success" @click="goToCheckout">Submit and Continue (Checkout)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StepIndicator from '@/components/StepIndicator.vue';
import navbar from '@/components/navbar.vue';

const router = useRouter();
const route = useRoute();

const ticketList = ref([]);

// onMounted: Parse ticketList from route query and add default survey object if missing
onMounted(() => {
  if (route.query.tickets) {
    try {
      ticketList.value = JSON.parse(route.query.tickets);
      // Ensure each ticket has a survey object to avoid undefined errors
      ticketList.value.forEach(ticket => {
        if (!ticket.survey) {
          ticket.survey = {
            emergencyContactName: '',
            emergencyContactPhone: '',
            hasMedicalCondition: '',
            reason: ''
          };
        }
      });
    } catch (error) {
      console.error('Error parsing tickets:', error);
    }
  } else {
    router.push({ name: 'PersonalInfo' });
  }
});

// Sanitize tickets to remove non-serializable properties (like File objects)
const sanitizeTickets = (tickets) => {
  return tickets.map(ticket => {
    const { proof, ...rest } = ticket;
    return {
      ...rest,
      proof: proof ? { name: proof.name } : null
    };
  });
};

// Navigation functions to go back to questionnaire, personal info, or proceed to checkout
const goBackToQuestionnaire = () => {
  const sanitizedTickets = sanitizeTickets(ticketList.value);
  router.push({
    name: 'Questionnaire',
    query: { tickets: JSON.stringify(sanitizedTickets) }
  });
};

const goBackToPersonalInfo = () => {
  const sanitizedTickets = sanitizeTickets(ticketList.value);
  router.push({
    name: 'PersonalInfo',
    query: { tickets: JSON.stringify(sanitizedTickets) }
  });
};

const goToCheckout = () => {
  const sanitizedTickets = sanitizeTickets(ticketList.value);
  router.push({
    name: 'Checkout',
    query: { tickets: JSON.stringify(sanitizedTickets) }
  });
};

const ticketTypeLabel = (type) => {
  switch (type) {
    case 'adultWalk':
      return '2.5KM WALK Adult Ticket';
    case 'childRun':
      return "5KM RUN Children's Tickets";
    case 'childWalk':
      return "2.5KM WALK Children's Tickets";
    default:
      return 'Unknown ticket type';
  }
};
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
</style>
