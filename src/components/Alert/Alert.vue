<script setup lang="ts">
import { Variant } from '@@/types'

withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  {
    variant: 'info',
  }
)
</script>

<template>
  <div
    class="rounded border-l-4 px-5 py-3"
    :class="{
      'border-primary-500 bg-primary-200 text-primary-900':
        variant === 'primary',
      'border-secondary-500 bg-secondary-100 text-secondary-900':
        variant === 'secondary',
      'border-danger-500 bg-danger-200 text-danger-900': variant === 'danger',
      'border-warning-500 bg-warning-200 text-warning-900':
        variant === 'warning',
      'border-success-500 bg-success-200 text-success-900':
        variant === 'success',
      'border-info-500 bg-info-200 text-info-900': variant === 'info',
    }"
  >
    <slot />
  </div>
</template>
