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


        <h1 style="width: 80%">Report Generation</h1>
        <hr />
        <!-- Direct to create event page -->
      </header>

      <main class="homepage-body">
        <div class="report-selection-export-container">
          <button class="report-export-btn">
                <span>Export Report</span>
              </button>
          <div class = "report-selection">
            <h1>Report Type Selection</h1>
            <div class = "report-types">
              <button class="report-type-btn">
                <span>Add event</span>
              </button>
              <button class="report-type-btn">
                <span>User</span>
              </button>
              <button class="report-type-btn">
                <span>Disbursements</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="report-view">
          <h1>Generated Report View</h1>
          <div class="reportCard">

          </div>
        </div>



      </main>
    </div>
  </template>
  
  <script></script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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

  .homepage {
    /* Shift homepage to next to sideNav */
    width: 87%;
    margin-left: 13%;
  }
  
  header {
    width: 90%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
  }
  

  .homepage-body {
    width: 90%;
    display: flex;
    flex-direction: column;
    padding-left: 5%;
  }
  
  
  .reportCard {
    border: 1px solid black;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    width: 20%;
    margin-top: 2%;
    padding: 12%;
  }
  
  .report-selection-export-container{
    margin-top: 50px;
  }

  .homepage-body h1{
    font-family: "Roboto", sans-serif;
    font-size: 25px;
    font-weight: 700;
  }

  .report-selection {
    flex-direction: column;
  }

  .report-types {
    margin-top: 20px;
    flex-direction: row;
  }

  .report-type-btn {
    color: rgb(0, 0, 0);
    background-color: #dcd5d5;
    border: none;
    width: 11%;
    border-radius: 30px;
    font-size: 15px;
    height: 40px;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin: 0.5%;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
  }

  .report-type-btn:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.3);
    transition: box-shadow 0.5s ease;
  }

  .report-export-btn {
    float: right;
    color: rgb(255, 255, 255);
    background-color: #E83C3C;
    border: none;
    width:11%;
    border-radius: 30px;
    font-size: 15px;
    height: 40px;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin: 0.5%;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
    margin-right: 10%;
  }

  .report-export-btn:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.3);
    transition: box-shadow 0.5s ease;
  }

  .report-view{
    margin-top: 6%;
  }
  </style>


  