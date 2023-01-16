<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  input: unknown
  immediate?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: unknown): void
}>()

watch(
  () => props.input,
  (value) => {
    emit('change', value)
  },
  { immediate: props.immediate }
)
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template />
