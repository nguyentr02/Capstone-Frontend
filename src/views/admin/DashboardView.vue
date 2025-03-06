<!-- src/views/admin/DashboardView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Mock data for stats cards
const statsData = ref([
  { 
    title: 'Total Events', 
    value: '86', 
    icon: 'pi pi-calendar', 
    change: '+12%', 
    changeType: 'increase',
    bgColor: 'bg-blue-500'
  },
  { 
    title: 'Active Events', 
    value: '38', 
    icon: 'pi pi-check-circle', 
    change: '+5%', 
    changeType: 'increase',
    bgColor: 'bg-green-500'
  },
  { 
    title: 'Total Users', 
    value: '1,285', 
    icon: 'pi pi-users', 
    change: '+18%', 
    changeType: 'increase',
    bgColor: 'bg-purple-500'
  },
  { 
    title: 'Ticket Sales', 
    value: '$34,590', 
    icon: 'pi pi-ticket', 
    change: '-4%', 
    changeType: 'decrease',
    bgColor: 'bg-yellow-500'
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

// Methods for status styling
const getStatusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'Completed':
      return 'bg-gray-100 text-gray-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
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
  
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

    <!-- Stats Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div v-for="(stat, index) in statsData" :key="index" class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-4">
            <!--  -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">{{ stat.title }}</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">{{ stat.value }}</p>
              </div>
              <div :class="`${stat.bgColor} text-white p-3 rounded-lg`">
                <i :class="stat.icon + ' text-xl'"></i>
              </div>
            </div>
            <div class="mt-4">
              <span 
                :class="stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'"
                class="text-sm font-medium flex items-center"
              >
                <i :class="stat.changeType === 'increase' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" class="mr-1"></i>
                {{ stat.change }} since last month
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Sales Chart -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Ticket Sales Overview</h2>
          <div class="h-80">
            <Chart v-if="salesChartData" type="line" :data="salesChartData" :options="salesChartOptions" />
          </div>
        </div>
        
        <!-- Events by Type (placeholder) -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Events by Category</h2>
          <div class="h-80 flex items-center justify-center">
            <p class="text-gray-500">Chart will be implemented</p>
          </div>
        </div>
      </div>
      
      <!-- Tables Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Recent Events Table -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-700">Recent Events</h2>
            <a href="#" class="text-blue-600 text-sm hover:text-blue-800">View all</a>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Event Name</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in recentEvents" :key="event.id" class="border-b hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm text-gray-800">{{ event.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ formatDate(event.date) }}</td>
                  <td class="px-4 py-3 text-sm">
                    <span 
                      :class="getStatusClass(event.status)"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ event.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ event.revenue }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Recent Users Table -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-700">Recent Users</h2>
            <a href="#" class="text-blue-600 text-sm hover:text-blue-800">View all</a>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Registered</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Events</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in recentUsers" :key="user.id" class="border-b hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm text-gray-800">{{ user.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ user.email }}</td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ formatDate(user.registeredDate) }}</td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ user.eventsAttended }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions Row -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="bg-blue-100 text-blue-600 p-3 rounded-full mb-2">
              <i class="pi pi-calendar-plus text-xl"></i>
            </div>
            <p class="font-medium text-gray-800">Create Event</p>
          </div>
          <div class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="bg-green-100 text-green-600 p-3 rounded-full mb-2">
              <i class="pi pi-user-plus text-xl"></i>
            </div>
            <p class="font-medium text-gray-800">Add User</p>
          </div>
          <div class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="bg-purple-100 text-purple-600 p-3 rounded-full mb-2">
              <i class="pi pi-ticket text-xl"></i>
            </div>
            <p class="font-medium text-gray-800">Manage Tickets</p>
          </div>
          <div class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="bg-yellow-100 text-yellow-600 p-3 rounded-full mb-2">
              <i class="pi pi-chart-line text-xl"></i>
            </div>
            <p class="font-medium text-gray-800">View Reports</p>
          </div>
        </div>
      </div>
  </div>

  <div style="background-color: #f0f0f0; padding: 20px; display: flex;">
    Test with direct styles
  </div>
  
  </AdminLayout>
</template>

