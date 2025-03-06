import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

import './assets/main.css'

// PrimeVue styles
// import 'primevue/resources/themes/lara-light-blue/theme.css'  
// import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
