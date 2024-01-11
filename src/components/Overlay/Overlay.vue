<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <div class="relative">
    <slot />

    <Transition
      name="fade"
      enter-active-class="transition-opacity duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="show"
        class="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 p-5 backdrop-blur-sm"
      >
        <div class="dark:text-white">
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>
