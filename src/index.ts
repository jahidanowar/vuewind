import type { App, Plugin } from 'vue'
import VwSheet from './components/VwSheet.vue'
import useSnackbar from './composables/snackbar'

const VueWind: Plugin = {
  install(app: App, options) {
    app.component('VwSheet', VwSheet)
    console.log({ options })
  }
}

export { VueWind, useSnackbar }
