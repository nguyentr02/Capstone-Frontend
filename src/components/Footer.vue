<template>
    <div>
      <!-- 页脚部分 -->
      <footer class="footer">
        <div class="footer-section">
          <div class="footer-left">
            <h2>Site Name</h2>
            <p>
              Our Site is a global self-service ticketing platform for live experiences
              that allows anyone to create, share, find, and attend events that fuel their passions and enrich their lives.
            </p>
            <div class="social-icons">
              <a href="#"><img src="path-to-facebook-icon.svg" alt="Facebook"></a>
              <a href="#"><img src="path-to-instagram-icon.svg" alt="Instagram"></a>
              <a href="#"><img src="path-to-whatsapp-icon.svg" alt="WhatsApp"></a>
            </div>
          </div>
  
          <div class="footer-center">
            <h3>Plan Events</h3>
            <ul>
              <li><a href="#">Create and Set Up</a></li>
              <li><a href="#">Sell Tickets</a></li>
              <li><a href="#">Online RSVP</a></li>
              <li><a href="#">Online Events</a></li>
            </ul>
          </div>
  
          <div class="footer-center">
            <h3>Eventick</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">How it Works</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
  
          <div class="footer-right">
            <h3>Stay In The Loop</h3>
            <p>Join our mailing list to stay in the loop with our newest Events and concert</p>
            <div class="newsletter">
              <input type="email" placeholder="Enter your email address..">
              <button>Subscribe Now</button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © 2024 Somebody</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #0b0053;
    color: white;
    padding: 40px 20px;
  }
  
  .footer-section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
  }
  
  .footer-left, .footer-center, .footer-right {
    flex: 1;
    margin: 20px;
  }
  
  .footer-left h2 {
    font-size: 24px;
  }
  
  .footer-left p {
    font-size: 16px;
    max-width: 300px;
  }
  
  .social-icons a img {
    width: 30px;
    margin-right: 10px;
  }
  
  .footer-center h3, .footer-right h3 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .footer-center ul, .footer-right .newsletter {
    list-style: none;
    padding: 0;
  }
  
  .footer-center ul li {
    margin-bottom: 10px;
  }
  
  .footer-center ul li a, .footer-right .newsletter input {
    color: white;
    text-decoration: none;
  }
  
  .footer-right .newsletter {
    display: flex;
  }
  
  .footer-right .newsletter input {
    padding: 10px;
    border: none;
    border-radius: 5px 0 0 5px;
    outline: none;
    flex: 1;
  }
  
  .footer-right .newsletter button {
    background-color: #ff0077;
    border: none;
    padding: 10px 20px;
    border-radius: 0 5px 5px 0;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .footer-right .newsletter button:hover {
    background-color: #cc0066;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 30px;
  }
  </style>
  