<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue'
</script>

<template>
  <MenuItem v-slot="slotProps" :disabled="!!$attrs.disabled">
    <button
      class="whitespace-nowrap px-3 py-2 text-left text-inherit hover:no-underline"
      :class="{
        'bg-primary-500 !text-white': slotProps.active,
        'text-gray-400': slotProps.disabled,
      }"
    >
      <slot v-bind="slotProps" />
    </button>
  </MenuItem>
</template>
