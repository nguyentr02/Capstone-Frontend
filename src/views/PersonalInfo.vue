<template>
  <div>
    <navbar />
    <!-- Step indicator: current step is 0 (personal message) -->
    <StepIndicator :steps="['Select Ticket', 'Complete Info', 'Checkout']" :currentStep="0" />

    <div class="container mt-4">
      <h4 class="section-title">YOUR INFORMATION</h4>
      <!-- Personal information form for each participant -->
      <form @submit.prevent="goToQuestionnaire">
        <div v-for="(ticket, index) in ticketList" :key="ticket.id || index" class="card custom-card">
          <h5 class="card-title">
            Participant #{{ index + 1 }}
            <span class="ticket-type">({{ ticketTypeLabel(ticket.type) }})</span>
          </h5>

          <!-- Email & Confirmation Email -->
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="ticket.email" required />
              <small v-if="ticket.errors.email" class="text-danger">{{ ticket.errors.email }}</small>
            </div>
            <div class="col-md-6">
              <label class="form-label">Confirm Email</label>
              <input type="email" class="form-control" v-model="ticket.confirmEmail" required />
              <small v-if="ticket.errors.confirmEmail" class="text-danger">{{ ticket.errors.confirmEmail }}</small>
            </div>
          </div>

          <!-- Name, sex and date of birth -->
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
              <small v-if="ticket.errors.dob" class="text-danger">{{ ticket.errors.dob }}</small>
            </div>
          </div>

          <!-- Telephone and country -->
          <div class="row g-3 mt-3">
            <div class="col-md-6">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-control" v-model="ticket.phone" required />
              <small v-if="ticket.errors.phone" class="text-danger">{{ ticket.errors.phone }}</small>
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

          <!-- Address, city, state and postcode -->
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
              <small v-if="ticket.errors.zip" class="text-danger">{{ ticket.errors.zip }}</small>
            </div>
          </div>

          <!-- Identity card/passport number -->
          <div class="row g-3 mt-3">
            <div class="col-md-6">
              <label class="form-label">ID/Passport Number</label>
              <input type="text" class="form-control" v-model="ticket.idNumber" required />
              <small v-if="ticket.errors.idNumber" class="text-danger">{{ ticket.errors.idNumber }}</small>
            </div>
          </div>

          <!-- Children's tickets: upload your documents -->
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

        <!-- Bottom operating buttons -->
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-outline-danger" @click="goBack">Start Over</button>
          <button class="btn btn-primary" type="submit">NEXT</button>
        </div>
      </form>
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

// Default ticket data, used when no tickets parameter is passed in the route
const defaultTickets = [
  {
    id: 1,
    type: 'adultWalk',
    email: '',
    confirmEmail: '',
    name: '',
    gender: '',
    dob: '',
    phone: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    idNumber: '',
    proof: null,
    survey: {
      emergencyContactName: "",
      emergencyContactPhone: "",
      hasMedicalCondition: "",
      reason: ""
    },
    errors: {}
  }
];

// Create ticketList based on route query parameters
const ticketList = ref([]);

onMounted(() => {
  if (route.query.tickets) {
    try {
      const parsedTickets = JSON.parse(route.query.tickets);
      ticketList.value = parsedTickets.map(ticket => {
        return {
          ...ticket,
          survey: ticket.survey
            ? {
                emergencyContactName: ticket.survey.emergencyContactName || "",
                emergencyContactPhone: ticket.survey.emergencyContactPhone || "",
                hasMedicalCondition: ticket.survey.hasMedicalCondition || "",
                reason: ticket.survey.reason || ""
              }
            : {
                emergencyContactName: "",
                emergencyContactPhone: "",
                hasMedicalCondition: "",
                reason: ""
              },
          errors: ticket.errors || {}
        };
      });
    } catch (error) {
      console.error("Analysis tickets Failure:", error);
      // If parsing fails, the default ticket data is used
      ticketList.value = defaultTickets;
    }
  } else {
    // If no tickets parameter is passed, use the default data instead of redirection
    ticketList.value = defaultTickets;
  }
});

// Handles file uploads, saving file objects to ticket.proof
const handleFileUpload = (event, index) => {
  ticketList.value[index].proof = event.target.files[0];
};

// Return to Select Ticket Type page
const goBack = () => {
  router.push({ name: "SelectCategory" });
};

// sanitizeTickets function: filters out non-serialisable properties (e.g. File objects)
const sanitizeTickets = (tickets) => {
  return tickets.map(ticket => {
    const { proof, ...rest } = ticket;
    return {
      ...rest,
      proof: proof ? { name: proof.name } : null
    };
  });
};

// Form Validation Functions
const validateForm = () => {
  let isValid = true;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const zipPattern = /^[0-9]{5}$/; // Postal code: 5 digits
  const phonePattern = /^[0-9]{10,15}$/; // Telephone: 10 to 15 digits
  const idPattern = /^[A-Za-z0-9]{5,}$/; // Identity card/passport: minimum 5-digit alphanumeric combination

  ticketList.value.forEach(ticket => {
    // Reset error messages
    ticket.errors = {};

    // Verification Email Format
    if (!emailPattern.test(ticket.email)) {
      ticket.errors.email = "Incorrect mailbox format";
      isValid = false;
    }
    // Verify that the confirmation mailbox matches the mailbox
    if (ticket.email !== ticket.confirmEmail) {
      ticket.errors.confirmEmail = "Inconsistency in the email address entered twice";
      isValid = false;
    }
    // Validate postcode format
    if (!zipPattern.test(ticket.zip)) {
      ticket.errors.zip = "Postcode must be 5 digits";
      isValid = false;
    }
    // Verification Phone Format
    if (!phonePattern.test(ticket.phone)) {
      ticket.errors.phone = "Phone number must be 10 to 15 digits";
      isValid = false;
    }
    // Validate ID/passport number format
    if (!idPattern.test(ticket.idNumber)) {
      ticket.errors.idNumber = "ID/passport number needs to be at least 5 alphanumeric digits";
      isValid = false;
    }
    // Verify date of birth and calculate age
    if (!ticket.dob) {
      ticket.errors.dob = "The date of birth cannot be empty";
      isValid = false;
    } else {
      const dob = new Date(ticket.dob);
      const today = new Date();
      if (dob >= today) {
        ticket.errors.dob = "Date of birth must be before today";
        isValid = false;
      } else {
        const age = Math.floor((today - dob) / (365.25 * 24 * 3600 * 1000));
        if (age < 1 || age > 120) {
          ticket.errors.dob = "Please enter a valid age (1-120 years)";
          isValid = false;
        }
        // Age verification for ticket types
        if (ticket.type === "adultWalk" && age < 14) {
          ticket.errors.dob = "Full-price tickets require 14 years of age or older";
          isValid = false;
        }
        if ((ticket.type === "childRun" || ticket.type === "childWalk") && age >= 14) {
          ticket.errors.dob = "Child tickets require age below 14 years";
          isValid = false;
        }
      }
    }
  });
  return isValid;
};

// Form submission: after validation, navigate to the questionnaire page and pass filtered ticket information
const goToQuestionnaire = () => {
  if (validateForm()) {
    const sanitizedTickets = sanitizeTickets(ticketList.value);
    router.push({
      name: "Questionnaire",
      query: { tickets: JSON.stringify(sanitizedTickets) }
    });
  } else {
    alert("Please fix the error in the form before submitting.");
  }
};

// Helper function: return the corresponding label according to the ticket type
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
.text-danger {
  font-size: 0.875rem;
}
</style>
