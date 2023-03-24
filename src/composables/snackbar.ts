import { createApp, defineComponent, type ComponentOptionsWithObjectProps } from 'vue'
import VwSnackbar from '@/components/VwSnackbar.vue'

type SnackbarType = 'success' | 'error' | 'info' | 'warning' | 'default'

interface Snackbar {
  show: (m: string, type: SnackbarType, timeout?: number) => void
}

export default function useSncackbar() {
  /* Methods */
  const show = (message: string, snackbarType: SnackbarType, timeout: number) => {
    const el = document.createElement('div')
    el.id = 'snackbar-wrapper'
    const innerEl = document.createElement('div')
    innerEl.id = 'snackbar'
    el.appendChild(innerEl)
    document.body.appendChild(el)
    const el2 = document.createElement('div')

    // Spwan the component
    return createApp(defineComponent(VwSnackbar as unknown as ComponentOptionsWithObjectProps), {
      message,
      snackbarType,
      timeout
    }).mount(document.getElementById('snackbar')?.appendChild(el2) as Element)
  }

  return {
    show
  } as Snackbar
}
