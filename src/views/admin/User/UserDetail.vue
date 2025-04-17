<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { usersMockData } from '@/mock/usersMock.js'

// 获取当前路由与路由器实例
const route = useRoute()
const router = useRouter()

// 从路由参数中获取用户ID（假设路由定义中使用的参数名称为 userId）
const userId = route.params.userId

// 定义一个响应式变量存储用户信息
const user = ref(null)

// 在组件加载时查找对应用户的数据
onMounted(() => {
  // 将 user.id 转换为字符串进行比较，确保类型一致
  user.value = usersMockData.find(u => u.id.toString() === userId)
})

// 将数字角色转换为文本
const getRoleText = (role) => {
  switch (role) {
    case 1:
      return 'Admin'
    case 2:
      return 'Manager'
    case 3:
      return 'User'
    default:
      return 'Unknown'
  }
}

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 返回用户列表页面
const goBack = () => {
  router.push('/admin/users')
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- 页面头部，包含返回按钮 -->
      <div class="mb-4 d-flex align-items-center">
        <button @click="goBack" class="btn btn-outline-secondary me-2" title="Back">
          <i class="pi pi-arrow-left me-1"></i>
          Back
        </button>
        <h1 class="display-6 mb-0">User Details</h1>
      </div>
      
      <!-- 如果用户数据存在则展示详情 -->
      <div v-if="user" class="bg-white rounded shadow-sm p-4">
        <div class="mb-3">
          <strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}
        </div>
        <div class="mb-3">
          <strong>Email:</strong> {{ user.email }}
        </div>
        <div class="mb-3">
          <strong>Phone:</strong> {{ user.phone_no }}
        </div>
        <div class="mb-3">
          <strong>Role:</strong> {{ getRoleText(user.role) }}
        </div>
        <div class="mb-3">
          <strong>Registration Date:</strong> {{ formatDate(user.created_at) }}
        </div>
      </div>
      
      <!-- 如果没有找到用户，则显示提示及返回按钮 -->
      <div v-else class="text-center mt-4">
        <p class="fw-medium">User not found.</p>
        <button @click="goBack" class="btn btn-secondary">Back to Users</button>
      </div>
    </div>
  </AdminLayout>
</template>