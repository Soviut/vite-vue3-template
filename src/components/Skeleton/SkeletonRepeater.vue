<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    repeat: number | string
  }>(),
  {
    repeat: 1,
  }
)

const repeatCount = computed(() => parseInt(props.repeat.toString()))
</script>

<template>
  <slot v-for="i in repeatCount" :key="i" :index="i - 1" />
</template>
