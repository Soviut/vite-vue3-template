<script lang="ts" setup>
import { FunctionalComponent } from 'vue'
import { VueClassAttr } from '@@/types'

defineProps<{
  icon?: FunctionalComponent
  iconClass?: VueClassAttr
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="
      disabled && ($attrs.to || $attrs.href)
        ? 'span'
        : $attrs.to
        ? 'RouterLink'
        : $attrs.href
        ? 'a'
        : 'button'
    "
    class="flex w-full items-center px-5 py-3 text-white hover:bg-white/5 hover:no-underline focus:bg-white/5 focus:no-underline focus:outline-none"
    active-class="!bg-primary-500"
    :disabled="disabled"
  >
    <component :is="icon" v-if="icon" class="mr-3 h-5 w-5" :class="iconClass" />

    <slot />
  </component>
</template>
