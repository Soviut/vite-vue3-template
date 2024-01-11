<script setup lang="ts" generic="T">
import { computed, toRaw, useSlots, watch } from 'vue'
import { useForm } from 'vee-validate'
import { DActions, DGroup, FormAction, FormSchema } from '.'

// TODO: prop to pass custom field component?
// TODO: prop to pass in custom field component? possibly for headless.
// TODO: actions class
// TODO: fields class
// TODO: i18n path prefix support

const props = withDefaults(
  defineProps<{
    formId?: string
    schema: FormSchema<T>
    initialValues?: Partial<T>
    include?: string[]
    actions?: FormAction[]
    submitText?: string
    cancelText?: string
    resetOnCancel?: boolean
    loading?: boolean
    disabled?: boolean // disables fields
    preventSubmit?: boolean // disables submit
    mergeInitialValues?: boolean
    i18n?: boolean
  }>(),
  {
    formId: undefined,
    initialValues: () => ({}),
    include: () => [],
    actions: () => [],
    submitText: 'Submit',
    cancelText: 'Cancel',
  }
)

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'submit', values: Partial<T>): void
}>()

const slots = useSlots()

// TODO: is GenericObject the right type here? or type-fest PartialDeep?
const { values, handleSubmit, meta, resetForm } = useForm({
  validationSchema: props.schema.rules,
  // initialValues: props.initialValues as GenericObject,
})

watch(
  () => props.initialValues,
  (vals) => {
    resetForm({ values: vals })
  },
  { immediate: true }
)

const renderFields = computed(() => {
  return props.include.length > 0
    ? props.schema.fields.filter((field) => {
        return props.include.includes(String(field.name))
      })
    : props.schema.fields
})

const canSubmit = computed(() => {
  return (
    meta.value.valid &&
    !meta.value.pending &&
    !props.loading &&
    !props.preventSubmit
  )
})

const availableActions = computed<FormAction[]>(() => {
  const acts: FormAction[] = []

  if (props.submitText) {
    acts.push({
      id: 'submit',
      type: 'submit',
      label: props.submitText,
      loading: props.loading,
      variant: 'primary',
    })
  }

  if (props.cancelText) {
    acts.push({
      id: 'cancel',
      type: 'button',
      label: props.cancelText,
      outline: true,
      onClick: cancel,
    })
  }

  return [...acts, ...(props.actions?.filter((action) => !action.hidden) ?? [])]
})

const hasActions = computed(() => {
  return availableActions.value.length > 0 || slots.actions
})

const submit = handleSubmit(() => {
  const merged = props.mergeInitialValues
    ? { ...props.initialValues, ...values }
    : values

  // TODO: deep clone the values to avoid mutation leaking
  const norm = toRaw(merged)
  emit('submit', norm as Partial<T>)
})

const cancel = () => {
  if (props.resetOnCancel) {
    reset()
  }

  emit('cancel')
}

const reset = () => {
  resetForm({ values: props.initialValues })
}

defineExpose({
  values,
  reset,
  submit,
  canSubmit,
  cancel,
})
</script>

<template>
  <form class="space-y-5" @submit.prevent="submit">
    <slot
      :fields="schema.fields"
      :render-fields="renderFields"
      :values="values"
      :submit="submit"
      :has-actions="hasActions"
      :can-submit="canSubmit"
      :form-id="formId"
      :i18n="i18n"
    >
      <DGroup
        :fields="renderFields"
        :i18n="i18n"
        class="space-y-5"
        :disabled="loading || disabled"
      />
    </slot>

    <footer v-if="hasActions" class="flex items-center gap-2">
      <slot
        name="actions"
        :submit="submit"
        :cancel="cancel"
        :has-actions="hasActions"
        :can-submit="canSubmit"
        :loading="loading"
        :form-id="formId"
        :i18n="i18n"
        :actions="availableActions"
      >
        <DActions
          :form-id="formId"
          :loading="loading"
          :prevent-submit="!canSubmit"
          :actions="availableActions"
          :i18n="i18n"
        />
      </slot>
    </footer>
  </form>
</template>
