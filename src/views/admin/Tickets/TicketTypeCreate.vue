<!-- src/views/admin/Tickets/TicketTypeCreate.vue -->
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { createTicketType } from '@/api/atickets.js'

const route = useRoute()
const router = useRouter()
const eventId = Number(route.params.eventId)

const saving = ref(false)
const errors = ref({})

const ticketForm = ref({
  name: '',
  description: '',
  price: 0,
  quantityTotal: 0,
  salesStart: '',
  salesEnd: '',
  status: 'ACTIVE'
})

// validateForm
const validateForm = () => {
  errors.value = {}
  if (!ticketForm.value.name) errors.value.name = 'Ticket name is required'
  if (ticketForm.value.price <= 0) errors.value.price = 'Price must be greater than 0'
  if (ticketForm.value.quantityTotal <= 0) errors.value.quantityTotal = 'Total quantity must be greater than 0'
  return Object.keys(errors.value).length === 0
}

// saveTicket
const saveTicket = async () => {
  if (!validateForm()) return
  saving.value = true
  try {
    const payload = {
      name: ticketForm.value.name,
      description: ticketForm.value.description,
      price: ticketForm.value.price,
      quantityTotal: ticketForm.value.quantityTotal,
      salesStart: ticketForm.value.salesStart
        ? new Date(ticketForm.value.salesStart).toISOString()
        : null,
      salesEnd: ticketForm.value.salesEnd
        ? new Date(ticketForm.value.salesEnd).toISOString()
        : null,
      status: ticketForm.value.status
    }
    await createTicketType(eventId, payload)
    router.push(`/admin/tickets/${eventId}`)
  } catch (err) {
    console.error('Create ticket failed:', err)
  } finally {
    saving.value = false
  }
}

// cancel action
const cancelForm = () => {
  router.push(`/admin/tickets/${eventId}`)
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">Create Ticket Type</h1>
        <p class="text-muted mt-1">Fill in the form to create a new ticket type.</p>
      </div>
      <div class="bg-white rounded shadow-sm p-4">
        <form @submit.prevent="saveTicket">
          <div class="mb-3">
            <label class="form-label">Ticket Name <span class="text-danger">*</span></label>
            <input v-model="ticketForm.name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="ticketForm.description" rows="3" class="form-control"></textarea>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">Price ($) <span class="text-danger">*</span></label>
              <input v-model.number="ticketForm.price" type="number" step="0.01" class="form-control" :class="{ 'is-invalid': errors.price }" />
              <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Total Quantity <span class="text-danger">*</span></label>
              <input v-model.number="ticketForm.quantityTotal" type="number" class="form-control" :class="{ 'is-invalid': errors.quantityTotal }" />
              <div v-if="errors.quantityTotal" class="invalid-feedback">{{ errors.quantityTotal }}</div>
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">Sales Start</label>
              <input v-model="ticketForm.salesStart" type="datetime-local" class="form-control" />
            </div>
            <div class="col-md-6">
              <label class="form-label">Sales End</label>
              <input v-model="ticketForm.salesEnd" type="datetime-local" class="form-control" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Status</label>
            <select v-model="ticketForm.status" class="form-select">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div class="mt-4 pt-3 border-top d-flex justify-content-end gap-3">
            <button type="button" class="btn btn-outline-secondary" @click="cancelForm">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="!saving">Create Ticket Type</span>
              <span v-else class="d-flex align-items-center">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.no-border-btn:hover { background-color: #e9ecef; }
</style>
