<script setup lang="ts">
import { ToastMessage, useToaster } from '.'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { ToastOptions } from '.'
import { computed } from 'vue'
import { VueClassAttr } from '@@/types'

/*
TODO:

icons for each variant
classes and icons in options
move variant outside of options?

pause on hover
click to link
*/

const props = withDefaults(
  defineProps<{
    name?: string
    teleportTo?: string
    options?: Partial<ToastOptions>

    containerClass?: VueClassAttr
    toastClass?: VueClassAttr
    iconClass?: VueClassAttr
    messageClass?: VueClassAttr
    closeClass?: VueClassAttr
    countdownClass?: VueClassAttr

    primaryClass?: VueClassAttr
    secondaryClass?: VueClassAttr
    successClass?: VueClassAttr
    warningClass?: VueClassAttr
    dangerClass?: VueClassAttr
    infoClass?: VueClassAttr
  }>(),
  {
    name: 'default',
    teleportTo: 'body',
    options: undefined,

    containerClass: '',
    toastClass: '',
    iconClass: '',
    messageClass: '',
    closeClass: '',
    countdownClass: '',

    primaryClass: '',
    secondaryClass: '',
    successClass: '',
    warningClass: '',
    dangerClass: '',
    infoClass: '',
  }
)

const { toasts, remove, options: globalOptions } = useToaster()

// filter toasts that belong to this toaster
const localToasts = computed(() =>
  toasts.value.filter((t) => t.toaster === props.name)
)

// toasts on the bottom should stack from bottom to top
const sortedToasts = computed(() =>
  options.value.position.startsWith('bottom')
    ? [...localToasts.value].reverse()
    : localToasts.value
)

const options = computed(() => ({
  ...globalOptions,
  ...props.options,
}))

const localRemove = (toast: ToastMessage) => {
  if (toast.options.clickToClose) {
    remove(toast.id)
  }
}
</script>

<template>
  <Teleport :to="teleportTo">
    <TransitionGroup
      name="list"
      tag="ul"
      move-class="transition-all ease-in-out duration-500"
      enter-active-class="transition-all ease-in-out duration-500"
      leave-active-class="absolute transition-all ease-in-out duration-500"
      enter-from-class="opacity-0 translate-x-10"
      leave-to-class="opacity-0 translate-x-10"
      class="pointer-events-none fixed z-50 w-full max-w-md gap-3 py-5"
      :class="[
        {
          'top-0 left-0': options.position === 'top-left',
          'top-0 left-1/2 -translate-x-1/2': options.position === 'top',
          'top-0 right-0': options.position === 'top-right',
          'bottom-0 left-0': options.position === 'bottom-left',
          'bottom-0 left-1/2 -translate-x-1/2': options.position === 'bottom',
          'bottom-0 right-0': options.position === 'bottom-right',
        },
        containerClass,
      ]"
    >
      <li
        v-for="toast in sortedToasts"
        :key="toast.id"
        class="w-full px-5 pb-3"
        @click="localRemove(toast)"
      >
        <div
          class="pointer-events-auto relative flex w-full cursor-pointer items-start gap-5 overflow-hidden rounded-lg bg-opacity-50 p-5 text-white shadow-lg shadow-black/20 backdrop-blur-sm"
          :class="[
            toast.options.variant === 'primary' && [
              'bg-primary-500',
              primaryClass,
            ],
            toast.options.variant === 'secondary' && [
              'bg-secondary-500',
              secondaryClass,
            ],
            toast.options.variant === 'success' && [
              'bg-success-500',
              successClass,
            ],
            toast.options.variant === 'warning' && [
              'bg-warning-500',
              warningClass,
            ],
            toast.options.variant === 'danger' && [
              'bg-danger-500',
              dangerClass,
            ],
            toast.options.variant === 'info' && ['bg-info-500', infoClass],
            toastClass,
          ]"
        >
          <slot name="default">
            <div v-if="toast.options.showIcon">
              <slot name="icon" :toast="toast">
                <div :class="[iconClass]">
                  <component :is="toast.options.icon" class="h-5 w-5" />
                </div>
              </slot>
            </div>

            <div :class="[messageClass]">
              <slot name="message" :toast="toast" :remove="remove">
                {{ toast.message }}
              </slot>
            </div>

            <div v-if="toast.options.closeButton" class="ml-auto">
              <slot name="close-button" :toast="toast" :remove="remove">
                <button
                  class="block text-white hover:text-white/80"
                  :class="[closeClass]"
                  @click="remove(toast.id)"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </slot>
            </div>

            <div
              v-if="toast.options.timeout && toast.options.showTimeout"
              class="countdown absolute bottom-0 left-0 h-1 w-full bg-white/50"
              :class="[countdownClass]"
              :style="{
                'animation-duration': `${toast.options.timeout}ms`,
              }"
            />
          </slot>
        </div>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.countdown {
  animation: countdown linear forwards;
}

.pause {
  animation-play-state: paused;
}

@keyframes countdown {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
</style>
