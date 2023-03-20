<script setup lang="ts">
import useSncackbar from '@/composables/snackbar'
import { computed } from 'vue'

const { isActive, color, message, hide } = useSncackbar()

const classes = computed(() => ({
  'bg-white dark:bg-gray-800 border-green-500 ': color.value === 'success',
  'bg-white dark:bg-gray-800 border-red-500 ': color.value === 'error',
  'bg-white dark:bg-gray-800 border-blue-500 ': color.value === 'info',
  'bg-white dark:bg-gray-800 border-yellow-500 ': color.value === 'warning'
}))

const handleCloseBtn = () => {
  hide()
}
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="isActive" class="snackbar flex justify-between items-center" :class="classes">
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
