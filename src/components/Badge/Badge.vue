<script setup lang="ts">
import { Variant } from '@@/types'

withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  {
    variant: 'secondary',
  }
)
</script>

<template>
  <span
    class="inline-block whitespace-nowrap rounded-full px-3 py-0.5 text-sm font-semibold text-white"
    :class="{
      'bg-primary-500': variant === 'primary',
      'bg-secondary-500': variant === 'secondary',
      'bg-info-500': variant === 'info',
      'bg-success-500': variant === 'success',
      'bg-warning-500': variant === 'warning',
      'bg-danger-500': variant === 'danger',
    }"
    ><slot
  /></span>
</template>
