<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid'

withDefaults(
  defineProps<{
    text: string
    // position?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    // position: 'top',
  }
)
</script>

<template>
  <div
    :data-text="text"
    class="relative inline-block cursor-pointer before:pointer-events-none before:absolute before:bottom-full before:left-full before:z-30 before:hidden before:w-max before:max-w-sm before:rounded-lg before:rounded-bl-none before:bg-black before:px-3 before:py-2 before:text-sm before:text-white before:shadow-lg before:content-[attr(data-text)] hover:before:block focus:before:block"
    tabindex="0"
    aria-role="tooltip"
  >
    <slot>
      <QuestionMarkCircleIcon class="text-muted h-5 w-5" />
    </slot>
  </div>
</template>
