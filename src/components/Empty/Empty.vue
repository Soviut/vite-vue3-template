<script setup lang="ts">
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/24/outline'
import { Size } from '@@/types'

withDefaults(
  defineProps<{
    title?: string
    image?: boolean
    muted?: boolean
    size?: Size
  }>(),
  {
    title: '',
    size: 'sm',
  }
)
</script>

<template>
  <div
    class="rounded-lg border border-gray-200 dark:border-gray-800"
    :class="[
      'flex flex-col items-center justify-center',
      muted && 'text-muted',
      {
        'gap-3 p-5': size === 'sm',
        'gap-5 px-5 py-10': size === 'md',
        'gap-5 px-5 py-20': size === 'lg',
        'gap-5 px-5 py-40': size === 'xl',
      },
    ]"
  >
    <header v-if="image" class="text-gray-200 dark:text-gray-700">
      <slot name="image">
        <MagnifyingGlassCircleIcon class="h-20 w-20" />
      </slot>
    </header>

    <h2 v-if="title" class="text-center text-xl font-normal">{{ title }}</h2>

    <div v-if="$slots.default" class="max-w-lg text-center">
      <slot />
    </div>

    <footer v-if="$slots.actions" class="mt-3">
      <slot name="actions" />
    </footer>
  </div>
</template>
