<template>
  <main>
    <!-- Role -->
    <h1 style="text-align: center">Admin</h1>
    <!-- Admin Picture - OPTIONAL -->
    <img
      src="../../assets/images/user-profile-icon-free-vector.jpg"
      alt="user-image"
      class="user_img"
    />
    <!-- Admin Name - Update from dtb -->
    <h3 style="text-align: center">User Name</h3>

    <div class="sideNav_container">
      <div class="menu_item">
        <i class="fa-solid fa-gauge-high fa-xl"></i>
        <!-- Link to route -->
        <router-link to="/admin"> <span>Dashboard</span></router-link>
      </div>
      <div class="menu_item">
        <i class="fa-regular fa-newspaper fa-xl"></i>
        <router-link to="/admin/registration"> <span>Registration</span></router-link>
      </div>
      <div class="menu_item">
        <i class="fa-solid fa-calendar-days fa-xl"></i>
        <router-link to="/admin/event"> <span>Event</span></router-link>
      </div>
      <div class="menu_item">
        <i class="fa-regular fa-credit-card fa-xl"></i>
        <router-link to="/admin/payment"> <span>Payment</span></router-link>
      </div>
      <div class="menu_item">
        <i class="fa-regular fa-comment-dots fa-xl"></i>
        <router-link to="/admin/questionaire"> <span>Questionare</span></router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style scoped>
main {
  width: 13%;
  background-color: #909090;
  height: 100%;
  position: fixed;
}

.user_img {
  width: 60%;
  margin-left: 20%;
}

.sideNav_container {
  width: 100%;
  /* margin-left: 5%; */
  margin-top: 10%;
}

.menu_item {
  width: 100%;
  /* padding-left: 5%; */
  padding-top: 15%;
  padding-bottom: 15%;
}

.menu_item:hover {
    background-color: #B02D2D;
}

.menu_item a {
  text-decoration: none;
  margin-left: 10px;
  font-size: 17px;
  font-weight: 400;
  color: white;
}

.menu_item i {
    padding-left: 10%;
}
</style>
