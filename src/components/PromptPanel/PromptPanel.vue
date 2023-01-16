<script setup lang="ts"></script>

<template>
  <div
    class="mx-auto max-w-md space-y-8 rounded-lg bg-white p-8 text-center dark:bg-gray-800"
  >
    <header v-if="$slots.header">
      <slot name="header" />
    </header>

    <slot />

    <hr v-if="$slots.actions" />

    <slot name="actions" />
  </div>
</template>
