<script setup lang="ts">
import { computed } from 'vue'
import { Btn, Loading } from '@/components'
import { FormAction } from '.'

const props = defineProps<{
  formId?: string
  actions?: FormAction[]
  loading?: boolean
  preventSubmit?: boolean
  i18n?: boolean
}>()

const visibleActions = computed(() => {
  return props.actions?.filter((action) => !action.hidden) ?? []
})
</script>

<template>
  <div class="flex gap-2">
    <Btn
      v-for="action in visibleActions"
      :key="action.id"
      :form="formId"
      class="flex items-center gap-2"
      :type="action.type"
      :disabled="
        action.disabled ||
        loading ||
        (action.type === 'submit' && preventSubmit)
      "
      :variant="action.variant"
      :size="action.size"
      :outline="action.outline"
      v-bind="action.attrs"
      @click="action.onClick"
    >
      <Component
        :is="action.icon"
        v-if="action.icon && !action.loading && !loading"
        class="h-5 w-5"
      />
      <Loading
        v-if="action.variant === 'primary' && (action.loading || loading)"
        class="h-5 w-5"
      />
      {{ i18n ? $t(action.label) : action.label }}</Btn
    >
  </div>
</template>
