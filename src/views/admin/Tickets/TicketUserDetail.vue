<!-- src/views/admin/Tickets/TicketUserDetail.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { usersMockData } from '@/mock/usersMock.js'

// 获取路由参数 id，并转换成数字
const route = useRoute()
const router = useRouter()
const userId = parseInt(route.params.id)

// 定义用户详情数据和加载状态
const userDetail = ref(null)
const loading = ref(true)

// 页面加载后，从 usersMockData 中查找对应的用户数据
onMounted(() => {
  // 这里简单查找 usersMockData 中 id 与 userId 匹配的用户
  const foundUser = usersMockData.find(user => user.id === userId)
  if(foundUser) {
    // 示例转换：将 first_name 和 last_name 合并显示，并添加一些假设的字段
    userDetail.value = {
      id: foundUser.id,
      name: `${foundUser.first_name} ${foundUser.last_name}`,
      email: foundUser.email,
      ticketType: 'VIP', // 示例数据，可根据实际情况修改
      purchaseDate: foundUser.created_at || '2025-01-10T10:00:00Z',
      phone_no: foundUser.phone_no || 'N/A'
      // 可以根据需要添加更多字段
    }
  } else {
    userDetail.value = {
      id: userId,
      name: 'User not found',
      email: '',
      ticketType: '',
      purchaseDate: ''
    }
  }
  loading.value = false
})

// 日期格式化函数
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 返回上一页
const goBack = () => {
  router.back()
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
      
      <!-- 用户详情内容 -->
      <div v-else>
        <button @click="goBack" class="btn btn-link text-primary mb-3">
          <i class="pi pi-arrow-left"></i>
          Back to Ticket Users
        </button>
        <div class="card">
          <div class="card-header">
            <h2 class="fs-3">{{ userDetail.name }}</h2>
          </div>
          <div class="card-body">
            <p><strong>Email:</strong> {{ userDetail.email }}</p>
            <p><strong>Ticket Type:</strong> {{ userDetail.ticketType }}</p>
            <p><strong>Purchase Date:</strong> {{ formatDate(userDetail.purchaseDate) }}</p>
            <p v-if="userDetail.phone_no"><strong>Phone:</strong> {{ userDetail.phone_no }}</p>
            <!-- 可根据需求添加更多字段 -->
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
