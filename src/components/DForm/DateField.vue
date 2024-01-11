<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  value: Date
}>()

const field = ref<HTMLInputElement | undefined>()

watch(
  () => props.value,
  (value) => {
    if (!field.value) return
    field.value.valueAsDate = value
  },
  { immediate: true }
)

console.log('ding?')

onMounted(() => {
  if (!field.value) return
  field.value.valueAsDate = props.value
})
</script>

<template>
  <input ref="field" type="date" />
</template>
