<template>
  <div class="tickets-page">
    <div class="content">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="title">Your Tickets</h1>
      <table class="tickets-table">
        <thead>
          <tr>
            <th>Event name</th>
            <th>Location</th>
            <th>Date, Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.name }}</td>
            <td>{{ ticket.location }}</td>
            <td>
              {{ ticket.date }}
              <button class="dropdown-button">
                <i class="fas fa-chevron-down"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: "TicketsPage",
  data() {
    return {
      tickets: [
        { id: 1, name: "Hello Kitty Richmond", location: "10 Bourke, abc, abc", date: "25/10/2024" },
        { id: 2, name: "Hello Kitty Richmond", location: "10 Bourke, abc, abc", date: "25/10/2024" },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Back to previous page
    },
    goToEvents() {
      this.$router.push("/"); // Skip to main page
    },
    goToTickets() {
      this.$router.push("/tickets"); // Jump to Tickets
    },
  },
};
</script>

<style scoped>
.tickets-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  width: 100%;
  height: 60px;
  background-color: #0A075F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo-icon {
  width: 80px;
  height: 50px;
  background-color: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
}

.header-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.link-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.link-button:hover {
  color: #ccc;
}

.content {
  width: 90%;
  max-width: 800px;
  margin-top: 20px;
}

/* Return Button */
.back-button {
  position: fixed;
  left: 30px;
  top: 100px;
  background-color: #f5f5f5;
  border: none;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}


.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.tickets-table {
  width: 100%;
  border-collapse: collapse;
}

.tickets-table th,
.tickets-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tickets-table th {
  background-color: #e0e0e0;
  font-weight: bold;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  margin-left: 10px;
}
</style>
