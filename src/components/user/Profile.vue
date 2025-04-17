<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-12 col-xl-3 profileText">
        <div class="userDetails rounded p-4 bg-secondary">
          <div class="d-flex justify-content-center mt-4">
            <h3>
              {{ userProfileData.firstName }} {{ userProfileData.lastName }}
            </h3>
          </div>

          <hr />
          <div class="d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class="pi pi-envelope m-2"></i>
            <span>{{ userProfileData.email }}</span>
          </div>
          <div class="d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class="pi pi-phone m-2"></i>
            <span>{{ userProfileData.phoneNo }}</span>
          </div>

          <hr />
          <div class="d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class="pi pi-user m-2"></i>
            <span>ID Number:</span>
            <span class="bold-text">&nbsp;{{ userProfileData.id }}</span>
          </div>
        </div>
      </div>

      <div class="col lg-12 col-xl-9 mt-4">
        <div class="row">
          <div class="col-lg-4 col-12">
            <div class="rounded p-3 bg-white">
              <div class="fas fa-calendar-alt">Events Attended</div>
              <div class="report-number">13</div>
              <div>All Time</div>
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="rounded p-3 bg-white">
              <div class="fas fa-dollar-sign">Money Spent</div>
              <div class="report-number">$1,000</div>
              <div>All Time</div>
            </div>
          </div>

          <div class="col-lg-4 col-12">
            <div class="rounded p-3 bg-white">
              <div class="fas fa-dollar-sign">Money Spent</div>
              <div class="report-number">$1,000</div>
              <div>All Time</div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="row mb-4 mt-4">
            <!-- Sales Chart -->
            <div class="col-md-6 mb-4 mb-md-0">
              <div class="card shadow-sm h-100 border-0">
                <div class="card-body">
                  <h5 class="card-title text-dark mb-4">
                    Ticket Sales Overview
                  </h5>
                  <div style="height: 320px">
                    <Chart
                      v-if="salesChartData"
                      type="line"
                      :data="salesChartData"
                      :options="salesChartOptions"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Events by Type -->
            <div class="col-md-6">
              <div class="card shadow-sm h-100 border-0">
                <div class="card-body">
                  <h5 class="card-title text-dark mb-4">Events by Category</h5>
                  <div
                    class="h-100 d-flex align-items-center justify-content-center"
                    style="height: 320px"
                  >
                    <p class="text-muted">Chart will be implemented</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-12">
            <div class="rounded p-3 bg-white">
              <div class="fas fa-calendar-alt">Events Attended</div>
              <div class="report-number">13</div>
              <div>All Time</div>
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="rounded p-3 bg-white">
              <div class="fas fa-dollar-sign">Money Spent</div>
              <div class="report-number">$1,000</div>
              <div>All Time</div>
            </div>
          </div>

          <div class="col-lg-4 col-12">
            <div class="rounded p-3 bg-white">
              <div class="fas fa-dollar-sign">Money Spent</div>
              <div class="report-number">$1,000</div>
              <div>All Time</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="bg-white p-4 rounded">
            <div
              class="font-weight-bold text-gray-700 bold-text mb-3"
              style="font-size: 25px"
            >
              Ticket Bought
            </div>
            <div class="table-responsive">
              <UserTicketTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import UserTicketTable from "@/components/user/UserTicketTable.vue";
</script>

<script>
export default {
  // Receive Data from parent component/view
  props: {
    userProfileData: {
      type: Object,
    },
  },
};
</script>

<style scoped>
d-flex {
  cursor: pointer;
}
.userDetails {
  min-height: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: adds subtle shadow */
}

.profile-img {
  width: 200px; /* Adjust size as needed */
  height: 200px; /* Must match width for perfect circle */
  object-fit: cover; /* Ensures image covers the area without distortion */
  border: 4px solid white; /* Optional: adds a border around the circle */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: adds subtle shadow */
}

.profileText {
  color: azure;
}

.bold-text {
  font-weight: bold;
}

.report-number {
  font-weight: bold;
  font-size: 40px;
}

/* For responsive sizing */
@media (max-width: 768px) {
  .profile-img {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 768px) {
  .report-number {
    font-size: 30px;
  }
}
</style>
