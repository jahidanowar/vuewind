import { createApp } from 'vue'
import { install } from '.'
import App from './App.vue'

import './assets/style.css'

createApp(App).use(install).mount('#app')
