<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-wrapper">
        <div class="footer-sections">
          <section class="footer-branding">
            <div class="logo-container">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ad4c18707bec2e3c65656ae67c3b18d4cf767fd96e85d4443dfb306d3dc3205?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385" class="logo-image" alt="Site Logo" />
              <h2 class="site-name">Site Name</h2>
            </div>
            <p class="site-description">
              Our Site is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives.
            </p>
          </section>
          <nav class="footer-nav plan-events">
            <h3 class="nav-title">Plan Events</h3>
            <ul class="nav-list">
              <li>Create and Set Up</li>
              <li>Sell Tickets</li>
              <li>Online RSVP</li>
              <li>Online Events</li>
            </ul>
          </nav>
          <nav class="footer-nav eventick">
            <h3 class="nav-title">Eventick</h3>
            <ul class="nav-list">
              <li>About Us</li>
              <li>Press</li>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>How it Works</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </nav>
          <section class="newsletter">
            <h3 class="newsletter-title">Stay in the loop</h3>
            <p class="newsletter-description">
              Join our mailing list to stay in the loop with our newest for Event and concert
            </p>
            <form class="newsletter-form">
              <label for="emailInput" class="visually-hidden">Enter your email address</label>
              <input type="email" id="emailInput" class="email-input" placeholder="Enter your email address.." aria-label="Enter your email address" />
              <button type="submit" class="subscribe-button">Subscribe Now</button>
            </form>
          </section>
        </div>
        <div class="footer-divider"></div>
        <p class="copyright">Copyright © 2024 Somebody</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  max-height: 35%;
}

.footer-content {
  background-color: #0a075f;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 56px 80px 14px;
}

.footer-wrapper {
  display: flex;
  width: 1240px;
  max-width: 100%;
  flex-direction: column;
  align-items: center; /* 确保居中 */
}


.footer-sections {
  display: flex;
  align-items: flex-start;
  gap: 40px; /* 增加间隔 */
  justify-content: space-between;
}

.footer-branding {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  max-width: 400px; /* 设置更小的最大宽度 */
  font-size: 12px; /* 缩小字体 */
  text-align: left; /* 内容居左对齐 */
}

.logo-container {
  align-self: left;
  display: flex;
  gap: 8px;
  color: #fff;
  font: 30px/1 'Jockey One', sans-serif;
  font-size: 24px; /* 可适当缩小标题字体 */
}

.logo-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 45px;
}

.site-name {
  align-self: flex-start;
  margin-top: 20px;
  flex-basis: auto;
  color: #f3f3f3;
}

.site-description {
  color: #f3f3f3;
  margin-top: 18px;
  font: 14px/22px 'ABeeZee', sans-serif;
  font-size: 12px;
}

.footer-nav {
  display: flex;
  margin-top: 11px;
  flex-direction: column;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px; /* 缩小字体 */
  text-align: left; /* 内容居左对齐 */
}

.nav-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  align-self: flex-start;
  font-size: 14px;
}

.nav-list {
  color: #f3f3f3;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  margin-top: 24px;
  list-style-type: none;
  padding: 0;
}

.newsletter {
  display: flex;
  margin-top: 11px;
  flex-direction: column;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 12px; /* 缩小字体 */
  text-align: left; /* 内容居左对齐 */
}

.newsletter-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  align-self: flex-start;
  font-size: 14px;
}

.newsletter-description {
  color: #f3f3f3;
  font-size: 14px;
  line-height: 22px;
  margin-top: 24px;
  font-size: 12px; /* 缩小列表及描述字体 */
}

.newsletter-form {
  border-radius: 46px;
  background-color: #fff;
  box-shadow: 8px 15px 38px rgba(0, 0, 0, 0.15);
  display: flex;
  margin-top: 20px;
  width: 100%;
  gap: 38px;
  font-size: 12px;
  padding: 8px 7px 8px 26px;
  border: 2px solid #f1f1f1;
}

.email-input {
  color: #959595;
  flex-grow: 1;
  width: 114px;
  margin: auto 0;
  border: none;
  outline: none;
}

.subscribe-button {
  border: none;
  border-radius: 50px;
  background-color: #f5167e;
  box-shadow: 0 10px 50px rgba(61, 55, 241, 0.25);
  color: #fff;
  letter-spacing: 0.79px;
  padding: 15px 30px;
  cursor: pointer;
}

.footer-divider {
  width: 1200px;
  max-width: 100%;
  height: 1px;
  margin: 68px 20px 0;
  border: 1px solid #4c4d8b;
}

.copyright {
  color: #fefefe;
  align-self: center;
  margin-top: 15px;
  font: 400 14px/1.6 'ABeeZee', sans-serif;
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

@media (max-width: 991px) {
  .footer-content {
    max-width: 100%;
    padding: 0 20px;
  }

  .footer-sections {
    max-width: 100%;
    flex-direction: column;
  }

  .newsletter-description {
    margin-right: 2px;
    font-size: 12px; /* 缩小列表及描述字体 */
  }

  .newsletter-form {
    padding-left: 20px;
    font-size: 12px; /* 缩小列表及描述字体 */
  }

  .subscribe-button {
    padding: 0 20px;
  }

  .footer-divider {
    margin: 40px 10px 0 0;
  }
}
</style>