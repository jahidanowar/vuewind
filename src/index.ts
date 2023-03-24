import type { App, Plugin } from 'vue'
import VwSheet from './components/VwSheet.vue'
import useSnackbar from './composables/snackbar'

const VueWind: Plugin = (app: App) => {
  app.component('VwSheet', VwSheet)
}

export { VueWind, VwSheet, useSnackbar }
