<template>
  <div class="homepage">
    <header>
      <div class="search-bar-noti-container">
        <div class="search-bar">
          <button type="submit">
            <i class="fa fa-search"></i> <!-- Use a search icon if you have Font Awesome or similar icons -->
          </button>
          <input type="text" placeholder="Search" aria-label="Search">
        </div>
      </div>


      <h1 style="width: 80%">Admin Overview Widget</h1>
      <hr />
      <!-- Direct to create event page -->
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

        <div class ="title-button-row">
          <h2>Data Chart</h2>
          <button class="report-export-btn">
            <span>Generating Reports</span>
          </button>
        </div>
        <div class="chartReport-container">
          <div class="chartReport-card">
            <h3>Registrations Over Time</h3>
            <LineChart :data="registrationsData" :options="chartOptions" />
          </div>
          <div class="chartReport-card">
            <!-- Sample since dont have any data -->
            <h3>Revenue Statistics</h3>
            <BarChart :data="revenueData" :options="chartOptions" />
          </div>
          <div class="chartReport-card">
            <!-- Sample since dont have any data -->
            <h3>Questionnaire Completion Rate Pie Chart</h3>
            <PieChart :data="completionData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { Line, Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, PointElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, PointElement, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    LineChart: Line,
    BarChart: Bar,
    PieChart: Pie,
  },
  setup() {
    const registrationsData = ref({
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Registrations',
        backgroundColor: '#3498db',
        data: [10, 25, 15, 30],
      }],
    });

    const revenueData = ref({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue',
        backgroundColor: '#27ae60',
        data: [1000, 1500, 1200, 2000, 1800, 2500],
      }],
    });

    const completionData = ref({
      labels: ['Completed', 'Pending'],
      datasets: [{
        backgroundColor: ['#f39c12', '#e74c3c'],
        data: [70, 30],
      }],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: true,
    });

    return {
      registrationsData,
      revenueData,
      completionData,
      chartOptions,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.homepage {
  /* Shift homepage to next to sideNav */
  width: 87%;
  padding-left: 13%;
}

.chartReport-card canvas {
  width: 80% !important;
  height: 80% !important;
}

h2{
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  font-weight: 700;
}

header {
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}

header h1{
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  font-weight: 700;
}

header hr{
  margin-top: 10px;
  height: 1px;
  background-color: black;
}
.search-bar-noti-container {
  flex-direction: column;
}

.search-bar {
  float: right;
  margin-top: 10px;
  right: 50px;
  background-color: #F7E3E3;
  border-radius: 40px;
  width: 20%;
  padding: 1%;
}

.search-bar input[type="text"] {
  border: none;
  outline: none;
  padding: 5px;
  font-size: 16px;
  width: 80%;
  background-color: #F7E3E3;
}

.search-bar button {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}


.search-bar button i {
  font-size: 18px;
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
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
}

.noneChart-report {
  margin-top: 2%;
}

.container {
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
  padding: 3%
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
  font-family: "Roboto", sans-serif;
  width: 30%;
  margin-left: 1.1%;
  margin-right: 1.1%;
  border: 1px solid black;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
}

.chartReport-card h3 {
  padding: 3%;
}

.report-export-btn {
  color: rgb(255, 255, 255);
  background-color: #E83C3C;
  border: none;
  width: 12%;
  border-radius: 30px;
  font-size: 15px;
  height: 40px;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin: 0.5%;
  margin-left: 40px;
  cursor: pointer;
  transition: box-shadow 0.5s ease;
}

.report-export-btn:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.3);
  transition: box-shadow 0.5s ease;
}

.title-button-row h2 {
  padding-top: 10px;
}

.title-button-row{
  display: flex;
  flex-direction: row;
}
</style>
