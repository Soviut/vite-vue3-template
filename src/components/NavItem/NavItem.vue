<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

defineProps<{
  to: string
  icon?: FunctionalComponent
}>()
</script>

<template>
  <router-link
    :to="to"
    class="border-transparency flex items-center px-5 py-3 hover:bg-white/5 hover:no-underline"
    active-class="!bg-primary-500 text-white"
  >
    <component :is="icon" v-if="icon" class="mr-3 h-6 w-6" />

    <slot />
  </router-link>
</template>
