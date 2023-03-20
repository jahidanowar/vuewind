import type { App, Plugin } from 'vue'
import VwSheet from './components/VwSheet.vue'

const install: Plugin = (app: App) => {
  app.component('VwSheet', VwSheet)
}

export { install }
