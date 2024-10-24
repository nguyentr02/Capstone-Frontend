<template>
  <div class="homepage">
    <header>
      <h1 style="width: 80%">Dashboard Overview Widget</h1>
      <!-- Direct to create event page -->
      <button class="addEvent-btn">
        <i class="fa-solid fa-plus fa-xxl"></i>
        <span>Add event</span>
      </button>
    </header>
    <main class="homepage-body">
      <div class="noneChart-report">
        <div class="container" id="top-container">
          <div class="reportCard">
            <h3>Total Registration</h3>
            <p>Number of Registerd:</p>
          </div>
          <div class="reportCard">
            <h3>Questionnaire Completion Rate</h3>
            <p>Questionnaire completion rate:</p>
          </div>
        </div>
        <div class="container" id="bottom-container">
          <div class="reportCard">
            <h3>Total Events</h3>
            <p>number of registered events:</p>
          </div>
          <div class="reportCard">
            <h3>Completed Payments</h3>
            <p>Number of payments:</p>
          </div>
        </div>
      </div>
      <div class="chart-report">
        <h2>Data Chart</h2>
        <div class="chartReport-container">
          <div class="chartReport-card">
            <!-- Sample since dont have any data -->
            <h3>Registrations Over Time</h3>
          </div>
          <div class="chartReport-card">
            <!-- Sample since dont have any data -->
            <h3>Revenue Statistics</h3>
          </div>
          <div class="chartReport-card">
            <!-- Sample since dont have any data -->
            <h3>Questionnaire Completion Rate Pie Chart</h3>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script></script>

<style scoped>
.homepage {
  /* Shift homepage to next to sideNav */
  width: 87%;
  margin-left: 13%;
}

header {
  width: 90%;
  padding-top: 2%;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
}

.addEvent-btn {
  float: right;
  color: white;
  background-color: #f66a07;
  border: none;
  width: 15%;
  border-radius: 30px;
  font-size: 15px;
}

.addEvent-btn i {
  margin-right: 5%;
}

.homepage-body {
  width: 100%;
}

.noneChart-report {
  margin-top: 2%;
}

.container {
  display: flex;
  flex-direction: row;
  padding: 3%;
}

.reportCard {
  border: 1px solid black;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  width: 40%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 2%;
}

.reportCard h3 {
  margin-bottom: 3%;
}

.chart-report {
  width: 96%;
  margin-left: 2%;
}

.chartReport-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1%;
}

.chartReport-card {
  width: 30%;
  margin-left: 1.1%;
  margin-right: 1.1%;
  border: 1px solid black;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
}

.chartReport-card h3 {
  padding: 3%;
}
</style>
