<script setup lang="ts"></script>

<template>
  <div
    class="mx-auto max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-600 dark:bg-gray-800"
  >
    <header v-if="$slots.header">
      <slot name="header" />
    </header>

    <div v-if="$slots.default" class="mt-8">
      <slot />
    </div>

    <hr v-if="$slots.actions" />

    <slot name="actions" />
  </div>
</template>
