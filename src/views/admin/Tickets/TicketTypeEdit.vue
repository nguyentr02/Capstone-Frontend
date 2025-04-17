<!-- src/views/admin/Tickets/TicketTypeEdit.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ticketsMockData } from '@/mock/ticketsMockData.js'

// 获取路由参数 ticketId（纯编辑页面，必定存在）
const route = useRoute()
const router = useRouter()
const ticketId = parseInt(route.params.id)

// 加载和保存状态
const loading = ref(true)
const saving = ref(false)
const errors = ref({})

// 定义票种表单的初始状态
const ticketForm = ref({
  name: '',
  description: '',
  price: 0,
  quantity_total: 0,
  sales_start: '',
  sales_end: '',
  status: 'active'
})

// 页面加载时，从 ticketsMockData 中查找对应票种数据
onMounted(() => {
  // 模拟 API 调用延时 500ms
  setTimeout(() => {
    const foundTicket = ticketsMockData.find(ticket => ticket.id === ticketId)
    if (foundTicket) {
      ticketForm.value = {
        name: foundTicket.name || '',
        description: foundTicket.description || '',
        price: foundTicket.price || 0,
        quantity_total: foundTicket.quantity_total || 0,
        sales_start: foundTicket.sales_start || '',
        sales_end: foundTicket.sales_end || '',
        status: foundTicket.status || 'active'
      }
    }
    loading.value = false
  }, 500)
})

// 校验表单
const validateForm = () => {
  errors.value = {}
  if (!ticketForm.value.name) {
    errors.value.name = 'Ticket name is required'
  }
  if (ticketForm.value.price <= 0) {
    errors.value.price = 'Price must be greater than 0'
  }
  if (ticketForm.value.quantity_total <= 0) {
    errors.value.quantity_total = 'Total quantity must be greater than 0'
  }
  // sales_start 与 sales_end 为可选项
  return Object.keys(errors.value).length === 0
}

// 保存票种数据
const saveTicket = () => {
  if (!validateForm()) {
    return
  }
  saving.value = true
  // 模拟保存 API 调用延时 1000ms
  setTimeout(() => {
    console.log('Ticket saved:', ticketForm.value)
    saving.value = false
    router.push('/admin/tickets')
  }, 1000)
}

// 取消操作，返回票务管理页面
const cancelForm = () => {
  router.push('/admin/tickets')
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- 加载状态 -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 16rem;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <!-- 表单内容 -->
      <div v-else>
        <div class="mb-4">
          <h1 class="fs-2 fw-bold text-dark">Edit Ticket Type</h1>
          <p class="text-muted mt-1">
            Update the details of your ticket type.
          </p>
        </div>
        <div class="bg-white rounded shadow-sm p-4">
          <form @submit.prevent="saveTicket">
            <!-- Ticket Name -->
            <div class="mb-3">
              <label class="form-label">Ticket Name <span class="text-danger">*</span></label>
              <input v-model="ticketForm.name" type="text" placeholder="Enter ticket name" class="form-control" :class="{ 'is-invalid': errors.name }" />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
            <!-- Description -->
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="ticketForm.description" placeholder="Enter ticket description" rows="3" class="form-control"></textarea>
            </div>
            <!-- Price & Total Quantity -->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label">Price ($) <span class="text-danger">*</span></label>
                <input v-model.number="ticketForm.price" type="number" step="0.01" min="0" class="form-control" :class="{ 'is-invalid': errors.price }" />
                <div v-if="errors.price" class="invalid-feedback">
                  {{ errors.price }}
                </div>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Total Quantity <span class="text-danger">*</span></label>
                <input v-model.number="ticketForm.quantity_total" type="number" min="0" class="form-control" :class="{ 'is-invalid': errors.quantity_total }" />
                <div v-if="errors.quantity_total" class="invalid-feedback">
                  {{ errors.quantity_total }}
                </div>
              </div>
            </div>
            <!-- Sales Period -->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label">Sales Start</label>
                <input v-model="ticketForm.sales_start" type="datetime-local" class="form-control" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Sales End</label>
                <input v-model="ticketForm.sales_end" type="datetime-local" class="form-control" />
              </div>
            </div>
            <!-- Status -->
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select v-model="ticketForm.status" class="form-select">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <!-- 表单操作按钮 -->
            <div class="mt-4 pt-3 border-top d-flex justify-content-end gap-3">
              <button @click="cancelForm" type="button" class="btn btn-outline-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                <span v-if="!saving">Update Ticket Type</span>
                <span v-else class="d-flex align-items-center">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.no-border-btn:hover {
  background-color: #e9ecef;
}
</style>

