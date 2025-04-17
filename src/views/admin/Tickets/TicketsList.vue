<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { fetchEventsData, eventsMockData } from '@/mock/eventsMock.js'
import { ticketsMockData } from '@/mock/ticketsMockData.js'

const router = useRouter()

// 加载、搜索、筛选、排序的状态
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('date')
const sortOrder = ref('desc')

// 活动数据初始为空数组，待后端测试连接后赋值
const eventsData = ref([])

// 在 onMounted 中测试后端接口连接，连接成功则赋值真实数据，否则使用 mock 数据
onMounted(async () => {
  try {
    const result = await fetchEventsData()
    if (result && result.length > 0) {
      console.log("Backend connection successful. Data received:", result)
      eventsData.value = result
    } else {
      console.warn("Backend returned no data. Falling back to mock data.")
      eventsData.value = [...eventsMockData]
    }
  } catch (error) {
    console.error("Failed to connect to backend, using mock data:", error)
    eventsData.value = [...eventsMockData]
  } finally {
    loading.value = false
  }
})

// 计算过滤与排序后的活动列表
const filteredEvents = computed(() => {
  return eventsData.value
    .filter(event => {
      if (statusFilter.value !== 'all' && event.status !== statusFilter.value) {
        return false
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        return (
          event.name.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortBy.value === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy.value === 'date') {
        comparison = new Date(a.date) - new Date(b.date)
      } else if (sortBy.value === 'tickets') {
        comparison = a.ticketsSold - b.ticketsSold
      }
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// 根据活动 ID 过滤票种数据（ticket 对象中有 event_id 属性）
const getTicketsByEventId = (eventId) => {
  return ticketsMockData.filter(ticket => ticket.event_id === eventId)
}

// 格式化日期函数
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 票务管理按钮，跳转到对应活动的票务管理详情页面
const manageTickets = (eventId) => {
  router.push(`/admin/tickets/${eventId}`)
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- 页面头部 -->
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">Ticket Management</h1>
        <p class="text-muted mt-1">Manage and monitor tickets for your events</p>
      </div>

      <!-- 搜索与筛选面板 -->
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
          <select v-model="statusFilter" class="form-select" style="max-width: 16rem;">
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <!-- 页面加载中动画 -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- 活动表格 -->
      <div v-else class="bg-white rounded shadow-sm overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr class="bg-light border-bottom">
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'name'; toggleSortOrder()">
                    Event Name
                    <i v-if="sortBy === 'name'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'date'; toggleSortOrder()">
                    Date
                    <i v-if="sortBy === 'date'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Location</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">Status</th>
                <th class="px-3 py-2 text-start fs-6 text-muted">
                  <div style="cursor: pointer;" class="d-flex align-items-center" @click="sortBy = 'tickets'; toggleSortOrder()">
                    Tickets Sold
                    <i v-if="sortBy === 'tickets'" :class="sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                  </div>
                </th>
                <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- 循环显示过滤后的活动 -->
              <tr v-for="event in filteredEvents" :key="event.id" class="border-bottom">
                <td class="px-3 py-2">
                  <!-- 活动名称和主办方 -->
                  <div class="fw-medium text-dark">{{ event.name }}</div>
                  <div class="fs-6 text-muted">{{ event.organizer }}</div>
                  <!-- 在活动名称下显示票种小卡片 -->
                  <div class="mt-2 d-flex flex-wrap gap-2">
                    <div
                      v-for="ticket in getTicketsByEventId(event.id)"
                      :key="ticket.id"
                      class="card"
                      style="min-width: 150px;"
                    >
                      <div class="card-body p-2">
                        <h6 class="card-title mb-1">{{ ticket.name }}</h6>
                        <p class="card-text mb-0 text-muted">Price: ${{ ticket.price }}</p>
                        <p class="card-text mb-0 text-muted">Sold: {{ ticket.quantity_sold }}/{{ ticket.quantity_total }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <div class="text-dark">{{ formatDate(event.date) }}</div>
                  <div class="fs-6 text-muted">{{ event.time }}</div>
                </td>
                <td class="px-3 py-2 text-dark">{{ event.location }}</td>
                <td class="px-3 py-2">
                  <span :class="{
                      'bg-light text-success': event.status === 'Active',
                      'bg-light text-primary': event.status === 'Upcoming',
                      'bg-light text-dark': event.status === 'Completed' || event.status === 'Cancelled'
                    }" class="px-2 py-1 rounded-pill small fw-medium">
                    {{ event.status }}
                  </span>
                </td>
                <td class="px-3 py-2 text-dark">
                  {{ event.ticketsSold }} / {{ event.capacity }}
                  <div class="progress" style="height: 0.25rem; margin-top: 0.25rem;">
                    <div class="progress-bar bg-primary" role="progressbar" :style="{ width: (event.ticketsSold / event.capacity) * 100 + '%' }"></div>
                  </div>
                </td>
                <td class="px-3 py-2 text-center">
                  <!-- 跳转到票务管理详情的按钮 -->
                  <button @click="manageTickets(event.id)" class="btn btn-link text-primary p-0" title="Manage Tickets">
                    <i class="pi pi-pencil"></i>
                  </button>
                </td>
              </tr>
              <!-- 若无活动数据则给出提示 -->
              <tr v-if="filteredEvents.length === 0">
                <td colspan="6" class="px-3 py-4 text-center text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="pi pi-calendar-times fs-1 mb-2"></i>
                    <p class="fw-medium">No events found</p>
                    <p class="fs-6 mt-1">Try adjusting your filters.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页（示例静态展示） -->
        <div class="px-3 py-2 d-flex align-items-center justify-content-between border-top">
          <div class="fs-6 text-muted">
            Showing <span class="fw-medium">{{ filteredEvents.length }}</span> of <span class="fw-medium">{{ eventsData.length }}</span> events
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

<style scoped>
.card {
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
}
.card-body {
  padding: 0.5rem;
}
</style>




