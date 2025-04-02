<script setup>
import { ref } from 'vue'

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusClass = (status) => {
  return {
    'Active': 'bg-success text-white',
    'Upcoming': 'bg-warning text-dark'
  }[status] || 'bg-secondary text-white'
}
</script>

<template>
  <main>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Event Name</th>
        <th scope="col">Date</th>
        <th scope="col">Status</th>
        <th scope="col">Revenue</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in recentEvents" :key="event.id">
        <td>{{ event.name }}</td>
        <td>{{ formatDate(event.date) }}</td>
        <td>
            <span :class="getStatusClass(event.status)" class="badge">
              {{ event.status }}
            </span>
        </td>
        <td>{{ event.revenue }}</td>
      </tr>
      </tbody>
    </table>
  </main>
</template>

<style>
/* Optional custom styles */
.badge {
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  border-radius: 0.25rem;
}
</style>