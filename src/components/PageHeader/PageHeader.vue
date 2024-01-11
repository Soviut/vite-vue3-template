<script setup lang="ts">
import { Breadcrumb, type BreadcrumbToken, DropdownMenu } from '@/components'

withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbToken[]
  }>(),
  {
    title: '',
    breadcrumbs: () => [],
  }
)
</script>

<template>
  <header>
    <Breadcrumb
      trailing-separator
      class="text-muted mr-4"
      :items="breadcrumbs"
    />

    <div class="flex items-center gap-3">
      <slot>
        <h1>{{ title }}</h1>
      </slot>

      <div class="ml-auto">
        <slot name="actions" />
      </div>

      <DropdownMenu
        v-if="$slots.menu"
        menu-class="right-0"
        button-class="p-2 rounded hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out outline-none focus:outline-none"
      >
        <slot name="menu" />
      </DropdownMenu>
    </div>
  </header>
</template>
