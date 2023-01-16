<script setup lang="ts">
import { VueClassAttr } from '@@/types'

withDefaults(
  defineProps<{
    animationClass?: VueClassAttr
  }>(),
  {
    animationClass: 'animate-pulse',
  }
)
</script>

<template>
  <div
    class="inline-block h-[1em] w-full rounded bg-gray-300"
    :class="animationClass"
  />
</template>
