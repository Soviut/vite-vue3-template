<script setup lang="ts">
import { BreadcrumbToken } from '.'

defineProps<{
  items: BreadcrumbToken[]
  trailingSeparator?: boolean
}>()
</script>

<template>
  <nav class="mr-0 flex gap-3 font-semibold">
    <template v-for="(item, i) in items" :key="i">
      <router-link v-if="item.to" :to="item.to">
        {{ item.text }}
      </router-link>

      <div v-else>
        {{ item.text }}
      </div>

      <div v-if="i < items.length - (trailingSeparator ? 0 : 1)">
        <slot name="separator">/</slot>
      </div>
    </template>
  </nav>
</template>
