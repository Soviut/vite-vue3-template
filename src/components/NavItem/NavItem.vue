<script lang="ts" setup>
import { FunctionalComponent } from 'vue'
import { VueClassAttr } from '@@/types'

defineProps<{
  to: string
  icon?: FunctionalComponent
  iconClass?: VueClassAttr
}>()
</script>

<template>
  <router-link
    :to="to"
    class="border-transparency flex items-center px-5 py-3 hover:bg-white/5 hover:no-underline"
    active-class="!bg-primary-500 text-white"
  >
    <component :is="icon" v-if="icon" class="mr-3 h-5 w-5" :class="iconClass" />

    <slot />
  </router-link>
</template>
