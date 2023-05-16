<script setup lang="ts">
import { VueClassAttr } from '@@/types'

type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type Layout = 'default' | 'flush' | 'full' | 'hidden'

withDefaults(
  defineProps<{
    as?: string
    padding?: PaddingSize

    headerLayout?: Layout
    bodyLayout?: Layout
    footerLayout?: Layout

    headerClass?: VueClassAttr
    bodyClass?: VueClassAttr
    footerClass?: VueClassAttr
  }>(),
  {
    as: 'div',
    padding: 'md',

    headerLayout: 'default',
    bodyLayout: 'default',
    footerLayout: 'default',

    headerClass: '',
    bodyClass: '',
    footerClass: '',
  }
)
</script>

<template>
  <component :is="as" class="rounded-lg bg-gray-100 dark:bg-gray-800">
    <header
      v-if="$slots.header"
      :class="[
        (headerLayout === 'default' || headerLayout === 'full') && {
          'px-0 pt-0': padding === 'none',
          'px-2 pt-2': padding === 'sm',
          'px-3 pt-3': padding === 'md',
          'px-5 pt-5': padding === 'lg',
          'px-8 pt-8': padding === 'xl',
        },
        headerLayout === 'full' && {
          'pb-0': padding === 'none',
          'pb-2': padding === 'sm',
          'pb-3': padding === 'md',
          'pb-5': padding === 'lg',
          'pb-8': padding === 'xl',
        },
        headerLayout === 'flush' && 'overflow-hidden rounded-t-lg',
        headerLayout === 'hidden' && 'hidden',
        headerClass,
      ]"
    >
      <slot name="header" />
    </header>

    <div
      v-if="$slots.default"
      :class="[
        (bodyLayout === 'default' || bodyLayout === 'full') && {
          'p-0': padding === 'none',
          'p-2': padding === 'sm',
          'p-3': padding === 'md',
          'p-5': padding === 'lg',
          'p-8': padding === 'xl',
        },
        bodyLayout === 'flush' && 'p-0',
        bodyLayout === 'hidden' && 'hidden',
        bodyClass,
      ]"
    >
      <slot name="default" />
    </div>

    <footer
      v-if="$slots.footer"
      :class="[
        (footerLayout === 'default' || footerLayout === 'full') && {
          'px-0 pb-0': padding === 'none',
          'px-2 pb-2': padding === 'sm',
          'px-3 pb-3': padding === 'md',
          'px-5 pb-5': padding === 'lg',
          'px-8 pb-8': padding === 'xl',
        },
        footerLayout === 'full' && {
          'pt-0': padding === 'none',
          'pt-2': padding === 'sm',
          'pt-3': padding === 'md',
          'pt-5': padding === 'lg',
          'pt-8': padding === 'xl',
        },
        footerLayout === 'flush' && 'overflow-hidden rounded-t-lg',
        footerLayout === 'hidden' && 'hidden',
        footerClass,
      ]"
    >
      <slot name="footer" />
    </footer>
  </component>
</template>
