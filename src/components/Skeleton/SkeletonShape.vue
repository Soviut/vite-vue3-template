<script setup lang="ts">
import { VueClassAttr } from '@@/types'

withDefaults(
  defineProps<{
    shape?: 'rect' | 'square' | 'circle'
    flat?: boolean
    animationClass?: VueClassAttr
  }>(),
  {
    shape: 'rect',
    animationClass: 'animate-pulse',
  }
)
</script>

<template>
  <div
    class="w-full bg-gray-200 dark:bg-gray-800"
    :class="[
      animationClass,
      {
        rounded: shape !== 'circle' && !flat,
        'h-20': shape === 'rect',
        'aspect-square rounded-full': shape === 'circle',
        'aspect-square': shape === 'square',
      },
    ]"
  >
    <slot />
  </div>
</template>
