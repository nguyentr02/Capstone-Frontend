<!-- src/views/admin/DashboardView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// import Chart from 'primevue/chart'
// import Card from 'primevue/card'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/column'
// import Tag from 'primevue/tag'
// import Checkbox from 'primevue/checkbox'

// // Stats data
// const statsData = ref([
//   { title: 'Total Revenue', value: '40,886,200', period: 'Total income', change: '98%', trend: 'up' },
//   { title: 'Orders', value: '275,800', period: 'New orders', change: '20%', trend: 'up' },
//   { title: 'Visits', value: '106,120', period: 'New visits', change: '44%', trend: 'up' },
//   { title: 'User Activity', value: '80,600', period: 'In first month', change: '38%', trend: 'down' }
// ])

// // Chart data
// const chartData = ref(null)
// const chartOptions = ref(null)

// // Project list data
// const projects = ref([
//   { status: 'Pending', date: '11:20pm', user: 'Samantha', value: '24%' },
//   { status: 'Cancelled', date: '10:40am', user: 'Monica', value: '66%' },
//   { status: 'Pending', date: '01:30pm', user: 'John', value: '54%' },
//   { status: 'Pending', date: '02:20pm', user: 'Agnes', value: '12%' },
//   { status: 'Pending', date: '09:40pm', user: 'Janet', value: '22%' },
//   { status: 'Completed', date: '04:10am', user: 'Amelia', value: '66%' }
// ])

// // Todo list data
// const todos = ref([
//   { id: 1, text: 'Buy a milk', completed: true },
//   { id: 2, text: 'Go to shop and find some products', completed: false },
//   { id: 3, text: 'Send documents to Mike', completed: false },
//   { id: 4, text: 'Go to the doctor dr Smith', completed: false },
//   { id: 5, text: 'Plan vacation', completed: true },
//   { id: 6, text: 'Create new stuff', completed: false }
// ])

// // Transactions data
// const transactions = ref([
//   { no: 1, transaction: 'Security doors', date: '16 Jun 2023', amount: '$895.00' },
//   { no: 2, transaction: 'Wardrobes', date: '16 Jun 2023', amount: '$827.00' },
//   { no: 3, transaction: 'Set of tools', date: '12 Jun 2023', amount: '$125.00' },
//   { no: 4, transaction: 'Panoramic pictures', date: '22 Jun 2023', amount: '$344.00' },
//   { no: 5, transaction: 'Phones', date: '24 Jun 2023', amount: '$235.00' }
// ])

// onMounted(() => {
//   // Initialize chart data
//   chartData.value = {
//     labels: ['Jan 03', 'Jan 06', 'Jan 09', 'Jan 12', 'Jan 15', 'Jan 18', 'Jan 21', 'Jan 24', 'Jan 27', 'Jan 30'],
//     datasets: [
//       {
//         type: 'bar',
//         label: 'Number of orders',
//         backgroundColor: '#4ade80',
//         data: [500, 550, 650, 550, 600, 700, 650, 600, 650, 700]
//       },
//       {
//         type: 'line',
//         label: 'Payments',
//         borderColor: '#3b82f6',
//         borderWidth: 2,
//         fill: false,
//         data: [250, 300, 350, 300, 350, 400, 350, 400, 450, 500]
//       }
//     ]
//   }

//   chartOptions.value = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           display: true,
//           color: '#e5e7eb'
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         }
//       }
//     },
//     plugins: {
//       legend: {
//         position: 'top'
//       }
//     }
//   }
// })

// const getStatusSeverity = (status) => {
//   switch (status) {
//     case 'Completed':
//       return 'success'
//     case 'Cancelled':
//       return 'danger'
//     case 'Pending':
//       return 'warning'
//     default:
//       return 'info'
//   }
// }
</script>

<template>
  <AdminLayout>
    This is the dashboard view.
    <div style="background-color: #f0f0f0; padding: 20px; display: flex;">
  Test with direct styles
</div>
    
  </AdminLayout>
</template>

