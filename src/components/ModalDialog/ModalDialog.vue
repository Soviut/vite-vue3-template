<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { Btn } from '@/components'

const props = defineProps<{
  open: boolean
  title: string
  noAutoClose?: boolean
  cancelable?: boolean
  cancelText?: string
  confirmable?: boolean
  confirmText?: string
  closeable?: boolean
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

const closeModal = () => {
  setIsOpen(false)
  emit('close')
  emit('toggle', false)
}

const confirmAction = () => {
  emit('confirm')
  if (!props.noAutoClose) closeModal()
}

const cancelAction = () => {
  emit('cancel')
  closeModal()
}

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  closeModal()
})

// avoids errors when modals are loaded before their teleport target
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Teleport v-if="isMounted" to="#modals">
    <TransitionRoot :show="isOpen" as="template">
      <Dialog class="relative z-50" @close="closeModal">
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
            @click="closeModal"
          />
        </TransitionChild>

        <div class="fixed inset-0 flex overflow-auto">
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 translate-y-5"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-5"
          >
            <div class="m-auto w-full p-5">
              <DialogPanel
                class="m-auto flex w-full max-w-sm flex-col gap-5 rounded-xl bg-gray-200 p-5 shadow-lg shadow-black/20 dark:bg-gray-800"
              >
                <header class="flex items-center justify-between gap-3">
                  <DialogTitle class="text-base font-semibold">{{
                    title
                  }}</DialogTitle>

                  <Btn
                    v-if="closeable"
                    size="sm"
                    outline
                    class="flex h-8 w-8 items-center justify-center rounded-full !p-0"
                    @click="closeModal"
                  >
                    <XMarkIcon class="h-5 w-5" />
                  </Btn>
                </header>

                <div>
                  <slot />
                </div>

                <footer
                  v-if="cancelable || confirmable"
                  class="space-x-2 text-right"
                >
                  <Btn v-if="cancelable" outline @click="cancelAction">{{
                    cancelText ?? $t('actions.cancel')
                  }}</Btn>
                  <Btn
                    v-if="confirmable"
                    variant="primary"
                    @click="confirmAction"
                    >{{ confirmText ?? $t('actions.confirm') }}</Btn
                  >
                </footer>
              </DialogPanel>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>
