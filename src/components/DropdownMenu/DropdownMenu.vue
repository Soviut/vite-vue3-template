<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid'
import { WatchEmitter } from '@/components'
import { Size, Variant, VueClassAttr } from '@@/types'

withDefaults(
  defineProps<{
    menuClass?: VueClassAttr
    buttonClass?: VueClassAttr
    buttonVariant?: Variant
    buttonSize?: Size
    buttonOutline?: boolean
    buttonBorderless?: boolean
  }>(),
  {
    menuClass: '',
    buttonClass: '',
    buttonVariant: 'primary',
    buttonSize: 'md',
    buttonBorderless: true,
  }
)

defineEmits<{
  (e: 'open', value: boolean): void
}>()
</script>

<template>
  <Menu v-slot="slotProps" as="div" class="relative">
    <WatchEmitter
      :input="slotProps.open"
      @change="$emit('open', Boolean($event))"
    />

    <MenuButton
      :variant="buttonVariant"
      :size="buttonSize"
      :borderless="buttonBorderless"
      :class="buttonClass"
    >
      <slot name="icon" v-bind="slotProps">
        <EllipsisVerticalIcon class="h-6 w-6" />
      </slot>
    </MenuButton>

    <MenuItems class="group absolute z-10" :class="menuClass">
      <div
        class="flex max-h-64 min-w-[200px] flex-col overflow-hidden overflow-y-auto rounded border border-gray-300 bg-white shadow-lg ring-primary-500/50 group-focus:border-primary-500 group-focus:outline-none group-focus:ring-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <slot v-bind="slotProps" />
      </div>
    </MenuItems>
  </Menu>
</template>
