<script setup lang="ts" generic="T extends object">
import { computed } from 'vue'

// TODO: make fields K & [key: string]
// TODO: label class
// TODO: value class
const props = defineProps<{
  entries: T
  fields?: string[]
  i18nPrefix?: string
  fallback?: boolean
  hideLabels?: boolean
}>()

const entries = computed(() => Object.entries(props.entries))

const normalizedFields = computed(() => props.fields?.filter(Boolean))

const entriesFields = computed(() =>
  normalizedFields.value
    ? normalizedFields.value.map(
        (field) =>
          entries.value.find(([key]) => key === field) ?? [field, field]
      )
    : entries.value
)

const item = computed(() => props.entries)
</script>

<template>
  <div class="@container">
    <dl class="grid gap-3 @md:grid-cols-2 @xl:grid-cols-3 @2xl:grid-cols-4">
      <div v-for="([key, value], i) in entriesFields" :key="key">
        <dt
          class="text-muted text-sm"
          :class="{
            'sr-only': hideLabels,
          }"
        >
          <slot :name="`${key}-label`" :item="item" :index="i">
            <template v-if="i18nPrefix">
              {{ $t(`${i18nPrefix}.${key}`) }}
            </template>
            <template v-else>
              {{ key }}
            </template>
          </slot>
        </dt>
        <dd>
          <template
            v-if="fallback && (value === null || typeof value === 'undefined')"
          >
            <slot
              name="fallback"
              :item="item"
              :entry="[key, value]"
              :index="i"
              >{{ $t('messages.na') }}</slot
            >
          </template>

          <template v-else>
            <slot
              :name="`${key}-value`"
              :item="item"
              :entry="[key, value]"
              :index="i"
              >{{ value }}</slot
            >
          </template>
        </dd>
      </div>
    </dl>
  </div>
</template>
