<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  position: 'left' | 'right' | 'top' | 'bottom'
  size: 'sm' | 'md' | 'lg' | 'full'
  presistant?: boolean
  title?: string
}>()

const emits = defineEmits(['update:modelValue', 'close'])

function handleClose() {
  emits('update:modelValue', false)
  emits('close', true)
}

function handleOuterClick() {
  if (!props.presistant) {
    handleClose()
  }
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      handleOuterClick()
    }
  })
})
</script>
<template>
  <Transition :name="`fade-${position}`">
    <div
      v-if="modelValue"
      class="fixed w-full h-screen bg-black/20 dark:bg-black/80 top-0 left-0 z-50 sheet-wrapper"
      :class="{
        'flex justify-end': position === 'right',
        'flex justify-start': position === 'left',
        'flex items-end': position === 'bottom'
      }"
      @click.self="handleOuterClick"
    >
      <div
        class="flex bg-white dark:bg-gray-800 h-full pb-10 sheet"
        :class="{
          'w-1/4': size === 'sm',
          'w-1/2': size === 'md',
          'w-3/4': size === 'lg',
          'w-full': size === 'full',
          '!h-1/2 w-full': position === 'top' || position === 'bottom'
        }"
      >
        <div class="inner w-full">
          <!-- Header  -->
          <slot name="header">
            <div
              class="flex items-center w-full p-5"
              :class="
                position === 'left' ? 'justify-between' : 'gap-3 flex-row-reverse justify-end'
              "
            >
              <slot name="title">
                <h4 v-if="title" class="font-semibold dark:text-white text-gray-700">
                  {{ title }}
                </h4>
              </slot>
              <slot name="close">
                <button
                  class="text-gray-800 dark:text-gray-300 border rounded-xl dark:border-gray-600 p-1"
                  @click="handleClose"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m16.192 6.344l-4.243 4.242l-4.242-4.242l-1.414 1.414L10.535 12l-4.242 4.242l1.414 1.414l4.242-4.242l4.243 4.242l1.414-1.414L13.364 12l4.242-4.242z"
                    />
                  </svg>
                </button>
              </slot>
            </div>
          </slot>
          <!-- ./ Header  -->

          <!-- Main Slot  -->
          <div class="h-full overflow-y-scroll p-5 bg-white dark:bg-gray-800 pb-12 sheet-body">
            <slot />
          </div>
          <!-- ./ Main Slot  -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-left-enter-active,
.fade-left-leave-active {
  transition: all 0.3s ease;
}
.fade-left-enter,
.fade-left-leave-to {
  transform: translateX(-100%);
}

.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.3s ease;
}
.fade-right-enter,
.fade-right-leave-to {
  transform: translateX(100%);
}

.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.3s ease;
}

.fade-top-enter,
.fade-top-leave-to {
  transform: translateY(-100%);
}

.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition: all 0.3s ease;
}

.fade-bottom-enter,
.fade-bottom-leave-to {
  transform: translateY(100%);
}

.sheet-body::-webkit-scrollbar {
  width: 0.5rem;
}
</style>
