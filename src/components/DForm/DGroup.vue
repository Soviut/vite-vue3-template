<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { DField, FormSchemaField } from '.'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset

// TODO: as should be able to take a component as well

const props = withDefaults(
  defineProps<{
    formId?: string
    fields: FormSchemaField<T>[]
    include?: string[]
    as?: string
    disabled?: boolean
    i18n?: boolean
  }>(),
  {
    formId: undefined,
    include: () => [],
    as: 'div',
  }
)

const renderFields = computed(() => {
  return props.include.length > 0
    ? props.fields.filter((field) => props.include.includes(String(field.name)))
    : props.fields
})
</script>

<template>
  <component :is="as">
    <DField
      v-for="field in renderFields"
      :key="field.name"
      :form-id="formId"
      :field="field"
      :disabled="disabled"
      :i18n="i18n"
    />
  </component>
</template>
