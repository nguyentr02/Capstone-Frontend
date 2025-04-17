<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { eventsMockData } from '@/mock/eventsMock.js'

// 获取路由对象
const router = useRouter()

// 将所有事件复制到响应式变量中
const events = ref([...eventsMockData])

// 搜索和排序相关变量
const searchQuery = ref('')
const sortBy = ref('name')    // 排序字段："name" 或 "date"
const sortOrder = ref('asc')  // 排序顺序："asc" 或 "desc"

// 计算过滤和排序后的事件数据
const filteredEvents = computed(() => {
  let result = events.value.filter(ev => {
    const query = searchQuery.value.toLowerCase()
    return (
      ev.name.toLowerCase().includes(query) ||
      ev.location.toLowerCase().includes(query) ||
      ev.organizer.toLowerCase().includes(query)
    )
  })
  result.sort((a, b) => {
    let compare = 0
    if (sortBy.value === 'name') {
      compare = a.name.localeCompare(b.name)
    } else if (sortBy.value === 'date') {
      compare = new Date(a.date) - new Date(b.date)
    }
    return sortOrder.value === 'asc' ? compare : -compare
  })
  return result
})

// 分页相关变量
const pageNumber = ref(1) // 当前页码
const pageSize = ref(5)   // 每页显示的事件数量
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / pageSize.value))
const pagedEvents = computed(() => {
  const startIndex = (pageNumber.value - 1) * pageSize.value
  return filteredEvents.value.slice(startIndex, startIndex + pageSize.value)
})

// 切换排序顺序函数
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// 分页控制
const prevPage = () => {
  if (pageNumber.value > 1) pageNumber.value--
}
const nextPage = () => {
  if (pageNumber.value < totalPages.value) pageNumber.value++
}

// 格式化日期函数
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 点击操作：进入对应事件的问卷查看页面
const viewQuestionnaire = (eventId) => {
  router.push(`/admin/questionnaire/view/${eventId}`)
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- 页面头部 -->
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">Questionnaire Management</h1>
        <p class="text-muted mt-1">Manage event questionnaires and edit details</p>
      </div>

      <!-- 搜索栏 -->
      <div class="bg-white rounded shadow-sm p-4 mb-4">
        <div class="d-flex flex-column flex-sm-row gap-3">
          <div class="position-relative" style="max-width: 16rem;">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search events..."
              class="form-control"
              style="padding-left: 2.5rem;"
            />
            <i class="pi pi-search position-absolute text-muted" style="left: 1rem; top: 0.75rem;"></i>
          </div>
        </div>
      </div>

      <!-- 事件表格 -->
      <div class="bg-white rounded shadow-sm overflow-hidden">
        <div class="table-responsive">
          <!-- 固定布局，确保列宽固定 -->
          <table class="table table-fixed table-hover mb-0" style="table-layout: fixed; width: 100%;">
            <thead>
              <tr class="bg-light border-bottom">
                <!-- Event Name 列（40%宽度） -->
                <th class="px-3 py-2 text-start fs-6 text-muted" style="width: 40%;">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'name'; toggleSortOrder()">
                    Event Name
                    <i v-if="sortBy === 'name'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <!-- Date 列（20%宽度） -->
                <th class="px-3 py-2 text-start fs-6 text-muted" style="width: 20%;">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'date'; toggleSortOrder()">
                    Date
                    <i v-if="sortBy === 'date'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <!-- Location 列（30%宽度） -->
                <th class="px-3 py-2 text-start fs-6 text-muted" style="width: 30%;">Location</th>
                <!-- Actions 列（10%宽度） -->
                <th class="px-3 py-2 text-center fs-6 text-muted" style="width: 10%;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ev in pagedEvents" :key="ev.id" class="border-bottom">
                <td class="px-3 py-2 text-dark" style="max-width:250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ ev.name }}
                </td>
                <td class="px-3 py-2 text-dark text-start">
                  {{ formatDate(ev.date) }}
                </td>
                <td class="px-3 py-2 text-dark">{{ ev.location }}</td>
                <td class="px-3 py-2 text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <!-- 查看问卷按钮 -->
                    <button @click="viewQuestionnaire(ev.id)" class="btn btn-link text-primary p-0" title="View Questionnaire">
                      <i class="pi pi-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="pagedEvents.length === 0">
                <td colspan="4" class="px-3 py-4 text-center text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="pi pi-exclamation-triangle fs-1 mb-2"></i>
                    <p class="fw-medium">No events found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页控制 -->
        <div class="px-3 py-2 d-flex align-items-center justify-content-between border-top">
          <div class="fs-6 text-muted">
            Showing <span class="fw-medium">{{ pagedEvents.length }}</span> of <span class="fw-medium">{{ filteredEvents.length }}</span> events
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm" :disabled="pageNumber <= 1" @click="prevPage">Previous</button>
            <button class="btn btn-outline-secondary btn-sm bg-light" disabled>{{ pageNumber }}</button>
            <button class="btn btn-outline-secondary btn-sm" :disabled="pageNumber >= totalPages" @click="nextPage">Next</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.table-fixed {
  table-layout: fixed;
  width: 100%;
}
</style>
