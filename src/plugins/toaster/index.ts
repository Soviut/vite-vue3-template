import { Component, inject, Plugin, ref } from 'vue'
import { BellIcon } from '@heroicons/vue/24/solid'

export { default as Toaster } from './Toaster.vue'

export const key = Symbol('toaster')

type ToastVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

type ToastPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

export interface ToastMessage {
  id: string
  message: string
  toaster: string
  options: ToastOptions
}

export interface ToastOptions {
  variant: ToastVariant
  position: ToastPosition
  timeout: number
  showTimeout: boolean
  showIcon: boolean
  icon: Component
  clickToClose: boolean
  closeButton: boolean
}

export type OverrideOptions = Partial<Omit<ToastOptions, 'position'>>

const defaults: ToastOptions = {
  variant: 'secondary',
  position: 'top-right',
  timeout: 5000,
  showTimeout: true,
  showIcon: true,
  icon: BellIcon,
  clickToClose: true,
  closeButton: true,
}

function toaster(options: ToastOptions) {
  const toasts = ref<ToastMessage[]>([])

  const globalOptions = { ...defaults, ...options }

  const toast = (
    message: string,
    overrideOptions: Partial<ToastOptions> = {}
  ) => {
    const localOptions = { ...globalOptions, ...overrideOptions }

    // generate a random id
    const id = Math.random().toString(36).substring(2)
    toasts.value.push({
      id,
      message,
      toaster: 'default',
      options: localOptions,
    })

    if (overrideOptions.timeout !== 0) {
      setTimeout(() => remove(id), localOptions.timeout)
    }
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    toast,
    remove,

    options: globalOptions,
  }
}

export const createToaster = (): Plugin => ({
  install(app, options: ToastOptions) {
    app.provide(key, toaster(options))
  },
})

export function useToaster() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return inject<ReturnType<typeof toaster>>(key)!
}
