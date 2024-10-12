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

      <!-- 社交媒体图标部分 -->
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
      // 从 assets 目录加载图标
      facebookIcon: require("@/assets/facebook-logo.png"),
      instagramIcon: require("@/assets/instagram-logo.png"),
      whatsappIcon: require("@/assets/whatsapp-logo.png"),
    };
  },
};
</script>

<style scoped>
/* 页脚整体样式 */
.page-footer {
  background-color: #0A075F;
  color: white;
  padding: 40px 0;
  margin-top: auto;
}

/* 页脚内容居中 */
.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* "Eventure" 文字样式：放大加粗 */
.eventure-text {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 版权信息 */
.footer-center {
  text-align: center;
  margin-bottom: 20px;
}

.copyright p {
  margin: 5px 0;
}

/* 社交媒体图标部分 */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* 图标样式 */
.social-icon img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* 悬停效果 */
.social-icon img:hover {
  transform: scale(1.1);
}
</style>
