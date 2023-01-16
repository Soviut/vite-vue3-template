<script setup lang="ts">
import { computed } from 'vue'
import { VueClassAttr } from '@@/types'

const props = withDefaults(
  defineProps<{
    url?: string
    name: string
    bgClass?: VueClassAttr
    initialsClass?: VueClassAttr
  }>(),
  {
    url: '',
    name: '',
    bgClass: 'bg-gray-400',
    initialsClass: 'text-white',
  }
)

const initials = computed(() => {
  return props.name
    .split(/\s+/)
    .map((token) => token.charAt(0))
    .filter(Boolean)
    .join('')
})
</script>

<template>
  <div
    class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
    :class="bgClass"
  >
    <img v-if="url" :src="url" :alt="name" referrerpolicy="no-referrer" />
    <div v-else :class="initialsClass">{{ initials }}</div>
  </div>
</template>
