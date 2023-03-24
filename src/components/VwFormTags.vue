<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
  separator?: string
  placeholder?: string
  id?: string
  validtion?: any
  error?: string
  outerClasses?: string
  label?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', ...args: any[]): void
}>()

const list = ref<string[]>(props.modelValue)

function handleAddtag(e: KeyboardEvent) {
  e.preventDefault()
  const target = e.target as HTMLInputElement
  const value = target.value

  if (value && validate(value)) {
    list.value.push(value)
    target.value = ''
    emit('update:modelValue', list.value)
  }
}

function handlePaste(e: ClipboardEvent) {
  const target = e.target as HTMLInputElement

  const pasteData = e.clipboardData?.getData('text')

  if (pasteData) {
    const tags = pasteData.split(props.separator || ',')

    tags.forEach((tag) => {
      if (tag && validate(tag)) {
        list.value.push(tag)
      }
    })
    emit('update:modelValue', list.value)
  }
  target.value = ''
}

function handleBackspace(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement
  const value = target.value
  if (!value && list.value.length) {
    list.value.pop()
    emit('update:modelValue', list.value)
  }
}

function validate(val: string): boolean {
  if (!props.validtion || props.validtion === undefined) return true
  try {
    props.validtion.validateSync(val)
    return true
  } catch (error) {
    return false
  }
}
</script>

<template>
  <div
    class="form-group"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses
    }"
  >
    <label :for="id">{{ label }}</label>
    <div class="form-control">
      <ul class="flex gap-1 flex-wrap">
        <li
          v-for="item in list"
          :key="item"
          class="bg-gray-200 py-1 px-2 rounded text-xs inline-flex items-center"
        >
          <span>
            {{ item }}
          </span>
          <button type="button" class="ml-1" @click="list.splice(list.indexOf(item), 1)">
            <Icon name="bx:x" class="w-4 h-4" />
          </button>
        </li>
        <input
          type="text"
          class="appearance-none outline-none ml-1 grow p-0 border-none focus:outline-none focus:ring-0 text-sm"
          :placeholder="placeholder"
          :id="id"
          @keydown.enter="handleAddtag"
          @paste.prevent="handlePaste"
          @keydown.backspace="handleBackspace"
          @keydown.space="handleAddtag"
        />
      </ul>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>
