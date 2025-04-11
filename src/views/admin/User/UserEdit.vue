<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { usersMockData } from '@/mock/usersMock.js'

// 获取路由和路由器实例
const route = useRoute()
const router = useRouter()

// 从路由参数中获取用户ID（假设参数名称为 userId）
const userId = route.params.userId

// 定义响应式对象，用于存储查找到的用户和表单数据
const user = ref(null)
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_no: '',
  role: '1' // 默认角色为 Admin
})

// 页面加载后查找对应的用户，并初始化表单数据
onMounted(() => {
  user.value = usersMockData.find(u => u.id.toString() === userId)
  if (user.value) {
    // 将查找到的用户数据复制到表单中
    form.value = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email,
      phone_no: user.value.phone_no,
      role: user.value.role.toString()  // 保证是字符串，与下拉选项对应
    }
  }
})

// 保存修改后的用户信息（模拟更新）
const updateUser = () => {
  // 查找用户在模拟数据中的索引
  const index = usersMockData.findIndex(u => u.id.toString() === userId)
  if (index !== -1) {
    // 直接修改模拟数据，实际项目中应调用后端 API
    usersMockData[index] = {
      ...usersMockData[index],
      ...form.value,
      role: Number(form.value.role) // 转换回数字
    }
    // 更新成功后返回用户列表页面
    router.push('/admin/users')
  }
}

// 取消编辑，返回用户列表
const cancelEdit = () => {
  router.push('/admin/users')
}
</script>

<template>
  <AdminLayout>
    <div class="container py-4">
      <!-- 页面头部，包含返回按钮 -->
      <div class="d-flex align-items-center mb-4">
        <button @click="cancelEdit" class="btn btn-outline-secondary me-2" title="Back">
          <i class="pi pi-arrow-left me-1"></i>
          Back
        </button>
        <h1 class="display-6 mb-0">Edit User</h1>
      </div>
      
      <!-- 用户编辑表单 -->
      <div v-if="user" class="card shadow-sm">
        <div class="card-body">
          <form @submit.prevent="updateUser">
            <!-- 姓名 -->
            <div class="mb-3 row">
              <div class="col-md-6">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" id="first_name" v-model="form.first_name" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label for="last_name" class="form-label">Last Name</label>
                <input type="text" id="last_name" v-model="form.last_name" class="form-control" required />
              </div>
            </div>
            <!-- 邮箱 -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="form.email" class="form-control" required />
            </div>
            <!-- 电话 -->
            <div class="mb-3">
              <label for="phone_no" class="form-label">Phone</label>
              <input type="text" id="phone_no" v-model="form.phone_no" class="form-control" required />
            </div>
            <!-- 角色选择 -->
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <select id="role" v-model="form.role" class="form-select">
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">User</option>
              </select>
            </div>
            <!-- 按钮区域 -->
            <div class="d-flex justify-content-end">
              <button type="button" @click="cancelEdit" class="btn btn-secondary me-2">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- 如果没有找到用户则显示提示信息 -->
      <div v-else class="alert alert-danger" role="alert">
        User not found.
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
@media (max-width: 576px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .row .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
