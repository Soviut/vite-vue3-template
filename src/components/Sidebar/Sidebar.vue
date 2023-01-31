<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueClassAttr } from '@@/types'

const props = withDefaults(
  defineProps<{
    open?: boolean
    disabled?: boolean
    sidebarClass?: VueClassAttr
    sidebarVisibleClass?: VueClassAttr
    sidebarHiddenClass?: VueClassAttr
    bodyClass?: VueClassAttr
    bodyVisibleClass?: VueClassAttr
    bodyHiddenClass?: VueClassAttr
    backdropClass?: VueClassAttr
  }>(),
  {
    open: false,
    sidebarClass: 'bg-black',
    sidebarVisibleClass: '!translate-x-0',
    sidebarHiddenClass: 'lg:translate-x-0',
    bodyClass: 'lg:pl-64',
    bodyVisibleClass: '',
    bodyHiddenClass: '',
    backdropClass: 'bg-black/50',
  }
)

const emit = defineEmits<{
  (e: 'open', value: true): void
  (e: 'close', value: false): void
  (e: 'change', value: boolean): void
}>()

const visible = ref(false)

const emitEvents = () => {
  emit('change', visible.value)

  if (visible.value) {
    emit('open', visible.value)
  } else {
    emit('close', visible.value)
  }
}

watch(
  () => props.open,
  (value) => {
    visible.value = value

    emitEvents()
  },
  { immediate: true }
)

const toggle = () => {
  visible.value = !visible.value
  emitEvents()
}

const open = () => {
  visible.value = true
  emitEvents()
}

const close = () => {
  visible.value = false
  emitEvents()
}
</script>

<template>
  <div class="flex">
    <Transition
      name="fade"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible && !disabled"
        :class="[
          'fixed inset-0 z-10',
          backdropClass,
          visible && !disabled && 'block lg:hidden',
        ]"
        @click="close"
      />
    </Transition>

    <aside
      class="fixed inset-y-0 z-10 w-64 -translate-x-full overflow-y-auto border-gray-800 transition-transform duration-200 ease-in-out dark:border-r"
      :class="[
        !disabled && sidebarClass,
        visible && !disabled && sidebarVisibleClass,
        !visible && !disabled && sidebarHiddenClass,
        disabled && '!hidden',
      ]"
    >
      <slot name="aside" />
    </aside>

    <div
      class="grow transition-all duration-200 ease-in-out"
      :class="[
        !disabled && bodyClass,
        visible && !disabled && bodyVisibleClass,
        !visible && !disabled && bodyHiddenClass,
      ]"
    >
      <slot :toggle="toggle" :open="open" :close="close" :visible="visible" />
    </div>
  </div>
</template>
