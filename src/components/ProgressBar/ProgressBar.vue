<script setup lang="ts">
import { computed } from 'vue'
import { Variant, VueClassAttr } from '@@/types'

// TODO: support sm md lg sizes
const props = withDefaults(
  defineProps<{
    value?: number
    min?: number
    max?: number
    variant?: Variant
    bgClass?: VueClassAttr
  }>(),
  {
    value: 0,
    min: 0,
    max: 10,
    variant: 'success',
    bgClass: 'bg-gray-200',
  }
)

const clamp = (input: number, min = 0, max = 1) => {
  // for non-finite values assume NaN is min and Infinite is max
  return Number.isNaN(input) ? min : Math.min(Math.max(input, min), max)
}

const percent = computed(() =>
  // subtract min from both values to normalize them
  clamp((props.value - props.min) / (props.max - props.min), 0, 1)
)
</script>

<template>
  <div class="h-2 overflow-hidden rounded-full" :class="bgClass">
    <div
      class="h-2 rounded-full"
      :style="{ width: `${percent * 100}%` }"
      :class="{
        'bg-secondary-500': variant === 'secondary',
        'bg-primary-500': variant === 'primary',
        'bg-danger-500': variant === 'danger',
        'bg-warning-500': variant === 'warning',
        'bg-success-500': variant === 'success',
        'bg-info-500': variant === 'info',
      }"
    />
  </div>
</template>
