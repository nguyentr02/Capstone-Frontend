import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css'; // 如果有全局样式文件

createApp(App)
  .use(router)
  .mount('#app');
