import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
// import Button from "primevue/button"

import './assets/main.css'

// import 'primevue/themes/lara-light-blue/theme.css'     // Or use 'saga-blue', 'arya-blue', etc.
import 'prime/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import '/node_modules/primevue/resources/themes/lara-light-blue/theme.css'  
// import '/node_modules/primevue/resources/primevue.min.css'
// import '/node_modules/primeicons/primeicons.css'


const app = createApp(App)
app.use(router)
app.use(PrimeVue)

// app.component('Button', Button)

app.mount('#app')
