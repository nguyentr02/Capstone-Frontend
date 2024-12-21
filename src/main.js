import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import './assets/main.css'

// import 'primevue/themes/lara-light-blue/theme.css'     // Or use 'saga-blue', 'arya-blue', etc.
// import 'primevue/resources/primevue.min.css'
// import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.mount('#app')
