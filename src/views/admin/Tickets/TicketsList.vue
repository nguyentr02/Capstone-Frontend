<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { eventsMockData } from '@/mock/eventsMock.js'
import { ticketsMockData } from '@/mock/ticketsMockData.js'
import { usersMockData } from '@/mock/usersMock.js'
import { participantsMockData } from '@/mock/participantsMockData.js'

const router = useRouter()
const route = useRoute()

// 获取当前活动 id
const eventId = parseInt(route.params.id)

const loading = ref(true)
const activeTab = ref('ticketTypes')

// 当前活动数据（从 eventsMockData 中查找）
const event = ref(null)
// 当前活动对应的票种（从 ticketsMockData 中过滤 event_id 与 eventId 匹配的）
const eventTicketTypes = ref([])
// 票用户数据，使用 usersMockData 的所有数据，并作必要转换
const ticketUsers = ref(
  usersMockData.map(user => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    // 示例数据：假设用户购买票类型为 VIP，购买日期使用 created_at
    ticketType: 'VIP',
    purchaseDate: user.created_at
  }))
)
// 无账号参与者数据直接使用从 participantsMockData 导入的数据
const ticketParticipants = ref([...participantsMockData])

// 搜索、筛选、排序相关状态
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('date')
const sortOrder = ref('desc')

const eventsData = ref([...eventsMockData])

// 计算过滤排序后的活动列表
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

// 页面加载后，根据 eventId 从 mock 数据中查找活动及对应票种数据
onMounted(() => {
  setTimeout(() => {
    const foundEvent = eventsMockData.find(e => e.id === eventId)
    if (foundEvent) {
      event.value = foundEvent
    } else {
      event.value = {
        id: eventId,
        name: 'Event not found',
        description: '',
        date: '',
        time: '',
        location: '',
        address: '',
        organizer: '',
        organizerContact: '',
        status: '',
        capacity: 0,
        ticketsSold: 0,
        revenue: '',
        imageUrl: '',
        features: []
      }
    }
    // 过滤出当前活动的票种
    eventTicketTypes.value = ticketsMockData.filter(ticket => ticket.event_id === eventId)
    loading.value = false
  }, 500)
})

// 方法：票务管理按钮，点击后跳转到票务管理详情页面，传入当前 event 的 id
const manageTickets = (eventId) => {
  // 请确保票务管理详情页面路由配置为 /admin/tickets/ticketsView/:id
  router.push(`/admin/tickets/${eventId}`)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-light text-success'
    case 'Upcoming':
      return 'bg-light text-primary'
    case 'Completed':
      return 'bg-light text-dark'
    case 'Cancelled':
      return 'bg-light text-danger'
    default:
      return 'bg-light text-dark'
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="fs-2 fw-bold text-dark">Ticket Management</h1>
        <p class="text-muted mt-1">Manage and monitor tickets for your events</p>
      </div>
      
      <!-- Action Bar（仅显示搜索与筛选） -->
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
      
      <!-- 活动表格 -->
      <div class="bg-white rounded shadow-sm overflow-hidden">
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
              <tr v-for="event in filteredEvents" :key="event.id" class="border-bottom">
                <td class="px-3 py-2">
                  <div class="fw-medium text-dark">{{ event.name }}</div>
                  <div class="fs-6 text-muted">{{ event.organizer }}</div>
                </td>
                <td class="px-3 py-2">
                  <div class="text-dark">{{ formatDate(event.date) }}</div>
                  <div class="fs-6 text-muted">{{ event.time }}</div>
                </td>
                <td class="px-3 py-2 text-dark">{{ event.location }}</td>
                <td class="px-3 py-2">
                  <span :class="getStatusClass(event.status)" class="px-2 py-1 rounded-pill small fw-medium">
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
                    <!-- 查看详情与票务管理（编辑）按钮 -->
                    <button @click="manageTickets(event.id)" class="btn btn-link text-primary p-0" title="Manage Tickets">
                      <i class="pi pi-pencil"></i>
                    </button>
                </td>
              </tr>
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
.no-border-btn:hover {
  background-color: #e9ecef;
}
</style>



