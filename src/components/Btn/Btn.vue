<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Variant } from '@/types'

withDefaults(
  defineProps<{
    variant?: Variant
    size?: 'sm' | 'md' | 'lg'
    outline?: boolean
  }>(),
  {
    variant: 'secondary',
    size: 'md',
  }
)

const attrs = useAttrs()

const isDisabled = computed(
  () => 'disabled' in attrs && attrs.disabled !== false
)
</script>

<template>
  <component
    :is="
      isDisabled && ($attrs.to || $attrs.href)
        ? 'span'
        : $attrs.to
        ? 'RouterLink'
        : $attrs.href
        ? 'a'
        : 'button'
    "
    class="inline-block rounded focus:outline-none focus:ring-2 focus:ring-offset-2 hover:no-underline transition-colors duration-100 border text-center"
    :class="{
      'px-2 py-1 text-sm': size === 'sm',
      'px-3 py-2 text-md': size === 'md',
      'px-4 py-3 text-lg': size === 'lg',

      'focus:ring-secondary-500 focus:ring-opacity-40':
        !isDisabled && variant === 'secondary',
      'focus:ring-primary-500 focus:ring-opacity-50':
        !isDisabled && variant === 'primary',
      'focus:ring-danger-500 focus:ring-opacity-50':
        !isDisabled && variant === 'danger',
      'focus:ring-warning-500 focus:ring-opacity-50':
        !isDisabled && variant === 'warning',
      'focus:ring-success-500 focus:ring-opacity-50':
        !isDisabled && variant === 'success',
      'focus:ring-info-400 focus:ring-opacity-50':
        !isDisabled && variant === 'info',

      'bg-secondary-400 hover:bg-secondary-500 text-white':
        !isDisabled && !outline && variant === 'secondary',
      'bg-primary-500 hover:bg-primary-600 text-white':
        !isDisabled && !outline && variant === 'primary',
      'bg-danger-500 hover:bg-danger-600 text-white':
        !isDisabled && !outline && variant === 'danger',
      'bg-warning-500 hover:bg-warning-600 text-white':
        !isDisabled && !outline && variant === 'warning',
      'bg-success-500 hover:bg-success-600 text-white':
        !isDisabled && !outline && variant === 'success',
      'bg-info-400 hover:bg-info-500 text-white':
        !isDisabled && !outline && variant === 'info',

      'border-transparent': !outline,

      'border-secondary-400 hover:border-transparent hover:bg-secondary-400 text-secondary-500 hover:text-white':
        !isDisabled && outline && variant === 'secondary',
      'border-primary-500 hover:border-transparent hover:bg-primary-500 text-primary-600 hover:text-white':
        !isDisabled && outline && variant === 'primary',
      'border-danger-500 hover:border-transparent hover:bg-danger-500 text-danger-600 hover:text-white':
        !isDisabled && outline && variant === 'danger',
      'border-warning-500 hover:border-transparent hover:bg-warning-500 text-warning-600 hover:text-white':
        !isDisabled && outline && variant === 'warning',
      'border-success-500 hover:border-transparent hover:bg-success-500 text-success-600 hover:text-white':
        !isDisabled && outline && variant === 'success',
      'border-info-400 hover:border-transparent hover:bg-info-400 text-info-600 hover:text-white':
        !isDisabled && outline && variant === 'info',

      'cursor-pointer': !isDisabled,
      'focus:ring-0 bg-disabled-300 text-disabled-600 cursor-not-allowed':
        isDisabled,
    }"
  >
    <slot />
  </component>
</template>
