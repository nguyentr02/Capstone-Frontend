<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { usersMockData } from '@/mock/usersMock.js'

const router = useRouter()
const searchQuery = ref('')
const roleFilter = ref('all')
const sortBy = ref('name')
const sortOrder = ref('asc')

const usersData = ref([...usersMockData])

// 将角色数字转换为文本
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

const filteredUsers = computed(() => {
  return usersData.value
    .filter(user => {
      // 角色筛选（转换为字符串后进行比较）
      if (roleFilter.value !== 'all' && user.role.toString() !== roleFilter.value) {
        return false
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        return (
          (user.first_name + ' ' + user.last_name).toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone_no.toLowerCase().includes(query) ||
          getRoleText(user.role).toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortBy.value === 'name') {
        comparison = (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name)
      } else if (sortBy.value === 'registrationDate') {
        comparison = new Date(a.created_at) - new Date(b.created_at)
      }
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
})

// 切换排序顺序
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// 跳转到用户详情页面
const viewUserDetails = (userId) => {
  router.push(`/admin/users/${userId}`)
}

// 创建新用户
const createNewUser = () => {
  router.push('/admin/users/create')
}

// 编辑用户
const editUser = (userId) => {
  router.push(`/admin/users/edit/${userId}`)
}

// 删除用户（确认后进行删除）
const deleteUser = (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    usersData.value = usersData.value.filter(user => user.id !== userId)
  }
}

// 格式化日期（使用 created_at 字段）
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- 页面头部 -->
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">User Management</h1>
        <p class="text-muted mt-1">Manage users, assign roles and monitor activity</p>
      </div>
      
      <!-- 操作栏 -->
      <div class="bg-white rounded shadow-sm p-4 mb-4">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
          <!-- 搜索与筛选 -->
          <div class="d-flex flex-column flex-sm-row gap-3">
            <!-- 搜索框 -->
            <div class="position-relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search users..."
                class="form-control"
                style="padding-left: 2.5rem; max-width: 16rem;"
              />
              <i class="pi pi-search position-absolute text-muted" style="left: 1rem; top: 0.75rem;"></i>
            </div>
            <!-- 角色筛选 -->
            <select v-model="roleFilter" class="form-select" style="max-width: 16rem;">
              <option value="all">All Roles</option>
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">User</option>
            </select>
          </div>
          <!-- 创建用户按钮 -->
          <button @click="createNewUser" class="btn btn-primary d-flex align-items-center">
            <i class="pi pi-plus me-2"></i>
            Create New User
          </button>
        </div>
      </div>
      
      <!-- 用户表格 -->
      <div class="bg-white rounded shadow-sm overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr class="bg-light border-bottom">
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'name'; toggleSortOrder()">
                    Name
                    <i v-if="sortBy === 'name'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Phone</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Role</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'registrationDate'; toggleSortOrder()">
                    Registration Date
                    <i v-if="sortBy === 'registrationDate'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="border-bottom">
                <td class="px-3 py-2">
                  <div class="fw-medium text-dark">{{ user.first_name }} {{ user.last_name }}</div>
                </td>
                <td class="px-3 py-2 text-dark">{{ user.email }}</td>
                <td class="px-3 py-2 text-dark">{{ user.phone_no }}</td>
                <td class="px-3 py-2 text-dark">{{ getRoleText(user.role) }}</td>
                <td class="px-3 py-2 text-dark">{{ formatDate(user.created_at) }}</td>
                <td class="px-3 py-2">
                  <div class="d-flex justify-content-center gap-2">
                    <button @click="viewUserDetails(user.id)" class="btn btn-link text-primary p-0" title="View Details">
                      <i class="pi pi-eye"></i>
                    </button>
                    <button @click="editUser(user.id)" class="btn btn-link text-success p-0" title="Edit User">
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button @click="deleteUser(user.id)" class="btn btn-link text-danger p-0" title="Delete User">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <!-- 空状态 -->
              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="px-3 py-4 text-center text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="pi pi-user-minus fs-1 mb-2"></i>
                    <p class="fw-medium">No users found</p>
                    <p class="fs-6 mt-1">Try adjusting your filters or create a new user</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 简易分页 -->
        <div class="px-3 py-2 d-flex align-items-center justify-content-between border-top">
          <div class="fs-6 text-muted">
            Showing <span class="fw-medium">{{ filteredUsers.length }}</span> of <span class="fw-medium">{{ usersData.length }}</span> users
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm" disabled>Previous</button>
            <button class="btn btn-outline-secondary btn-sm bg-light">1</button>
            <button class="btn btn-outline-secondary btn-sm" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
