import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import PrimeVue from 'primevue/config'
import './assets/main.css'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(PrimeVue);
app.use(router);
app.mount('#app')
