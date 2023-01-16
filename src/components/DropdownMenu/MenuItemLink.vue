<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue'
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <MenuItem v-slot="slotProps" :disabled="!!$attrs.disabled">
    <router-link
      :to="$props.to"
      v-bind="$attrs"
      class="cursor-pointer whitespace-nowrap px-3 py-2 text-inherit hover:no-underline"
      :class="{
        'bg-primary-500 !text-white': slotProps.active,
        '!text-gray-400': slotProps.disabled,
      }"
    >
      <slot v-bind="slotProps" />
    </router-link>
  </MenuItem>
</template>
