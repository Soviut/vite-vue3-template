<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { UseImage } from '@vueuse/components'
import { Loading } from '@/components'

defineProps<{
  src: string
}>()
</script>

<template>
  <UseImage :src="src">
    <template #loading>
      <Loading />
    </template>
    <template #error></template>
    <template #default><img :src="src" v-bind="$attrs" /></template>
  </UseImage>
</template>
