<template>

  <div class="container-fluid mt-4" >
    <div class =row>
      <div class="col-md-12 col-xl-3 profileText">
        <div class="userDetails rounded p-4 bg-secondary">
          <div class="profileImageContainer d-flex justify-content-center">
            <img
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                class="profile-img rounded-circle"
                alt="Profile Image"
            >
          </div>
          <div class = "d-flex justify-content-center mt-4">
            <h3>Tommy Vercetti</h3>

          </div>
          <div class = "d-flex justify-content-center mb-1">
            <span>05.03.2003</span>
          </div>

          <hr/>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = "pi pi-map-marker m-2"></i>
            <span> 161 Collins Street, Melbourne</span>
          </div>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = "pi pi-envelope m-2"></i>
            <span class = "">superidol@gmail.com</span>
          </div>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = "pi pi-phone m-2"></i> +61 412 490 816
          </div>

          <hr/>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center ">
            <i class = "pi pi-heart m-2"></i>
            <span> Gender: </span>
            <span class = "bold-text ">  &nbsp Male</span>
          </div>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = " pi pi-user m-2"></i>
            <span> ID Number: </span>
            <span class = "bold-text ">  &nbsp 05847290478</span>
          </div>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = "pi pi-info-circle m-2"></i>
            <span> Membership Type: </span>
            <span class = "bold-text ">  &nbsp Gold</span>
          </div>
          <hr/>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = "fas fa-venus-mars m-2"></i>
            <span> Gender: </span>
            <span class = "bold-text">  &nbsp Male</span>
          </div>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = " fas fa-address-card m-2"></i>
            <span> ID Number: </span>
            <span class = "bold-text">  &nbsp 05847290478</span>
          </div>
          <div class = "d-flex justify-content-start m-2 mt-3 align-items-center">
            <i class = "fas fa-phone m-2"></i>
            <span> Membership Type: </span>
            <span class = "bold-text">  &nbsp Gold</span>
          </div>
        </div>


      </div>

      <div class = "col lg-12 col-xl-9 mt-4">
        <div class = "row">
          <div class = "col-lg-4 col-12 ">
            <div class = " rounded p-3 bg-white">
              <div class = "	fas fa-calendar-alt">
                Events Attended
              </div>
              <div class = "report-number">
                13
              </div>
              <div>
                All Time
              </div>
            </div>
          </div>
          <div class = "col-lg-4 col-12">
            <div class = " rounded p-3 bg-white">
              <div class = "	fas fa-dollar-sign">
                Money Spent
              </div>
              <div class = "report-number">
                $1,000
              </div>
              <div>
                All Time
              </div>
            </div>
          </div>

          <div class = "col-lg-4 col-12">
            <div class = " rounded p-3 bg-white">
              <div class = "	fas fa-dollar-sign">
                Money Spent
              </div>
              <div class = "report-number">
                $1,000
              </div>
              <div>
                All Time
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="row mb-4 mt-4 ">
            <!-- Sales Chart -->
            <div class="col-md-6 mb-4 mb-md-0">
              <div class="card shadow-sm h-100 border-0">
                <div class="card-body">
                  <h5 class="card-title text-dark mb-4">Ticket Sales Overview</h5>
                  <div style="height: 320px;">
                    <Chart v-if="salesChartData" type="line" :data="salesChartData" :options="salesChartOptions" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Events by Type -->
            <div class="col-md-6">
              <div class="card shadow-sm h-100 border-0">
                <div class="card-body">
                  <h5 class="card-title text-dark mb-4">Events by Category</h5>
                  <div class="h-100 d-flex align-items-center justify-content-center" style="height: 320px;">
                    <p class="text-muted">Chart will be implemented</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class = "col-lg-4 col-12 ">
            <div class = " rounded p-3 bg-white">
              <div class = "	fas fa-calendar-alt">
                Events Attended
              </div>
              <div class = "report-number">
                13
              </div>
              <div>
                All Time
              </div>
            </div>
          </div>
          <div class = "col-lg-4 col-12">
            <div class = " rounded p-3 bg-white">
              <div class = "	fas fa-dollar-sign">
                Money Spent
              </div>
              <div class = "report-number">
                $1,000
              </div>
              <div>
                All Time
              </div>
            </div>
          </div>

          <div class = "col-lg-4 col-12">
            <div class = " rounded p-3 bg-white">
              <div class = "	fas fa-dollar-sign">
                Money Spent
              </div>
              <div class = "report-number">
                $1,000
              </div>
              <div>
                All Time
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class = "row mt-4" >
      <div class = "bg-white">
        <div class =" font-weight-bold text-gray-700 bold-text m-4" style="font-size: 25px">Ticket Bought</div>
        <UserTicketTable/>
      </div>
    </div>
  </div>
</template>

<script>
import UserTicketTable from "@/components/user/UserTicketTable.vue"
export default {
components: {
  UserTicketTable
}
}
</script>

<style scoped>

d-flex {
cursor: pointer;
}
.userDetails {
min-height: 300px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* Optional: adds subtle shadow */
}

.profile-img {
width: 200px;  /* Adjust size as needed */
height: 200px;  /* Must match width for perfect circle */
object-fit: cover;  /* Ensures image covers the area without distortion */
border: 4px solid white;  /* Optional: adds a border around the circle */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* Optional: adds subtle shadow */
}

.profileText {
color:azure;

}

.bold-text{
font-weight: bold;
}

.report-number{
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
  font-size: 30px
}
}


</style>