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
    class="flex items-center p-5 hover:bg-white/5 hover:no-underline"
  >
    <component :is="icon" v-if="icon" />

    <slot />
  </router-link>
</template>
