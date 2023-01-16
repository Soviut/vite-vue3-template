<script setup lang="ts">
import { ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

const emit = defineEmits<{
  (e: 'files', state: File[]): void
}>()

const isDragging = ref(false)

const dragEnter = (e: DragEvent) => {
  // only respond to files being dragged
  if (e.dataTransfer?.types.includes('Files')) {
    isDragging.value = true
  }
}

// we use .self on the listener to prevent children from triggering this
// before the no-pointer-children class is added
const dragLeave = async () => {
  isDragging.value = false
}

const drop = (e: DragEvent) => {
  isDragging.value = false
  emit('files', Array.from(e.dataTransfer?.files ?? []))
}
</script>

<template>
  <div
    class="relative"
    :class="{ 'no-pointer-children': isDragging }"
    @dragenter.prevent.stop="dragEnter"
    @dragleave.prevent.self="dragLeave"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <TransitionRoot
      :show="isDragging"
      enter="transition-opacity duration-75"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="absolute inset-0 z-40 bg-gray-900/80 p-5">
        <div
          class="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-gray-700/20"
        >
          <div class="text-2xl">Drop files here</div>
        </div>
      </div>
    </TransitionRoot>

    <slot />
  </div>
</template>

<style scoped>
.no-pointer-children:deep(*) {
  pointer-events: none !important;
}
</style>
