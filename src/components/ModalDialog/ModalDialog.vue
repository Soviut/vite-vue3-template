<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { Btn } from '@/components'

const props = defineProps<{
  open: boolean
  title: string
  noAutoClose?: boolean
  noCancel?: boolean
  noConfirm?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
  (e: 'toggle', value: boolean): void
}>()

const isOpen = ref(false)

watch(
  () => props.open,
  (value) => {
    isOpen.value = value
  },
  { immediate: true }
)

const setIsOpen = (value: boolean) => {
  isOpen.value = value
}

const close = () => {
  setIsOpen(false)
  emit('close')
  emit('toggle', false)
}

const confirm = () => {
  emit('confirm')
  if (!props.noAutoClose) close()
}

const cancel = () => {
  emit('cancel')
  close()
}
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog class="relative z-50" @close="close">
      <TransitionChild
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-900/80"
          aria-hidden="true"
          @click="close"
        />
      </TransitionChild>

      <div class="fixed inset-0 flex items-center justify-center p-5">
        <TransitionChild
          as="template"
          enter="duration-200 ease-out"
          enter-from="opacity-0 translate-y-5"
          enter-to="opacity-100 translate-y-0"
          leave="duration-200 ease-in"
          leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 translate-y-5"
        >
          <DialogPanel
            class="w-full max-w-sm rounded-xl bg-gray-800 shadow-lg shadow-black/20"
          >
            <header class="px-5 py-3 pt-5">
              <DialogTitle class="text-base font-semibold">{{
                title
              }}</DialogTitle>
            </header>

            <div class="px-5">
              <slot />
            </div>

            <footer class="space-x-2 p-5 text-right">
              <Btn v-if="!noCancel" outline @click="cancel">Cancel</Btn>
              <Btn v-if="!noConfirm" variant="primary" @click="confirm"
                >Confirm</Btn
              >
            </footer>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
