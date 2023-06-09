<script setup lang="ts">
import { computed, ref } from 'vue'
import { removeElement } from '@/utils'

const props = defineProps<{
  message: string
  snackbarType: 'success' | 'error' | 'info' | 'warning'
  timeout?: number
  position?: 'top' | 'bottom'
}>()

const snackbarRef = ref<HTMLElement | undefined>(undefined)

const classes = computed(() => ({
  'bg-white dark:bg-gray-800 border-green-500 text-gray-800 dark:text-white':
    props.snackbarType === 'success',
  'bg-white dark:bg-gray-800 border-red-500 text-gray-800 dark:text-white':
    props.snackbarType === 'error',
  'bg-white dark:bg-gray-800 border-blue-500 text-gray-800 dark:text-white':
    props.snackbarType === 'info',
  'bg-white dark:bg-gray-800 border-yellow-500 text-gray-800 dark:text-white':
    props.snackbarType === 'warning'
}))

const handleCloseBtn = () => {
  removeElement(snackbarRef?.value)
}
</script>

<template>
  <Transition name="slide-fade" ref="snackbarRef">
    <div class="snackbar flex justify-between items-center" :class="classes">
      <div class="block">{{ message }}</div>
      <button class="snackbar__close ml-2" @click="handleCloseBtn" aria-label="Close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style>
.snackbar {
  @apply rounded-xl border-r-4 shadow-xl dark:shadow-2xl py-4 px-6  fixed top-5 min-w-max left-1/2 z-[1000] -translate-x-1/2;
}
</style>
