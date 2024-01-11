<script setup lang="ts">
import { computed } from 'vue'
import { VueClassAttr } from '@@/types'

const props = withDefaults(
  defineProps<{
    url?: string
    name: string
    bgClass?: VueClassAttr
    imageClass?: VueClassAttr
    initialsClass?: VueClassAttr
  }>(),
  {
    url: '',
    name: '',
    bgClass: 'bg-gray-400',
    imageClass: '',
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
    class="flex aspect-square h-full w-full max-w-[2.5rem] items-center justify-center overflow-hidden rounded-full"
    :class="bgClass"
  >
    <img
      v-if="url"
      :src="url"
      :alt="name"
      referrerpolicy="no-referrer"
      class="h-full w-full object-cover"
      :class="imageClass"
    />
    <div v-else class="uppercase" :class="initialsClass">
      {{ initials }}
    </div>
  </div>
</template>
