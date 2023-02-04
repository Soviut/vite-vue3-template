<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { onKeyStroke } from '@vueuse/core'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { VueClassAttr } from '@@/types'

const props = withDefaults(
  defineProps<{
    open?: boolean
    disabled?: boolean
    hideOnRouteChange?: boolean
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
    hideOnRouteChange: true,
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

const route = useRoute()

const visible = ref(props.open)

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

const wrapper = ref()
const { activate, deactivate } = useFocusTrap(wrapper)

const toggle = (value?: boolean | Event) => {
  visible.value = typeof value === 'boolean' ? value : !visible.value
  visible.value ? activate() : deactivate()
  emitEvents()
}

const open = () => {
  if (visible.value) return

  visible.value = true
  activate()
  emitEvents()
}

const close = () => {
  if (!visible.value) return

  visible.value = false
  deactivate()
  emitEvents()
}

watch(
  () => route.path,
  () => {
    if (props.hideOnRouteChange) {
      close()
    }
  }
)

onKeyStroke('Escape', (e) => {
  if (visible.value) {
    close()
  }
  e.preventDefault()
})
</script>

<template>
  <div class="flex">
    <div ref="wrapper">
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

      <button
        v-if="visible"
        class="fixed top-2 right-2 z-20 rounded-full bg-gray-500 p-3 hover:bg-gray-400 focus:bg-gray-400"
        @click="close"
      >
        <XMarkIcon class="h-6 w-6 text-white" />
      </button>

      <aside
        class="fixed inset-y-0 z-10 w-64 -translate-x-full overflow-y-auto border-gray-800 transition-transform duration-200 ease-in-out dark:border-r"
        :class="[
          !disabled && sidebarClass,
          visible && !disabled && sidebarVisibleClass,
          !visible && !disabled && sidebarHiddenClass,
          disabled && '!hidden',
        ]"
      >
        <slot
          name="aside"
          :toggle="toggle"
          :open="open"
          :close="close"
          :visible="visible"
        />
      </aside>
    </div>

    <div
      class="grow"
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
