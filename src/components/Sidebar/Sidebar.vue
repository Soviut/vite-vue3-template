<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import {
  breakpointsTailwind,
  onKeyStroke,
  useBreakpoints,
  useScrollLock,
} from '@vueuse/core'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { VueClassAttr } from '@@/types'

type SidebarState = 'open' | 'closed' | 'pinned'

const props = withDefaults(
  defineProps<{
    state?: SidebarState
    breakpoint?: keyof typeof breakpointsTailwind
    closeOnRouteChange?: boolean
    sidebarClass?: VueClassAttr
    bodyClass?: VueClassAttr
    backdropClass?: VueClassAttr
    closeClass?: VueClassAttr
  }>(),
  {
    state: 'closed',
    closeOnRouteChange: true,
    breakpoint: 'lg',
    sidebarClass: 'bg-black',
    bodyClass: '',
    backdropClass: 'bg-black/50',
    closeClass: '',
  }
)

const emit = defineEmits<{
  (e: 'open', value: SidebarState): void
  (e: 'close', value: SidebarState): void
  (e: 'pin', value: SidebarState): void
  (e: 'change', value: SidebarState): void
}>()

const route = useRoute()

const state = ref<SidebarState>(props.state)

const emitEvents = () => {
  emit('change', state.value)

  if (state.value === 'open') {
    emit('open', state.value)
  } else if (state.value === 'pinned') {
    emit('pin', state.value)
  } else {
    emit('close', state.value)
  }
}

watch(
  () => props.state,
  (value) => {
    state.value = value

    emitEvents()
  },
  { immediate: true }
)

const wrapper = ref()
const { activate, deactivate } = useFocusTrap(wrapper)

const open = () => {
  if (state.value === 'open' || state.value === 'pinned') return

  state.value = 'open'
  activate()
  emitEvents()
}

const close = () => {
  if (state.value === 'closed') return

  state.value = 'closed'
  deactivate()
  emitEvents()
}

const toggle = () => {
  if (state.value === 'pinned') return

  if (state.value === 'open') {
    close()
  } else {
    open()
  }
}

const pin = () => {
  if (state.value === 'pinned') return

  state.value = 'pinned'
  deactivate()
  emitEvents()
}

watch(
  () => route.path,
  () => {
    if (state.value === 'open' && props.closeOnRouteChange) {
      close()
    }
  }
)

onKeyStroke('Escape', (e) => {
  if (state.value === 'open') {
    close()
  }
  e.preventDefault()
})

const scrollLock = useScrollLock(document.body)

watch(state, (value) => {
  scrollLock.value = value === 'open'
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const pastBreakpoint = breakpoints.greaterOrEqual(props.breakpoint)

watch(
  pastBreakpoint,
  (value) => {
    if (value) {
      pin()
    } else {
      close()
    }
  },
  { immediate: true }
)
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
          v-if="state === 'open'"
          class="fixed inset-0 z-10"
          :class="backdropClass"
          @click="close"
        />
      </Transition>

      <Transition
        name="bump"
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-50"
      >
        <button
          v-if="state === 'open'"
          class="fixed top-2 right-2 z-20 block rounded-full bg-gray-500 p-3 hover:bg-gray-400 focus:bg-gray-400"
          :class="closeClass"
          @click="close"
        >
          <XMarkIcon class="h-6 w-6 text-white" />
        </button>
      </Transition>

      <Transition
        name="slide"
        enter-active-class="transition-transform duration-300"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="state === 'open' || state === 'pinned'"
          class="fixed inset-y-0 z-10 w-64 overflow-y-auto border-gray-800 transition-transform duration-200 ease-in-out dark:border-r"
          :class="sidebarClass"
        >
          <slot
            name="aside"
            :toggle="toggle"
            :open="open"
            :close="close"
            :state="state"
          />
        </aside>
      </Transition>
    </div>

    <div class="grow" :class="[bodyClass, state === 'pinned' && 'pl-64']">
      <slot :toggle="toggle" :open="open" :close="close" :state="state" />
    </div>
  </div>
</template>
