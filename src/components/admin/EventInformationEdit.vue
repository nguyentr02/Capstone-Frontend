<template>
    <main class="event-creation">
      <header class="header-container">
        <div class="admin-section">
          <h1 class="admin-title">Admin</h1>
          <div class="divider"></div>
          <h2 class="event-subtitle">Event questionare</h2>
        </div>
        <h2 class="event-title">Event Information Edit</h2>
      </header>
  
      <section class="form-container">
        <div class="content-wrapper">
          <div class="grid-layout">
            <div class="left-column">
              <div class="image-section">
                <div class="image-upload">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf14327fe260c3ec446e566db1e1a55accb3b7a3436017885743a3a372aff80d?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385" alt="Event image upload area" class="upload-image" />
                  <button class="upload-button">Insert Picture Here</button>
                </div>
                <div class="form-fields">
                  <button class="field-label">Event Label</button>
                  <input type="text" class="input-field" aria-label="Event name input" />
                  <button class="field-label">Location</button>
                  <input type="text" class="input-field" aria-label="Location input" />
                  <button class="field-label">Date</button>
                  <input type="text" class="input-field" aria-label="Date input" />
                  <button class="field-label">Topic</button>
                  <input type="text" class="input-field" aria-label="Topic input" />
                </div>
              </div>
              <button class="topic-button">Topic</button>
              <input type="text" class="wide-input" aria-label="Additional topic input" />
            </div>
  
            <div class="right-column">
              <section class="pricing-section">
                <h3 class="pricing-title">Additional Pricing Options</h3>
                <div class="divider-line"></div>
                
                <div class="price-option">
                  <div class="price-label">
                    <span class="label-text">Adult</span>
                    <span class="label-description">Setting price for adult</span>
                  </div>
                  <div class="price-input">
                    <input type="number" value="0" aria-label="Adult price" class="number-input" />
                  </div>
                </div>
  
                <div class="price-option">
                  <div class="price-label">
                    <span class="label-text">Child</span>
                    <span class="label-description">Setting price for Child</span>
                  </div>
                  <div class="price-input">
                    <input type="number" value="0" aria-label="Child price" class="number-input" />
                  </div>
                </div>
  
                <div class="price-option">
                  <div class="price-label">
                    <span class="label-text">International participant</span>
                    <span class="label-description">Extra setting</span>
                  </div>
                  <div class="price-input">
                    <input type="number" value="0" aria-label="International price" class="number-input" />
                  </div>
                </div>
              </section>
            </div>
          </div>
  
          <button class="topic-button">Topic</button>
          <input type="text" class="wide-input" aria-label="Final topic input" />
  
          <div class="add-field">
            <button class="add-field-button">
              <span class="blue-text">Add another field</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63ce1f5e44d0445aef4b7d848dbd6cff2196260166989f9adcd8a137c8551ff?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385" alt="" class="add-icon" />
            </button>
          </div>
  
          <section class="description-section">
            <div class="description-header">
              <h3 class="description-title">Descript of the Event In Here</h3>
              <button class="expand-button">Expand</button>
            </div>
            <div class="divider-line"></div>
            <p class="description-text">
              Chocolate Starfish marks 30 years with a spectacular Australian tour that celebrates the best of everything – the albums, the songs, and the exhilarating shows for which the band is widely renowned. Featuring the hits of their self-titled debut album and favourites from Box, Spide
            </p>
          </section>
  
          <section class="notice-section">
            <div class="notice-header">
              <h3 class="notice-title">Descript the Notice in Here</h3>
              <button class="expand-button">Expand</button>
            </div>
            <div class="divider-line"></div>
            <p class="notice-text">
              <span class="notice-label">Refund/Exchange Rules</span>
              This project supports conditional refunds. The specific refund period, refund handling fees, and other refund conditions that can be applied for are subject to the refund policy provided by the project organizer. Please refer to the refund policy published in the service description or project details page for details
            </p>
          </section>
  
          <footer class="form-footer">
            <div class="button-group">
              <button class="generate-button">generate link here</button>
              <div class="action-buttons">
                <button class="confirm-button">Confirm</button>
                <button class="cancel-button">Cancel</button>
              </div>
            </div>
            <input type="text" class="link-input" value="https://translate.google.com.hk/?hl=zh-CN&sourceid=cnhp&sl=zh-CN&tl=en&text=%E6%B4%BB%E5%8A%A8%E7%8A%B6%E6%80%81&op=translate" aria-label="Generated link" readonly />
          </footer>
        </div>
      </section>
    </main>
  </template>
  
  <style scoped>
  /* Base styles */
  .event-creation {
    background: #fff;
    padding: 140px 80px 331px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header-container {
    margin-left: 31px;
    width: 100%;
    max-width: 55%;
  }
  
  .admin-section {
    border-radius: 26px;
    background: #7000FF;
    padding: 94px 29px 19px;
    display: flex;
    align-items: start;
    gap: 17px;
    flex-wrap: wrap;
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
  
  .event-subtitle {
    color: #fff;
    font: 500 20px Poppins, sans-serif;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 24px;
  }
  
  .event-title {
    color: #000;
    font: 600 64px Poppins, sans-serif;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 53px;
  }
  
  .form-container {
    width: 50%;
    margin-top: 51px;
    padding-left: 12px;
  }
  
  .grid-layout {
    display: grid;
    grid-template-columns: 66% 34%;
    gap: 20px;
  }
  
  .left-column {
    display: flex;
    flex-direction: column;
  }
  
  .image-section {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 20px;
  }
  
  .image-upload {
    position: relative;
    aspect-ratio: 0.699;
  }
  
  .upload-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .upload-button {
    position: relative;
    border-radius: 5px;
    background: #7000FF;
    color: #fff;
    font: 500 16px/2 Poppins, sans-serif;
    padding: 7px 22px;
  }
  
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  
  .field-label {
    border-radius: 5px;
    background: #fff;
    color: #261BC3;
    font: 500 16px/2 Poppins, sans-serif;
    padding: 11px 39px;
    border: 1px solid #281DC0;
    text-align: center;
    align-self: flex-start;
  }
  
  .input-field {
    background: #F3F3F3;
    height: 36px;
    width: 100%;
  }
  
  .topic-button {
    border-radius: 5px;
    background: #fff;
    color: #261BC3;
    font: 500 16px/2 Poppins, sans-serif;
    padding: 9px 60px;
    border: 1px solid #281DC0;
    margin-top: 56px;
    align-self: flex-start;
  }
  
  .wide-input {
    background: #F3F3F3;
    height: 36px;
    width: 100%;
    margin-top: 28px;
  }
  
  .right-column {
    padding: 0 24px;
  }
  
  .pricing-section {
    display: flex;
    flex-direction: column;
    gap: 47px;
  }
  
  .pricing-title {
    color: #000;
    font: 600 32px Poppins, sans-serif;
  }
  
  .divider-line {
    background: #D9D9D9;
    height: 3px;
    width: 100%;
    margin: 14px 0;
  }
  
  .price-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .price-label {
    display: flex;
    flex-direction: column;
  }
  
  .label-text {
    color: #333;
    font: 600 16px Poppins, sans-serif;
  }
  
  .label-description {
    color: #777;
    font: 400 14px Poppins, sans-serif;
  }
  
  .price-input {
    display: flex;
    align-items: center;
  }
  
  .number-input {
    border: 0.5px solid #aaa;
    padding: 4px 8px;
    width: 126px;
    font: 400 14px PingFang SC, sans-serif;
  }
  
  .add-field {
    margin-top: 39px;
  }
  
  .add-field-button {
    border-radius: 5px;
    background: #fff;
    border: 1px solid #281DC0;
    padding: 2px 4px 2px 43px;
    display: flex;
    align-items: center;
    gap: 19px;
  }
  
  .blue-text {
    color: #261BC3;
    font: 500 16px/30px Poppins, sans-serif;
  }
  
  .add-icon {
    width: 27px;
    aspect-ratio: 0.87;
  }
  
  .description-section,
  .notice-section {
    margin-top: 115px;
  }
  
  .description-header,
  .notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .description-title,
  .notice-title {
    color: #000;
    font: 700 32px Poppins, sans-serif;
  }
  
  .expand-button {
    border-radius: 5px;
    background: #7778B0;
    color: #fff;
    font: 400 20px Poppins, sans-serif;
    padding: 6px 25px;
  }
  
  .description-text,
  .notice-text {
    color: #333;
    font: 400 20px/35px Poppins, sans-serif;
    margin: 15px 42px 0 0;
  }
  
  .notice-label {
    color: #929292;
  }
  
  .form-footer {
    margin-top: 117px;
    display: flex;
    gap: 46px;
    flex-wrap: wrap;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 19px;
  }
  
  .generate-button {
    border-radius: 5px;
    background: #7778B0;
    color: #fff;
    font: 500 16px/2 Poppins, sans-serif;
    padding: 9px 70px;
  }
  
  .action-buttons {
    display: flex;
    gap: 20px;
  }
  
  .confirm-button {
    border-radius: 5px;
    background: rgba(238, 18, 18, 0.84);
    color: #fff;
    font: 500 16px/2 Poppins, sans-serif;
    padding: 11px 56px;
  }
  
  .cancel-button {
    border-radius: 5px;
    background: #7778B0;
    color: #fff;
    font: 500 16px/2 Poppins, sans-serif;
    padding: 11px 59px;
  }
  
  .link-input {
    background: #F6F6F6;
    border: 1px solid #797979;
    padding: 22px 29px;
    color: #000;
    font: 400 16px Poppins, sans-serif;
    flex-grow: 1;
  }
  
  /* Media Queries */
  @media (max-width: 991px) {
    .event-creation {
      padding: 100px 20px;
    }
    
    .admin-section {
      padding: 0 20px;
    }
    
    .admin-title {
      font-size: 40px;
    }
    
    .event-title {
      font-size: 40px;
      margin-top: 40px;
    }
    
    .grid-layout {
      grid-template-columns: 1fr;
    }
    
    .image-section {
      grid-template-columns: 1fr;
    }
    
    .upload-button,
    .field-label,
    .topic-button,
    .expand-button,
    .generate-button,
    .confirm-button,
    .cancel-button {
      padding: 0 20px;
    }
    
    .description-text,
    .notice-text {
      margin-right: 10px;
    }
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  </style>