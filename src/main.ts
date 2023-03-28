import { createApp } from 'vue'
import { VueWind } from '.'
import App from './App.vue'

import './assets/style.css'

createApp(App)
  .use(VueWind, {
    // options
    a: 1,
    b: {
      c: 2
    }
  })
  .mount('#app')
