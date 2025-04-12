<script setup>
import { ref } from 'vue';
import UserTicketTable from "@/components/user/UserTicketTable.vue";
import CoreUI from '@coreui/vue'
import { CFormInput} from '@coreui/vue'

// User data object
const userData = ref({
  name: "Tommy Vercetti",
  birthDate: "05.03.2003",
  address: "161 Collins Street, Melbourne",
  email: "superidol@gmail.com.au",
  phone: "+61 412 490 816",
  gender: "Male",
  idNumber: "05847290478",
  membershipType: "Gold",
  profileImage: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  stats: {
    eventsAttended: 13,
    moneySpent: 1000,
    ticketsBought: 5,
  },
    instagram: "instagram.com/tommy",
    facebook: "facebook.com/tommy",
    X: "x.com/tommy",
});
</script>

<template>
    <link href="https://cdn.jsdelivr.net/npm/@coreui/coreui@5.3.1/dist/css/coreui.min.css" rel="stylesheet" integrity="sha384-PDUiPu3vDllMfrUHnurV430Qg8chPZTNhY8RUpq89lq22R3PzypXQifBpcpE1eoB" crossorigin="anonymous">
    <div class = "container-fluid">
        <div class = "row">
            <div class = "col-lg-3 border-right border-dark">
                <h4 style="font-family: 'Font'">
                    Profile Management
                </h4>
                <div class="profileImageContainer d-flex justify-content-center mt-lg-5">
                        <img
                            :src="userData.profileImage"
                            class=" profile-img rounded-circle"
                            alt="Profile Image"
                        >
                </div>
                
                <div class = "d-flex justify-content-center">
                    <button class="btn btn-light fw-semibold mt-4 mb-4">
                    Change Avatar
                    </button>    
                </div class = "mt-4">
                    <label for="newPassword" style = "margin-bottom: 10px;">New Password</label>
                    <input type="password" class="form-control" id="newPassword" placeholder="Password">
                <div class = "mt-4">
                    <label for="newPasswordRepeat" style = "margin-bottom: 10px;">Repeat New Password</label>
                    <input type="password" class="form-control" id="newPasswordRepeat" placeholder="Password">
                </div>


                <button class="btn btn-light fw-semibold mt-4 mb-4" style = "width: 100%;">
                    Change Password
                </button>    
            </div>
            <div class = "col-lg-9">
                <h4 style="font-family: 'Font'">
                    Profile Info
                </h4>
                <div class = "row">
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="firstName" style = "margin-bottom: 10px;">First Name</label>
                        <input type="text" class = "form-control" id="firstName" :placeholder = "userData.name">
                    </div>
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="lastName" style = "margin-bottom: 10px;">Last Name</label>
                        <input type="text" class = "form-control" id="lastName" :placeholder = "userData.name">
                    </div>
                </div>
                <div class = "row">
                    <div class = "mt-4">
                        <label for="Adress" style = "margin-bottom: 10px;">Address</label>
                        <input type="text" class = "form-control" id="firstName" :placeholder = "userData.address">
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="email" style="margin-bottom: 10px;">Date of Birth</label>
                        <CFormInput type="date" id="dob" v-model="birthDate" />
                    </div>
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="phone" style = "margin-bottom: 10px;">Phone No</label>
                        <input type="text" class = "form-control" id="phone" :placeholder = "userData.phone">
                    </div>
                </div>

                <h4 style="font-family: 'Font'; margin-top: 20px;">
                    Social
                </h4>
                <div class = "row">
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="email" style = "margin-bottom: 10px;">Email</label>
                        <input type="email" class = "form-control" id="email" :placeholder = "userData.email">
                    </div>
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="instagram" style = "margin-bottom: 10px;">Instagram</label>
                        <input type="text" class = "form-control" id="instagram" :placeholder = "userData.instagram">
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="facebook" style = "margin-bottom: 10px;">Facebook</label>
                        <input type="text" class = "form-control" id="facebook" :placeholder = "userData.facebook">
                    </div>
                    <div class = "col-lg-6 col-sm-12 col-6 mt-4">
                        <label for="X" style = "margin-bottom: 10px;">X (Twitter)</label>
                        <input type="text" class = "form-control" id="X" :placeholder = "userData.X">
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>
<style>
@import '@coreui/coreui/dist/css/coreui.min.css';
.profile-img {
width: 200px;  /* Adjust size as needed */
height: 200px;  /* Must match width for perfect circle */
object-fit: cover;  /* Ensures image covers the area without distortion */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* Optional: adds subtle shadow */
}
</style>