<template>
  <div>
    <navbar />
    <StepIndicator
      :steps="['Select Ticket', 'Complete Info', 'Questionnaire', 'Review', 'Checkout']"
      :currentStep="2"
      @step-clicked="handleStepClick"
    />

    <div class="container mt-4">
      <h4 class="section-title">Questionnaire</h4>

      <!-- Ticket switch button area -->
      <div class="ticket-tabs mb-3">
        <button
          v-for="(ticket, index) in ticketStore.ticketList"
          :key="ticket.id || index"
          @click="currentTicketIndex = index"
          :class="['btn', currentTicketIndex === index ? 'btn-primary' : 'btn-outline-secondary', 'me-2']"
        >
          Participant #{{ index + 1 }}
          <span v-if="!isTicketComplete(ticket)" class="incomplete-badge">!</span>
        </button>
      </div>

      <form @submit.prevent="goToReview">
        <!-- Display only the contents of the currently selected ticket questionnaire -->
        <div class="card custom-card">
          <h5 class="card-title">
            Participant #{{ currentTicketIndex + 1 }} - Questionnaire
          </h5>
          <!-- Emergency contact information -->
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Emergency Contact Name</label>
              <input
                type="text"
                class="form-control"
                v-model="currentTicket.survey.emergencyContactName"
              />
              <small
                v-if="currentTicket.survey.errors && currentTicket.survey.errors.emergencyContactName"
                class="text-danger"
              >{{ currentTicket.survey.errors.emergencyContactName }}</small>
            </div>
            <div class="col-md-6">
              <label class="form-label">Emergency Contact Phone</label>
              <input
                type="tel"
                class="form-control"
                v-model="currentTicket.survey.emergencyContactPhone"
              />
              <small
                v-if="currentTicket.survey.errors && currentTicket.survey.errors.emergencyContactPhone"
                class="text-danger"
              >{{ currentTicket.survey.errors.emergencyContactPhone }}</small>
            </div>
          </div>

          <!-- Medical condition -->
          <div class="row g-3 mt-3">
            <div class="col-md-6">
              <label class="form-label">
                Any medical conditions we should be aware of?
              </label>
              <select class="form-select" v-model="currentTicket.survey.hasMedicalCondition">
                <option value="">Please select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <small
                v-if="currentTicket.survey.errors && currentTicket.survey.errors.hasMedicalCondition"
                class="text-danger"
              >{{ currentTicket.survey.errors.hasMedicalCondition }}</small>
            </div>
          </div>

          <!-- Reason for registration -->
          <div class="row g-3 mt-3">
            <div class="col-md-12">
              <label class="form-label">Why are you registering for this event?</label>
              <textarea
                class="form-control"
                rows="3"
                v-model="currentTicket.survey.reason"
              ></textarea>
              <small
                v-if="currentTicket.survey.errors && currentTicket.survey.errors.reason"
                class="text-danger"
              >{{ currentTicket.survey.errors.reason }}</small>
            </div>
          </div>
        </div>

        <!-- Event Questionnaire (global for all tickets) -->
        <div class="card custom-card">
          <h5 class="card-title">Event Questionnaire</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">How did you hear about the event?</label>
              <input
                type="text"
                class="form-control"
                v-model="ticketStore.eventSurvey.source"
              />
              <small
                v-if="ticketStore.eventSurvey.errors.source"
                class="text-danger"
              >{{ ticketStore.eventSurvey.errors.source }}</small>
            </div>
            <div class="col-md-6">
              <label class="form-label">Any dietary restrictions?</label>
              <textarea
                class="form-control"
                rows="2"
                v-model="ticketStore.eventSurvey.dietaryRestrictions"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Team Selection -->
        <div class="card custom-card">
          <h5 class="card-title">Team Options</h5>
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label">Would you like to join or create a team?</label>
              <select class="form-select" v-model="ticketStore.teamOption">
                <option value="">Please select</option>
                <option value="join">Join an existing team</option>
                <option value="create">Create a new team</option>
                <option value="none">I don't want to join a team</option>
              </select>
              <small v-if="teamOptionError" class="text-danger">
                {{ teamOptionError }}
              </small>
            </div>
          </div>
        </div>

        <!-- Bottom operating buttons -->
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/store/ticketStore'
import StepIndicator from '@/components/StepIndicator.vue'
import navbar from '@/components/navbar.vue'

const router = useRouter()
const ticketStore = useTicketStore()
const teamOptionError = ref('')

// 当前问卷编辑的票据索引
const currentTicketIndex = ref(0)
const currentTicket = computed(() => ticketStore.ticketList[currentTicketIndex.value])

// 判断某张票据的问卷是否完整（简易示例：检查必填字段是否为空）
const isTicketComplete = (ticket) => {
  const survey = ticket.survey || {}
  return survey.emergencyContactName?.trim() && survey.emergencyContactPhone?.trim() &&
         survey.hasMedicalCondition && survey.reason?.trim().length >= 10
}

const phonePattern = /^[0-9]{10,15}$/

// 修改验证逻辑：遍历所有票据进行验证
const validateQuestionnaire = () => {
  let valid = true

  ticketStore.ticketList.forEach(ticket => {
    ticket.survey = ticket.survey || {}
    ticket.survey.errors = {}

    if (!ticket.survey.emergencyContactName || ticket.survey.emergencyContactName.trim().length < 2) {
      ticket.survey.errors.emergencyContactName =
        'Emergency contact name is required and must be at least 2 characters'
      valid = false
    }
    if (!ticket.survey.emergencyContactPhone || !phonePattern.test(ticket.survey.emergencyContactPhone)) {
      ticket.survey.errors.emergencyContactPhone =
        'Emergency contact phone must be 10 to 15 digits'
      valid = false
    }
    if (!ticket.survey.hasMedicalCondition) {
      ticket.survey.errors.hasMedicalCondition = 'Please select your medical condition status'
      valid = false
    }
    if (!ticket.survey.reason || ticket.survey.reason.trim().length < 10) {
      ticket.survey.errors.reason =
        'Please provide a reason for registering (at least 10 characters)'
      valid = false
    }
  })

  // 验证全局活动问卷
  ticketStore.eventSurvey.errors = {}
  if (!ticketStore.eventSurvey.source || ticketStore.eventSurvey.source.trim().length < 3) {
    ticketStore.eventSurvey.errors.source = 'Please specify how you heard about the event (at least 3 characters)'
    valid = false
  }

  // 验证团队选项
  if (!ticketStore.teamOption) {
    teamOptionError.value = 'Please select a team option'
    valid = false
  } else {
    teamOptionError.value = ''
  }

  return valid
}

const goToReview = () => {
  if (validateQuestionnaire()) {
    router.push({ name: 'Review' })
  } else {
    alert('Please fix the errors in the form before proceeding.')
  }
}

const goBackToPersonal = () => {
  router.push({ name: 'PersonalInfo' })
}

// 示例：点击步骤指示器时跳转
const handleStepClick = (stepIndex) => {
  const routes = ["SelectCategory", "PersonalInfo", "Questionnaire", "Review", "Checkout"];
  const targetRoute = routes[stepIndex];
  if (targetRoute) {
    router.push({ name: targetRoute });
  }
}
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
.ticket-tabs {
  margin-bottom: 1rem;
}

/* 简单样式：未完成问卷的按钮显示感叹号 */
.incomplete-badge {
  color: red;
  margin-left: 5px;
  font-weight: bold;
}
</style>
