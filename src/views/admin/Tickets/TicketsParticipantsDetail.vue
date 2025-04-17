<!-- src/views/admin/Tickets/ParticipantsDetail.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { participantsMockData } from '@/mock/participantsMockData.js'

// 获取路由参数并转换为数字
const route = useRoute()
const router = useRouter()
const participantId = parseInt(route.params.id)

// 定义参与者详情数据与加载状态
const participantDetail = ref(null)
const loading = ref(true)

// 页面加载后，在 mock 数据中查找对应参与者
onMounted(() => {
  const foundParticipant = participantsMockData.find(p => p.id === participantId)
  if(foundParticipant) {
    participantDetail.value = {
      id: foundParticipant.id,
      name: `${foundParticipant.first_name} ${foundParticipant.last_name}`,
      email: foundParticipant.email,
      phone_no: foundParticipant.phone_no,
      date_of_birth: foundParticipant.date_of_birth,
      address: foundParticipant.address,
      city: foundParticipant.city,
      state: foundParticipant.state,
      zip_code: foundParticipant.zip_code,
      country: foundParticipant.country,
      created_at: foundParticipant.created_at,
      updated_at: foundParticipant.updated_at
    }
  } else {
    participantDetail.value = {
      id: participantId,
      name: 'Participant not found',
      email: '',
      phone_no: '',
      date_of_birth: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      created_at: '',
      updated_at: ''
    }
  }
  loading.value = false
})

// 日期格式化函数
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (isNaN(date)) return 'N/A'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- Loading 状态 -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 16rem;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <!-- 详情页面内容 -->
      <div v-else>
        <button @click="goBack" class="btn btn-link text-primary mb-3">
          <i class="pi pi-arrow-left"></i>
          Back to Participants
        </button>
        <div class="card">
          <div class="card-header">
            <h2 class="fs-3">{{ participantDetail.name }}</h2>
          </div>
          <div class="card-body">
            <p><strong>Email:</strong> {{ participantDetail.email }}</p>
            <p><strong>Phone:</strong> {{ participantDetail.phone_no || 'N/A' }}</p>
            <p>
              <strong>Date of Birth:</strong>
              {{ participantDetail.date_of_birth ? formatDate(participantDetail.date_of_birth) : 'N/A' }}
            </p>
            <p>
              <strong>Address:</strong>
              {{ participantDetail.address }}, {{ participantDetail.city }}, {{ participantDetail.state }}, 
              {{ participantDetail.zip_code }}, {{ participantDetail.country }}
            </p>
            <p><strong>Created At:</strong> {{ formatDate(participantDetail.created_at) }}</p>
            <p><strong>Updated At:</strong> {{ formatDate(participantDetail.updated_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.card {
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  padding: 1rem;
}
.card-header {
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 1rem;
}
</style>
