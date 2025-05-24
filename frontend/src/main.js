import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import BootstrapVue3 from 'bootstrap-vue-3'

const app = createApp(App)

app.use(BootstrapVue3)
app.mount('#app')
