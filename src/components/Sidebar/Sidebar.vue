<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    open?: boolean
    sidebarClass?: string
    sidebarVisibleClass?: string
    sidebarHiddenClass?: string
    bodyClass?: string
    bodyVisibleClass?: string
    bodyHiddenClass?: string
  }>(),
  {
    open: false,
    sidebarClass: '',
    sidebarVisibleClass: '!translate-x-0',
    sidebarHiddenClass: 'lg:translate-x-0',
    bodyClass: 'lg:pl-64',
    bodyVisibleClass: '',
    bodyHiddenClass: '',
  }
)

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', value: boolean): void
}>()

const visible = ref(false)

const toggleMenu = () => {
  visible.value = !visible.value
  console.log('visible', visible.value)
  emit('toggle', visible.value)
}

const openMenu = () => {
  visible.value = true
  emit('open')
}

const closeMenu = () => {
  visible.value = false
  emit('close')
}
</script>

<template>
  <div class="flex">
    <aside
      class="fixed inset-y-0 w-64 -translate-x-full bg-black transition-transform duration-200 ease-in-out"
      :class="[
        sidebarClass,
        {
          [sidebarVisibleClass]: visible,
          [sidebarHiddenClass]: !visible,
        },
      ]"
    >
      <button @click="closeMenu">close</button>
      <slot name="nav" />
    </aside>

    <div
      class="grow transition-all duration-200 ease-in-out"
      :class="[
        bodyClass,
        {
          [bodyVisibleClass]: visible,
          [bodyHiddenClass]: !visible,
        },
      ]"
    >
      <slot
        :toggle="toggleMenu"
        :open="openMenu"
        :close="closeMenu"
        :visible="visible"
      />
    </div>
  </div>
</template>
