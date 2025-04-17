<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { usersMockData } from '@/mock/usersMock.js'

const router = useRouter()
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_no: '',
  role: '1' 
})

// 保存新用户（直接修改模拟数据）
const createUser = () => {
  // 模拟生成新用户ID，取当前数组中最大 id + 1
  const newId = usersMockData.length > 0 ? Math.max(...usersMockData.map(u => u.id)) + 1 : 1
  const newUser = {
    id: newId,
    ...form.value,
    role: Number(form.value.role), // 转换角色为数字
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  usersMockData.push(newUser)
  router.push('/admin/users')
}

const cancelCreate = () => {
  router.push('/admin/users')
}
</script>

<template>
  <AdminLayout>
    <div class="container py-4">
      <!-- 页面头部 -->
      <div class="d-flex align-items-center mb-4">
        <button @click="cancelCreate" class="btn btn-outline-secondary me-2" title="Back">
          <i class="pi pi-arrow-left me-1"></i>
          Back
        </button>
        <h1 class="display-6 mb-0">New User</h1>
      </div>
      
      <!-- 用户新建表单卡片 -->
      <div class="card shadow-sm">
        <div class="card-body">
          <form @submit.prevent="createUser">
            <!-- 姓名输入区域 -->
            <div class="mb-3 row">
              <div class="col-md-6">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" id="first_name" v-model="form.first_name" class="form-control" placeholder="Enter first name" required />
              </div>
              <div class="col-md-6">
                <label for="last_name" class="form-label">Last Name</label>
                <input type="text" id="last_name" v-model="form.last_name" class="form-control" placeholder="Enter last name" required />
              </div>
            </div>
            <!-- 邮箱输入区域 -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="form.email" class="form-control" placeholder="Enter email" required />
            </div>
            <!-- 电话输入区域 -->
            <div class="mb-3">
              <label for="phone_no" class="form-label">Phone Number</label>
              <input type="text" id="phone_no" v-model="form.phone_no" class="form-control" placeholder="Enter phone number" required />
            </div>
            <!-- 角色下拉选择 -->
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
              <button type="button" @click="cancelCreate" class="btn btn-secondary me-2">Cancel</button>
              <button type="submit" class="btn btn-primary">Create User</button>
            </div>
          </form>
        </div>
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
