<script setup lang="ts">
import { inject, ref } from 'vue'
import useSncackbar from './composables/snackbar'

const isSheetActive = ref(false)
const position = ref<'left' | 'right' | 'top' | 'bottom'>('left')
const size = ref<'sm' | 'md' | 'lg' | 'full'>('md')
const title = ref('Tesoro Settings')
const isPresistant = ref(false)

function hanleSnackbar() {
  useSncackbar().show('Snackbar is working', 'success')
}
</script>
<template>
  <!-- Main Component -->
  <VwSheet
    v-model="isSheetActive"
    :size="size"
    :title="title"
    :position="position"
    :presistant="isPresistant"
  >
    <img src="./assets/sheet.png" class="w-full mb-2 rounded-xl" />
  </VwSheet>
  <!-- ./ Main Component -->
  <!-- Controller -->
  <main class="bg-white dark:bg-gray-900 dark text-white lg:grid place-content-center h-screen">
    <div class="text-center">
      <h1
        class="mb-12 text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500"
      >
        VueWind UI
      </h1>
      <h2 class="text-xl font-bold mb-5">Sheet Component</h2>

      <div class="lg:flex gap-5">
        <input v-model="title" class="py-2 px-5 rounded-lg dark:bg-gray-700" placeholder="Title" />
        <select v-model="size" class="py-2 px-5 rounded-lg dark:bg-gray-700" placeholder="Size">
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
        <select
          v-model="position"
          class="py-2 px-5 rounded-lg dark:bg-gray-700"
          placeholder="Position"
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>

        <label for="Presistant" class="mr-2">
          <input
            id="Presistant"
            v-model="isPresistant"
            type="checkbox"
            class="ml-1 w-4 h-4 rounded p-2 dark:bg-gray-700"
          />
          Presistant</label
        >
      </div>
      <button
        @click="isSheetActive = !isSheetActive"
        class="py-2 px-5 rounded-lg bg-gray-600 hover:bg-gray-700 text-gray-100 mt-5"
      >
        Open Sheet
      </button>
    </div>
  </main>

  <button @click="hanleSnackbar">Trigger Snackbar</button>
  <!-- ./ Controller -->
</template>
