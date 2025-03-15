<template> 
  <div class="ticket-selection">
    <!-- back-button -->
    <button class="back-button" @click="$router.go(-1)">←</button>

    <!-- Event icons and titles -->
    <div class="event-header">
      <div class="event-icon">Event icon goes here</div>
      <h1>{{ eventName }}</h1>
    </div>

    <!-- step by step progress bar -->
    <div class="progress-bar">
      <span class="step completed">Ticket selection</span>
      <span class="step">Complete form</span>
      <span class="step">Payment</span>
    </div>

    <!-- Select Ticket Type -->
    <h2 class="section-title">SELECT YOUR TICKETS</h2>

    <!-- Classification of tickets 1 -->
    <div class="ticket-category">
      <h3>TICKET CATEGORY 1</h3>
      <div class="ticket">
        <span>Ticket type 1</span>
        <span>$12.5</span>
        <div class="ticket-quantity">
          <button @click="decreaseTicket(1)">-</button>
          <span>{{ ticketQuantities[1] }}</span>
          <button @click="increaseTicket(1)">+</button>
        </div>
      </div>
      <div class="ticket">
        <span>Ticket type 2</span>
        <span>$12.5</span>
        <div class="ticket-quantity">
          <button @click="decreaseTicket(2)">-</button>
          <span>{{ ticketQuantities[2] }}</span>
          <button @click="increaseTicket(2)">+</button>
        </div>
      </div>
    </div>

    <!-- Classification of tickets 2 -->
    <div class="ticket-category">
      <h3>TICKET CATEGORY 2</h3>
      <div class="ticket">
        <span>Ticket type 3</span>
        <span>$12.5</span>
        <div class="ticket-quantity">
          <button @click="decreaseTicket(3)">-</button>
          <span>{{ ticketQuantities[3] }}</span>
          <button @click="increaseTicket(3)">+</button>
        </div>
      </div>
      <div class="ticket">
        <span>Ticket type 4</span>
        <span>$12.5</span>
        <div class="ticket-quantity">
          <button @click="decreaseTicket(4)">-</button>
          <span>{{ ticketQuantities[4] }}</span>
          <button @click="increaseTicket(4)">+</button>
        </div>
      </div>
    </div>

    <!-- continue-button -->
    <button class="continue-button" @click="goToNextStep">Continue</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventName: 'Event Name', // Event name can be set dynamically
      ticketQuantities: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      }
    };
  },
  methods: {
    increaseTicket(ticketId) {
      this.ticketQuantities[ticketId]++;
    },
    decreaseTicket(ticketId) {
      if (this.ticketQuantities[ticketId] > 0) {
        this.ticketQuantities[ticketId]--;
      }
    },
    goToNextStep() {
      // Skip to next step
      this.$router.push('/complete-form');
    }
  }
};
</script>

<style scoped>
.ticket-selection {
  padding: 20px;
  width: 100%; 
  margin: 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.event-header {
  text-align: center;
  margin-bottom: 20px;
}

.event-icon {
  width: 120px; 
  height: 120px;
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px; 
}

h1 {
  font-size: 36px; 
  font-weight: bold;
  margin-top: 20px;
}

.progress-bar {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  font-size: 16px;
  width: 100%;
}

.step {
  position: relative;
  padding: 5px;
  flex-grow: 1;
  text-align: center;
}

.step.completed {
  color: red;
}

.step:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  height: 2px;
  width: 40px;
  background-color: black;
  transform: translateY(-50%);
}

.step:last-child:after {
  display: none;
}

.section-title {
  text-align: center;
  color: red;
  margin-bottom: 20px;
}

.ticket-category {
  margin-bottom: 20px;
  width: 100%;
}

.ticket {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.ticket-quantity {
  display: flex;
  align-items: center;
}

.ticket-quantity button {
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.ticket-quantity span {
  margin: 0 10px;
}

.continue-button {
  width: 100%;
  padding: 10px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.continue-button:hover {
  background-color: #e65c00;
}

/* 响应式设计 */
/* 适用于小屏幕（例如手机） */
@media (max-width: 768px) {
  .event-icon {
    width: 80px;
    height: 80px;
  }

  h1 {
    font-size: 28px;
  }

  .progress-bar {
    font-size: 14px;
  }

  .ticket {
    flex-direction: column;
    align-items: flex-start;
  }

  .ticket-quantity {
    margin-top: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .continue-button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .ticket-quantity {
    justify-content: space-between;
    width: 100%;
  }

  .progress-bar {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
