<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
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
    open?: boolean
    closeOnRouteChange?: boolean
    breakpoint?: keyof typeof breakpointsTailwind
    sidebarClass?: VueClassAttr
    bodyClass?: VueClassAttr
    backdropClass?: VueClassAttr
    closeClass?: VueClassAttr
  }>(),
  {
    open: false,
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

const state = ref<SidebarState>(props.open ? 'open' : 'closed')

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

const focus = ref()
const { activate, deactivate } = useFocusTrap(focus)

onUnmounted(() => {
  deactivate()
})

const openSidebar = async () => {
  if (state.value === 'open' || state.value === 'pinned') return

  state.value = 'open'
  emitEvents()

  await nextTick()
  activate()
}

const closeSidebar = async () => {
  if (state.value === 'closed') return

  state.value = 'closed'
  emitEvents()

  deactivate()
}

const toggleSidebar = () => {
  if (state.value === 'pinned') return

  if (state.value === 'open') {
    closeSidebar()
  } else {
    openSidebar()
  }
}

const pinSidebar = () => {
  if (state.value === 'pinned') return

  state.value = 'pinned'
  emitEvents()

  deactivate()
}

watch(
  () => props.open,
  (value) => {
    if (value) {
      openSidebar()
    } else {
      closeSidebar()
    }
  },
  { immediate: true }
)

watch(
  () => route.path,
  () => {
    if (state.value === 'open' && props.closeOnRouteChange) {
      closeSidebar()
    }
  }
)

onKeyStroke('Escape', (e) => {
  if (state.value === 'open') {
    closeSidebar()
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
      pinSidebar()
    } else {
      closeSidebar()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex">
    <div ref="focus">
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
          @click="closeSidebar"
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
          class="fixed right-2 top-2 z-20 block rounded-full bg-gray-500 p-3 hover:bg-gray-400 focus:bg-gray-400"
          :class="closeClass"
          @click="closeSidebar"
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
            :toggle="toggleSidebar"
            :open="openSidebar"
            :close="closeSidebar"
            :state="state"
          />
        </aside>
      </Transition>
    </div>

    <div class="grow" :class="[bodyClass, state === 'pinned' && 'pl-64']">
      <slot
        :toggle="toggleSidebar"
        :open="openSidebar"
        :close="closeSidebar"
        :state="state"
      />
    </div>
  </div>
</template>
