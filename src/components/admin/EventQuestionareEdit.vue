<template>
  <main class="questionnaire-container">
    <header class="header-section">
      <h1 class="admin-title">Admin</h1>
      <div class="divider"></div>
      <h2 class="event-title">Event questionare</h2>
    </header>
    
    <h1 class="page-title">Event questionare Edit</h1>
    
    <section class="content-wrapper">
      <div class="form-columns">
        <form class="question-form">
          <div class="input-group">
            <label for="firstName" class="field-label"><option value="">First name</option></label>
            <input type="text" id="firstName" class="text-input" />
            
            <label for="lastName" class="field-label"><option value="">Last name</option></label>
            <input type="text" id="lastName" class="text-input" />
            
            <label for="phoneNumber" class="field-label"><option value="">Phone number</option></label>
            <input type="tel" id="phoneNumber" class="text-input" />
            
            <label for="bankInfo" class="field-label"><option value="">Bank information</option></label>
            <input type="text" id="bankInfo" class="text-input" />
          </div>
        </form>
  
        <aside class="settings-panel">
          <h2 class="settings-title">Create Questionnaire</h2>
          <form class="settings-form">
            <label for="questionnaireName" class="field-label">Questionnaire Name</label>
            <input type="text" id="questionnaireName" class="text-input" />
            
            <label for="questionnaireType" class="field-label">Questionnaire Type</label>
            <div class="select-wrapper">
              <select id="questionnaireType" class="type-select">
                <option value="">Select type</option>
              </select>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/873d1c98e3b103bceab9244d867156b78c85aa48e9fc65106b33e0c7251d5786?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385" alt="" class="select-icon" />
            </div>
            
            <div class="button-group">
              <button type="submit" class="action-btn confirm-btn">Confirm</button>
              <button type="button" class="action-btn cancel-btn">Cancel</button>
            </div>
          </form>
        </aside>
      </div>
  
      <footer class="footer-section">
        <div class="link-generator">
          <button class="generate-btn">generate link here</button>
          <div class="action-buttons">
            <button class="action-btn confirm-btn">Confirm</button>
            <button class="action-btn cancel-btn">Cancel</button>
          </div>
        </div>
        <div class="status-display">
          https://translate.google.com.hk/?hl=zh-CN&sourceid=cnhp&sl=zh-CN&tl=en&text=%E6%B4%BB%E5%8A%A8%E7%8A%B6%E6%80%81&op=translate
        </div>
      </footer>
    </section>
  </main>
  </template>
  
  <style scoped>
  .questionnaire-container {
    background: #fff;
    padding: 158px 80px 468px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1400px;
    margin: auto;
  }
  
  .header-section {
    border-radius: 26px;
    background: #7000FF;
    padding: 94px 34px 19px;
    display: flex;
    gap: 12px;
    width: 1400px;
    margin: auto;
  }
  
  .admin-title {
    color: #fff;
    font: 700 48px Poppins, sans-serif;
  }
  
  .divider {
    background: #D9D9D9;
    width: 5px;
    height: 74px;
  }
  
  .event-title {
    color: #fff;
    font: 700 20px Poppins, sans-serif;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    flex-grow: 1;
  }
  
  .page-title {
    color: #000;
    font: 600 64px Poppins, sans-serif;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    margin-top: 23px;
  }
  
  .content-wrapper {
    margin-top: 83px;
    width: 100%;
  }
  
  .form-columns {
    display: flex;
    gap: 20px;
  }
  
  .question-form {
    width: 59%;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    font: 500 16px Poppins, sans-serif;
    gap: 23px;
  }
  
  .field-label {
    border-radius: 5px;
    background: #fff;
    color: #261BC3;
    text-align: center;
    padding: 10px 50px;
    border: 1px solid #281DC0;
    display: inline-block;
    width: 20%;
  }
  
  .text-input {
    border-radius: 15px;
    background: #F3F3F3;
    color: #302d27;
    padding: 19px 46px;
    border: 1px solid #f5f5f5;
    width: 80%;
  }
  
  .add-field-btn {
    border-radius: 5px;
    background: #fff;
    border: 1px solid #281DC0;
    color: #261BC3;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 11px 53px;
    cursor: pointer;
    width: 40%;
    text-align: center;
  }
  
  .add-icon {
    width: 28px;
    height: 28px;
  }
  
  .settings-panel {
    width: 41%;
    background: rgba(162, 157, 235, 0.1);
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    padding: 50px 47px;
  }
  
  .settings-title {
    font: 600 36px Poppins, sans-serif;
    text-align: center;
    margin-bottom: 64px;
  }
  
  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 21px;
  }
  
  .select-wrapper {
    position: relative;
    width: 100%;
  }
  
  .type-select {
    width: 100%;
    padding: 21px 25px;
    border-radius: 15px;
    border: 1px solid #f5f5f5;
    background: #F3F3F3;
    appearance: none;
  }
  
  .select-icon {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 51px;
    height: 51px;
    pointer-events: none;
  }
  
  .button-group {
    display: flex;
    gap: 45px;
    margin-top: 274px;
  }
  
  .action-btn {
    border-radius: 5px;
    padding: 11px 54px;
    color: #fff;
    cursor: pointer;
    border: none;
  }
  
  .confirm-btn {
    background: rgba(238, 18, 18, 0.84);
  }
  
  .cancel-btn {
    background: #7778B0;
  }
  
  .footer-section {
    display: flex;
    gap: 46px;
    flex-wrap: wrap;
    margin-top: 148px;
  }
  
  .link-generator {
    display: flex;
    flex-direction: column;
    gap: 19px;
  }
  
  .generate-btn {
    border-radius: 5px;
    background: #7778B0;
    color: #fff;
    padding: 9px 70px;
    border: none;
    cursor: pointer;
  }
  
  .status-display {
    background: #F6F6F6;
    padding: 22px 12px;
    border: 1px solid #797979;
    flex-grow: 1;
    width:70%;
  }
  
  @media (max-width: 991px) {
    .questionnaire-container {
      padding: 100px 20px;
    }
  
    .header-section {
      padding: 0 20px;
    }
  
    .admin-title {
      font-size: 40px;
    }
  
    .page-title {
      font-size: 40px;
    }
  
    .form-columns {
      flex-direction: column;
    }
  
    .question-form,
    .settings-panel {
      width: 100%;
    }
  
    .button-group {
      margin-top: 40px;
    }
  
    .footer-section {
      margin-top: 40px;
    }
  }
  </style>