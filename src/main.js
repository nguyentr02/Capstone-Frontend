import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import PrimeVue from 'primevue/config'
import './assets/main.css'
import 'primeicons/primeicons.css'


const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
