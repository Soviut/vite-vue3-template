<script setup lang="ts">
import { Variant } from '@@/types'

withDefaults(
  defineProps<{
    variant?: Variant
    outline?: boolean
  }>(),
  {
    variant: 'secondary',
  }
)
</script>

<template>
  <span
    class="inline-block whitespace-nowrap rounded-full px-3 py-0.5 text-sm font-semibold"
    :class="
      outline
        ? [
            'border',
            {
              'border-primary-500 bg-primary-200 text-primary-600 dark:bg-primary-900 dark:text-primary-200':
                variant === 'primary',
              'border-secondary-500 bg-secondary-200 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-200':
                variant === 'secondary',
              'border-secondary-400 bg-secondary-200 text-secondary-500 dark:bg-secondary-700 dark:text-secondary-300':
                variant === 'secondary',
              'border-info-500 bg-info-200 text-info-600 dark:bg-info-900 dark:text-info-200':
                variant === 'info',
              'border-success-500 bg-success-200 text-success-600 dark:bg-success-900 dark:text-success-200':
                variant === 'success',
              'border-warning-500 bg-warning-200 text-warning-600 dark:bg-warning-900 dark:text-warning-300':
                variant === 'warning',
              'border-danger-500 bg-danger-200 text-danger-600 dark:bg-danger-900 dark:text-danger-200':
                variant === 'danger',
            },
          ]
        : [
            'text-white',
            {
              'bg-primary-500': variant === 'primary',
              'bg-secondary-500': variant === 'secondary',
              'bg-secondary-400 dark:bg-secondary-600': variant === 'secondary',
              'bg-info-500': variant === 'info',
              'bg-success-500': variant === 'success',
              'bg-warning-500': variant === 'warning',
              'bg-danger-500': variant === 'danger',
            },
          ]
    "
    ><slot
  /></span>
</template>
