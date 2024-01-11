import { TypedSchema } from 'vee-validate'
import { Component } from 'vue'
import { Variant, Size } from '@@/types'

export interface FormSchemaOption<T extends string> {
  value: T
  label: string
  disabled?: boolean
}

export interface FormSchemaField<T> {
  as?: string | Component
  type?: string
  name: keyof T
  label: string
  placeholder?: string
  help?: string
  badge?: string
  tooltip?: string
  options?: FormSchemaOption<string>[]
  i18nOptions?: boolean // whether to treat option labels as i18n keys
  hideLabel?: boolean
  [key: string]: unknown
  attrs?: Record<string, string | number | symbol | undefined>
}

// export interface FormSchemaSelectField<T = string> extends FormSchemaField {
//   options: FormSchemaOption<T>[]
// }

export interface FormSchema<T> {
  rules?: TypedSchema<T>
  fields: FormSchemaField<T>[]
}

interface FormAction {
  id: string
  type: 'button' | 'submit'
  label: string
  icon?: Component
  hidden?: boolean
  loading?: boolean
  disabled?: boolean
  variant?: Variant // attrs only?
  size?: Size
  outline?: boolean
  attrs?: Record<string, unknown>
  onClick?: () => void
}
