<!-- src/views/admin/DashboardView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Mock data for stats cards (更新了背景色为 Bootstrap 类)
const statsData = ref([
  { 
    title: 'Total Events', 
    value: '86', 
    icon: 'pi pi-calendar', 
    change: '+12%', 
    changeType: 'increase',
    bgColor: 'bg-primary'
  },
  { 
    title: 'Active Events', 
    value: '38', 
    icon: 'pi pi-check-circle', 
    change: '+5%', 
    changeType: 'increase',
    bgColor: 'bg-success'
  },
  { 
    title: 'Total Users', 
    value: '1,285', 
    icon: 'pi pi-users', 
    change: '+18%', 
    changeType: 'increase',
    bgColor: 'bg-info'
  },
  { 
    title: 'Ticket Sales', 
    value: '$34,590', 
    icon: 'pi pi-ticket', 
    change: '-4%', 
    changeType: 'decrease',
    bgColor: 'bg-warning'
  }
])

// Mock data for recent events
const recentEvents = ref([
  { 
    id: 1, 
    name: 'Tech Conference 2025', 
    date: '2025-01-15', 
    location: 'San Francisco, CA', 
    status: 'Active', 
    ticketsSold: 450, 
    revenue: '$13,500'
  },
  { 
    id: 2, 
    name: 'Summer Music Festival', 
    date: '2025-06-22', 
    location: 'Austin, TX', 
    status: 'Upcoming', 
    ticketsSold: 320, 
    revenue: '$9,600'
  },
  { 
    id: 3, 
    name: 'Business Leadership Summit', 
    date: '2025-03-10', 
    location: 'Chicago, IL', 
    status: 'Active', 
    ticketsSold: 285, 
    revenue: '$8,550'
  },
  { 
    id: 4, 
    name: 'Food & Wine Expo', 
    date: '2025-04-05', 
    location: 'New York, NY', 
    status: 'Upcoming', 
    ticketsSold: 210, 
    revenue: '$6,300'
  },
  { 
    id: 5, 
    name: 'Charity Gala Dinner', 
    date: '2025-02-28', 
    location: 'Boston, MA', 
    status: 'Active', 
    ticketsSold: 180, 
    revenue: '$18,000'
  }
])

// Mock data for recent users
const recentUsers = ref([
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    registeredDate: '2024-12-20', 
    eventsAttended: 3
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com', 
    registeredDate: '2024-12-18', 
    eventsAttended: 5
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    registeredDate: '2024-12-15', 
    eventsAttended: 2
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily.d@example.com', 
    registeredDate: '2024-12-10', 
    eventsAttended: 1
  }
])

// Chart data
const salesChartData = ref(null)
const salesChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
})

onMounted(() => {
  // Initialize chart data
  salesChartData.value = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Ticket Sales 2024',
        data: [12500, 14800, 18200, 22500, 25300, 28700, 32100, 34500, 37800, 42200, 46500, 52800],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Ticket Sales 2023',
        data: [10200, 12500, 15800, 19500, 22300, 25700, 28600, 31500, 34000, 38200, 42500, 48000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  }
})

// Methods for status styling (转换为 Bootstrap 类)
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
      <h1 class="fs-2 fw-bold text-dark mb-4">Dashboard</h1>

      <!-- Stats Cards Row -->
      <div class="row g-4 mb-4">
        <div v-for="(stat, index) in statsData" :key="index" class="col-12 col-md-6 col-lg-3">
          <div class="bg-white rounded shadow-sm overflow-hidden">
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="fs-6 text-muted">{{ stat.title }}</p>
                  <p class="fs-2 fw-bold text-dark mt-1">{{ stat.value }}</p>
                </div>
                <div :class="stat.bgColor + ' text-white p-3 rounded'">
                  <i :class="stat.icon + ' fs-4'"></i>
                </div>
              </div>
              <div class="mt-3">
                <span :class="stat.changeType === 'increase' ? 'text-success' : 'text-danger'" class="fs-6 d-flex align-items-center">
                  <i :class="stat.changeType === 'increase' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" class="me-1 fs-5"></i>
                  {{ stat.change }} since last month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Charts Row -->
      <div class="row g-4 mb-4">
        <!-- Sales Chart -->
        <div class="col-12 col-lg-6">
          <div class="bg-white rounded shadow-sm p-3">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Ticket Sales Overview</h2>
            <div style="height: 20rem;">
              <Chart v-if="salesChartData" type="line" :data="salesChartData" :options="salesChartOptions" />
            </div>
          </div>
        </div>
        
        <!-- Events by Category (placeholder) -->
        <div class="col-12 col-lg-6">
          <div class="bg-white rounded shadow-sm p-3">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Events by Category</h2>
            <div class="d-flex align-items-center justify-content-center" style="height: 20rem;">
              <p class="text-muted">Chart will be implemented</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tables Row -->
      <div class="row g-4 mb-4">
        <!-- Recent Events Table -->
        <div class="col-12 col-lg-6">
          <div class="bg-white rounded shadow-sm p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="fs-5 fw-semibold text-dark">Recent Events</h2>
              <a href="#" class="text-primary fs-6">View all</a>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Event Name</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Date</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Status</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in recentEvents" :key="event.id">
                    <td class="px-3 py-2 fs-6 text-dark">{{ event.name }}</td>
                    <td class="px-3 py-2 fs-6 text-dark">{{ formatDate(event.date) }}</td>
                    <td class="px-3 py-2 fs-6">
                      <span :class="getStatusClass(event.status)" class="px-2 py-1 rounded-pill small">
                        {{ event.status }}
                      </span>
                    </td>
                    <td class="px-3 py-2 fs-6 text-dark">{{ event.revenue }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Recent Users Table -->
        <div class="col-12 col-lg-6">
          <div class="bg-white rounded shadow-sm p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="fs-5 fw-semibold text-dark">Recent Users</h2>
              <a href="#" class="text-primary fs-6">View all</a>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Name</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Registered</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Events</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in recentUsers" :key="user.id">
                    <td class="px-3 py-2 fs-6 text-dark">{{ user.name }}</td>
                    <td class="px-3 py-2 fs-6 text-dark">{{ user.email }}</td>
                    <td class="px-3 py-2 fs-6 text-dark">{{ formatDate(user.registeredDate) }}</td>
                    <td class="px-3 py-2 fs-6 text-dark">{{ user.eventsAttended }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions Row -->
      <div class="bg-white rounded shadow-sm p-3">
        <h2 class="fs-5 fw-semibold text-dark mb-3">Quick Actions</h2>
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="d-flex flex-column align-items-center justify-content-center p-3 border rounded" style="cursor: pointer;">
              <div class="bg-primary bg-opacity-10 text-primary p-3 rounded-circle mb-2">
                <i class="pi pi-calendar-plus fs-4"></i>
              </div>
              <p class="text-dark fw-normal">Create Event</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="d-flex flex-column align-items-center justify-content-center p-3 border rounded" style="cursor: pointer;">
              <div class="bg-success bg-opacity-10 text-success p-3 rounded-circle mb-2">
                <i class="pi pi-user-plus fs-4"></i>
              </div>
              <p class="text-dark fw-normal">Add User</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="d-flex flex-column align-items-center justify-content-center p-3 border rounded" style="cursor: pointer;">
              <div class="bg-info bg-opacity-10 text-info p-3 rounded-circle mb-2">
                <i class="pi pi-ticket fs-4"></i>
              </div>
              <p class="text-dark fw-normal">Manage Tickets</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="d-flex flex-column align-items-center justify-content-center p-3 border rounded" style="cursor: pointer;">
              <div class="bg-warning bg-opacity-10 text-warning p-3 rounded-circle mb-2">
                <i class="pi pi-chart-line fs-4"></i>
              </div>
              <p class="text-dark fw-normal">View Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="background-color: #f0f0f0; padding: 20px; display: flex;">
      Test with direct styles
    </div>
  </AdminLayout>
</template>

