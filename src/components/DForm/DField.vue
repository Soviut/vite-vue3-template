<script setup lang="ts" generic="T">
import { computed, onMounted, ref } from 'vue'
import { useField } from 'vee-validate'
import { FormSchemaField } from '.'

const props = defineProps<{
  formId?: string
  field: FormSchemaField<T>
  disabled?: boolean
  i18n?: boolean
}>()

const { value, errorMessage } = useField<string>(String(props.field.name))

const fieldAs = computed(() => {
  return props.field.as ?? 'input'
})

const fieldType = computed(() => {
  return fieldAs.value === 'input' ? props.field.type ?? 'text' : undefined
})

const isCheckbox = computed(() => {
  return (
    fieldAs.value === 'input' &&
    (fieldType.value === 'checkbox' || fieldType.value === 'radio')
  )
})

const uniqueId = ref<string>()

onMounted(() => {
  uniqueId.value = Math.random().toString(36).slice(2, 9)
})
</script>

<template>
  <div
    class="grid gap-x-3 gap-y-1"
    :class="isCheckbox && 'grid-cols-[min-content,1fr]'"
  >
    <div
      class="inline-flex gap-2"
      :class="[isCheckbox && 'col-start-2', field.hideLabel && 'cr-only']"
    >
      <label :for="`${String(field.name)}_${uniqueId}`">{{
        i18n ? $t(field.label) : field.label
      }}</label>

      <div v-if="field.badge" class="text-muted">
        {{ i18n ? $t(field.badge) : field.badge }}
      </div>

      <div v-if="field.tooltip">
        {{ i18n ? $t(field.tooltip) : field.tooltip }}
      </div>
    </div>

    <div :class="isCheckbox && 'col-start-1 row-start-1'">
      <input
        v-if="fieldAs === 'input'"
        :id="`${String(field.name)}_${uniqueId}`"
        v-model="value"
        :type="fieldType"
        :form="formId"
        :placeholder="
          i18n && field.placeholder ? $t(field.placeholder) : field.placeholder
        "
        :disabled="disabled"
        v-bind="field.attrs"
      />
      <textarea
        v-else-if="fieldAs === 'textarea'"
        :id="`${String(field.name)}_${uniqueId}`"
        v-model="value"
        :placeholder="
          i18n && field.placeholder ? $t(field.placeholder) : field.placeholder
        "
        :disabled="disabled"
        v-bind="field.attrs"
      />
      <select
        v-else-if="fieldAs === 'select'"
        :id="`${String(field.name)}_${uniqueId}`"
        v-model="value"
        :class="
          typeof value === 'undefined' && '!text-gray-400 focus:!text-inherit'
        "
        :disabled="disabled"
        v-bind="field.attrs"
      >
        <option :value="undefined" disabled selected hidden>
          {{
            i18n && field.placeholder
              ? $t(field.placeholder)
              : field.placeholder
          }}
        </option>

        <option
          v-for="option in field.options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ field.i18nOptions ? $t(option.label) : option.label }}
        </option>
      </select>
      <component
        :is="fieldAs"
        v-else
        :id="`${String(field.name)}_${uniqueId}`"
        v-model="value"
        :disabled="disabled"
        v-bind="field.attrs"
      />
    </div>

    <div v-if="field.help" class="text-muted col-span-full col-start-2 text-sm">
      {{ i18n ? $t(field.help) : field.help }}
    </div>

    <div
      v-if="errorMessage"
      class="col-span-full col-start-2 text-sm text-danger-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
