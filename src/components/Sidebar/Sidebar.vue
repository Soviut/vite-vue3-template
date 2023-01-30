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
  }>(),
  {
    open: false,
    sidebarClass: 'bg-black',
    sidebarVisibleClass: '!translate-x-0',
    sidebarHiddenClass: 'lg:translate-x-0',
    bodyClass: 'lg:pl-64',
    bodyVisibleClass: '',
    bodyHiddenClass: '',
  }
)

const emit = defineEmits<{
  (e: 'open', value: true): void
  (e: 'close', value: false): void
  (e: 'change', value: boolean): void
}>()

const visible = ref(false)

watch(
  () => props.open,
  (value) => {
    visible.value = value

    if (value) {
      emit('open', value)
    } else {
      emit('close', value)
    }

    emit('change', visible.value)
  },
  { immediate: true }
)

const emitEvents = () => {
  emit('change', visible.value)

  if (visible.value) {
    emit('open', visible.value)
  } else {
    emit('close', visible.value)
  }
}

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
    <aside
      class="fixed inset-y-0 w-64 -translate-x-full transition-transform duration-200 ease-in-out"
      :class="[
        !disabled && sidebarClass,
        visible && !disabled && sidebarVisibleClass,
        !visible && !disabled && sidebarHiddenClass,
        disabled && '!hidden',
      ]"
    >
      {{ disabled }}
      <button @click="close">close</button>
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
