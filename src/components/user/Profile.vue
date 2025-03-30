<template>
    <main>
        <div class="container mt-4">
            <div class =row>
                <div class="col-md-12 col-xl-3 profileText">
                    <div class="userDetails rounded p-4">
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
                        <div class = "d-flex justify-content-start m-2 mt-3 ">
                            <i class = "fas fa-map-marked me-2"></i> 161 Collins Street, Melbourne
                        </div>
                        <div class = "d-flex justify-content-start m-2 mt-3">
                            <i class = "fas fa-envelope-open me-2"></i> superidol@gmail.com
                        </div>
                        <div class = "d-flex justify-content-start m-2 mt-3">
                            <i class = "fas fa-phone me-2"></i> +61 412 490 816
                        </div>
                        
                        <hr/>
                        <div class = "d-flex justify-content-start m-2 mt-3">
                            <i class = "fas fa-venus-mars me-2"></i> 
                            <span> Gender: </span> 
                            <span class = "bold-text me-2">  &nbsp Male</span>
                        </div>
                        <div class = "d-flex justify-content-start m-2 mt-3">
                            <i class = " fas fa-address-card me-2"></i>
                            <span> ID Number: </span> 
                            <span class = "bold-text me-2">  &nbsp 05847290478</span>
                        </div>
                        <div class = "d-flex justify-content-start m-2 mt-3">
                            <i class = "fas fa-phone me-2"></i> 
                            <span> Membership Type: </span> 
                            <span class = "bold-text me-2">  &nbsp Gold</span>
                        </div>
                    </div>
                </div>

                <div class = "col md-12 col-xl-9 mt-4">
                    <div class = "row">
                        <div class = "col-md-6 col-sm-12">
                            <div class = "border rounded p-4">
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
                        <div class = "col-md-6 col-sm-12">
                            <div class = "border rounded p-4">
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
                    <div class = "mt-4">
                        <UserTicketTable/>
                    </div>
                </div>
            </div>

            

        </div>
    </main>
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
    background-color: #076895;
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