<script setup lang="ts">
import { computed } from 'vue'
import { normalizeDate } from '@/utils'
import { DateLike } from '@@/types'

const props = withDefaults(
  defineProps<{
    date: DateLike
    options?: Intl.DateTimeFormatOptions
    locale?: string
  }>(),
  {
    options: () => ({
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    locale: 'en-US',
  }
)

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
const formatter = computed(
  () => new Intl.DateTimeFormat(props.locale, props.options)
)

const normalized = computed(() => normalizeDate(props.date))
const standard = computed(() => normalized.value.toISOString())
const formatted = computed(() => formatter.value.format(normalized.value))
</script>

<template>
  <time :datetime="standard" :title="standard">
    <slot :date="normalized" :standard="standard" :formatted="formatted">{{
      formatted
    }}</slot>
  </time>
</template>
