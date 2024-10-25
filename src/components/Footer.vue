<template>
  <footer class="page-footer">
    <div class="footer-content">
      <div class="footer-center">
        <div class="eventure-text">Eventure</div>
        <div class="copyright">
          <p>Copyright © 2024 Eventure. All rights reserved.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      <div class="social-icons">
        <a href="https://facebook.com" target="_blank" class="social-icon">
          <img :src="facebookIcon" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" class="social-icon">
          <img :src="instagramIcon" alt="Instagram" />
        </a>
        <a href="https://whatsapp.com" target="_blank" class="social-icon">
          <img :src="whatsappIcon" alt="WhatsApp" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      facebookIcon: require("@/assets/facebook-logo.png"),
      instagramIcon: require("@/assets/instagram-logo.png"),
      whatsappIcon: require("@/assets/whatsapp-logo.png"),
    };
  },
};
</script>

<style scoped>

.page-footer {
  background-color: #0A075F;
  color: white;
  padding: 40px 0;
  margin-top: auto;
}


.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eventure-text {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.footer-center {
  text-align: center;
  margin-bottom: 20px;
}

.copyright p {
  margin: 5px 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.social-icon img:hover {
  transform: scale(1.1);
}
</style>
