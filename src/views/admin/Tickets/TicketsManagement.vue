<!-- src/views/admin/Tickets/TicketsManagement.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 导入各个 mock 数据
import { eventsMockData } from '@/mock/eventsMock.js'
import { ticketsMockData } from '@/mock/ticketsMockData.js'
import { usersMockData } from '@/mock/usersMock.js'
import { participantsMockData } from '@/mock/participantsMockData.js'

const route = useRoute()
const router = useRouter()
// 注意：路由配置中使用的动态参数名称为 :eventId，所以这里使用 route.params.eventId
const eventId = parseInt(route.params.eventId)

// 页面状态
const loading = ref(true)
const activeTab = ref('ticketTypes')

// 当前活动数据
const event = ref(null)
// 当前活动对应的票种数据（使用 ticketsMockData 过滤，注意数量字段为 quantity_total）
const eventTicketTypes = ref([])

// Ticket Users 数据（这里只取前 2 条示例数据，可根据实际情况调整）
const ticketUsers = ref(
  usersMockData.slice(0, 2).map(user => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    ticketType: 'VIP',           // 示例数据
    purchaseDate: '2025-01-10T10:00:00Z'
  }))
)
// Participants 数据
const ticketParticipants = ref([...participantsMockData])

// 页面加载后，根据 eventId 查找当前活动和票种数据
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
    // 注意：票种数据中使用 quantity_total 表示总票数
    eventTicketTypes.value = ticketsMockData.filter(ticket => ticket.event_id === eventId)
    loading.value = false
  }, 500)
})

// ----------------------------
// Ticket Users - 搜索相关变量与 computed（排序逻辑仍存在，但只保留搜索控件）
const userSearchQuery = ref('')
const userSortBy = ref('name')          // 排序字段：'name' 或 'purchaseDate'
const userSortOrder = ref('asc')        // 'asc' 或 'desc'

const filteredTicketUsers = computed(() => {
  let result = ticketUsers.value.filter(user => {
    const query = userSearchQuery.value.toLowerCase()
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.ticketType.toLowerCase().includes(query)
    )
  })
  // 这里依然使用排序逻辑，以便点击表头可以切换排序顺序
  result.sort((a, b) => {
    let compare = 0
    if (userSortBy.value === 'name') {
      compare = a.name.localeCompare(b.name)
    } else if (userSortBy.value === 'purchaseDate') {
      compare = new Date(a.purchaseDate) - new Date(b.purchaseDate)
    }
    return userSortOrder.value === 'asc' ? compare : -compare
  })
  return result
})

// 切换 Ticket Users 排序顺序
const toggleUserSortOrder = () => {
  userSortOrder.value = userSortOrder.value === 'asc' ? 'desc' : 'asc'
}

// ----------------------------
// Participants - 搜索相关变量与 computed
const participantSearchQuery = ref('')
const participantSortBy = ref('name')    // 排序字段：'name' 或 'purchaseDate'
const participantSortOrder = ref('asc')  // 'asc' 或 'desc'

const filteredParticipants = computed(() => {
  let result = ticketParticipants.value.filter(participant => {
    const query = participantSearchQuery.value.toLowerCase()
    const fullName = (participant.first_name + ' ' + participant.last_name).toLowerCase()
    return (
      fullName.includes(query) ||
      participant.email.toLowerCase().includes(query)
    )
  })
  result.sort((a, b) => {
    let compare = 0
    if (participantSortBy.value === 'name') {
      const nameA = a.first_name + ' ' + a.last_name
      const nameB = b.first_name + ' ' + b.last_name
      compare = nameA.localeCompare(nameB)
    } else if (participantSortBy.value === 'purchaseDate') {
      // 使用 created_at 作为排序依据
      compare = new Date(a.created_at) - new Date(b.created_at)
    }
    return participantSortOrder.value === 'asc' ? compare : -compare
  })
  return result
})

// 切换 Participants 排序顺序
const toggleParticipantSortOrder = () => {
  participantSortOrder.value = participantSortOrder.value === 'asc' ? 'desc' : 'asc'
}

// ----------------------------
// 跳转和操作方法
const viewTicketDetails = (ticketId) => {
  router.push(`/admin/tickets/${ticketId}`)
}
const editTicket = (ticketId) => {
  router.push(`/admin/tickets/edit/${ticketId}`)
}
const createTicketType = () => {
  router.push('/admin/tickets/create')
}
const deleteTicket = (ticketId) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    eventTicketTypes.value = eventTicketTypes.value.filter(ticket => ticket.id !== ticketId)
  }
}

const viewTicketUserDetails = (userId) => {
  router.push(`/admin/tickets/users/${userId}`)
}
const deleteTicketUser = (userId) => {
  if (confirm('Are you sure you want to delete this ticket user?')) {
    ticketUsers.value = ticketUsers.value.filter(user => user.id !== userId)
  }
}

const viewParticipantDetails = (participantId) => {
  router.push(`/admin/tickets/participants/${participantId}`)
}
const deleteParticipant = (participantId) => {
  if (confirm('Are you sure you want to delete this participant?')) {
    ticketParticipants.value = ticketParticipants.value.filter(participant => participant.id !== participantId)
  }
}

// 格式化日期函数
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
    <div class="p-3">
      <!-- Loading 状态 -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 16rem;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- 主内容 -->
      <div v-else>
        <!-- 返回按钮 -->
        <button @click="router.push('/admin/tickets')" class="btn btn-link text-primary mb-3" title="Back">
          <i class="pi pi-arrow-left"></i>
          Back to Tickets
        </button>
        <!-- 当前活动基本信息 -->
        <div class="mb-4">
          <h1 class="fs-2 fw-bold text-dark">{{ event.name }}</h1>
          <div class="d-flex align-items-center">
            <span class="px-2 py-1 rounded-pill small fw-semibold"
                  :class="{
                    'bg-light text-success': event.status === 'Active',
                    'bg-light text-primary': event.status === 'Upcoming',
                    'bg-light text-dark': event.status === 'Completed',
                    'bg-light text-danger': event.status === 'Cancelled'
                  }">
              {{ event.status }}
            </span>
            <span class="text-muted ms-2">{{ formatDate(event.date) }}</span>
          </div>
        </div>

        <!-- Tabs 导航 -->
        <div class="bg-white rounded shadow-sm overflow-hidden mb-4">
          <div class="d-flex border-bottom">
            <button @click="activeTab = 'ticketTypes'" type="button"
                    class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                    :class="activeTab === 'ticketTypes' ? 'text-primary' : 'text-muted'">
              Ticket Types
            </button>
            <button @click="activeTab = 'ticketUsers'" type="button"
                    class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                    :class="activeTab === 'ticketUsers' ? 'text-primary' : 'text-muted'">
              Ticket Users
            </button>
            <button @click="activeTab = 'participants'" type="button"
                    class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                    :class="activeTab === 'participants' ? 'text-primary' : 'text-muted'">
              Participants
            </button>
          </div>
        </div>

        <!-- Tab 内容 -->
        <div class="bg-white rounded shadow-sm p-4">
          <!-- Ticket Types Tab -->
          <div v-if="activeTab === 'ticketTypes'">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="fs-5 fw-semibold text-dark mb-0">Ticket Types</h2>
              <button @click="createTicketType" type="button" class="btn btn-primary">
                <i class="pi pi-plus me-1"></i> New Ticket Type
              </button>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr class="bg-light border-bottom">
                    <th class="px-3 py-2 text-start fs-6 text-muted">Ticket Name</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">Price ($)</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">Sold</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">Available</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">Total</th>
                    <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ticket in eventTicketTypes" :key="ticket.id" class="border-bottom">
                    <td class="px-3 py-2 text-dark">{{ ticket.name }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ ticket.price }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ ticket.quantity_sold }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ ticket.quantity_total - ticket.quantity_sold }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ ticket.quantity_total }}</td>
                    <td class="px-3 py-2 text-center">
                      <div class="d-flex justify-content-center gap-2">
                        <button @click="viewTicketDetails(ticket.id)" class="btn btn-link text-primary p-0" title="View Ticket Details">
                          <i class="pi pi-eye"></i>
                        </button>
                        <button @click="editTicket(ticket.id)" class="btn btn-link text-success p-0" title="Edit Ticket">
                          <i class="pi pi-pencil"></i>
                        </button>
                        <button @click="deleteTicket(ticket.id)" class="btn btn-link text-danger p-0" title="Delete Ticket">
                          <i class="pi pi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="eventTicketTypes.length === 0">
                    <td colspan="6" class="px-3 py-4 text-center text-muted">
                      <div class="d-flex flex-column align-items-center">
                        <i class="pi pi-ticket-minus fs-1 mb-2"></i>
                        <p class="fw-medium">No tickets found</p>
                        <p class="fs-6 mt-1">Try adding a new ticket type.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Ticket Users Tab -->
          <div v-if="activeTab === 'ticketUsers'">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Ticket Users</h2>
            <!-- 搜索控件 -->
            <div class="d-flex justify-content-start align-items-center mb-3">
              <input v-model="userSearchQuery" type="text" class="form-control" placeholder="Search ticket users..." style="max-width:300px;" />
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr class="bg-light border-bottom">
                    <!-- 点击表头进行排序，统一右对齐 -->
                    <th class="px-3 py-2 text-start fs-6 text-muted">
                      <div style="cursor: pointer;" class="d-flex justify-content-start align-items-center" @click="userSortBy = 'name'; toggleUserSortOrder()">
                        Name
                        <i v-if="userSortBy === 'name'" :class="userSortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                      </div>
                    </th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">Ticket Type</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">
                      <!-- Purchase Date 列头设置右对齐 -->
                      <div style="cursor: pointer;" class="d-flex justify-content-end align-items-center" @click="userSortBy = 'purchaseDate'; toggleUserSortOrder()">
                        Purchase Date
                        <i v-if="userSortBy === 'purchaseDate'" :class="userSortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                      </div>
                    </th>
                    <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in filteredTicketUsers" :key="user.id" class="border-bottom">
                    <td class="px-3 py-2 text-dark">{{ user.name }}</td>
                    <td class="px-3 py-2 text-dark">{{ user.email }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ user.ticketType }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ formatDate(user.purchaseDate) }}</td>
                    <td class="px-3 py-2 text-center">
                      <div class="d-flex justify-content-center gap-2">
                        <button @click="viewTicketUserDetails(user.id)" class="btn btn-link text-primary p-0" title="View Ticket User Details">
                          <i class="pi pi-eye"></i>
                        </button>
                        <button @click="deleteTicketUser(user.id)" class="btn btn-link text-danger p-0" title="Delete Ticket User">
                          <i class="pi pi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredTicketUsers.length === 0">
                    <td colspan="5" class="px-3 py-4 text-center text-muted">
                      <div class="d-flex flex-column align-items-center">
                        <i class="pi pi-user-minus fs-1 mb-2"></i>
                        <p class="fw-medium">No ticket users found</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Participants Tab -->
          <div v-if="activeTab === 'participants'">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Ticket Participants</h2>
            <!-- 搜索控件 -->
            <div class="d-flex justify-content-start align-items-center mb-3">
              <input v-model="participantSearchQuery" type="text" class="form-control" placeholder="Search participants..." style="max-width:300px;" />
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr class="bg-light border-bottom">
                    <th class="px-3 py-2 text-start fs-6 text-muted">
                      <div style="cursor: pointer;" class="d-flex justify-content-start align-items-center" @click="participantSortBy = 'name'; toggleParticipantSortOrder()">
                        Name
                        <i v-if="participantSortBy === 'name'" :class="participantSortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                      </div>
                    </th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">
                      <div style="cursor: pointer;" class="d-flex justify-content-end align-items-center" @click="participantSortBy = 'purchaseDate'; toggleParticipantSortOrder()">
                        Purchase Date
                        <i v-if="participantSortBy === 'purchaseDate'" :class="participantSortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'" class="ms-1"></i>
                      </div>
                    </th>
                    <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="participant in filteredParticipants" :key="participant.id" class="border-bottom">
                    <td class="px-3 py-2 text-dark">{{ participant.first_name + ' ' + participant.last_name }}</td>
                    <td class="px-3 py-2 text-dark">{{ participant.email }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ formatDate(participant.created_at) }}</td>
                    <td class="px-3 py-2 text-center">
                      <div class="d-flex justify-content-center gap-2">
                        <button @click="viewParticipantDetails(participant.id)" class="btn btn-link text-primary p-0" title="View Participant Details">
                          <i class="pi pi-eye"></i>
                        </button>
                        <button @click="deleteParticipant(participant.id)" class="btn btn-link text-danger p-0" title="Delete Participant">
                          <i class="pi pi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredParticipants.length === 0">
                    <td colspan="4" class="px-3 py-4 text-center text-muted">
                      <div class="d-flex flex-column align-items-center">
                        <i class="pi pi-user-minus fs-1 mb-2"></i>
                        <p class="fw-medium">No participants found</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> <!-- End Tab Content -->
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.no-border-btn:hover {
  background-color: #e9ecef;
}
</style>






