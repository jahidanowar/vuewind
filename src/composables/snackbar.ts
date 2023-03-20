import { createApp, defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
import VwSnackbar from '@/components/VwSnackbar.vue'

type SnackbarType = 'success' | 'error' | 'info' | 'warning' | 'default'

interface Snackbar {
  isActive: Ref<boolean>
  message: Ref<string>
  color: Ref<string>
  show: (m: string, type: SnackbarType, timeout?: number) => void
  hide: () => void
}

export default function useSncackbar() {
  const isActive = ref(false)
  const message = ref('')
  const color = ref('success')
  const timeoutInstance = ref<any>(null)

  /* Methods */
  const show = (m: string, type: SnackbarType, timeout: number) => {
    isActive.value = true
    message.value = m
    color.value = type

    const el = document.createElement('div')
    el.id = 'snackbar-wrapper'

    const innerEl = document.createElement('div')
    innerEl.id = 'snackbar'

    el.appendChild(innerEl)

    document.body.appendChild(el)

    const el2 = document.createElement('div')

    // Spwan the component
    return createApp(defineComponent(VwSnackbar as any), {
      isActive: isActive.value,
      message: message.value,
      color: color.value
    }).mount(document.getElementById('snackbar')?.appendChild(el2) as Element)

    timeoutInstance.value = setTimeout(() => {
      isActive.value = false
      message.value = ''
      color.value = 'success'
    }, timeout || 3000)
  }

  const hide = () => {
    isActive.value = false
    message.value = ''
    color.value = 'success'
    console.log('timeoutInstance', timeoutInstance.value)
    if (timeoutInstance.value) {
      console.log('clearing timeout', timeoutInstance)
      clearTimeout(timeoutInstance.value)
    }
  }

  return {
    isActive,
    message,
    color,
    show,
    hide
  } as Snackbar
}
