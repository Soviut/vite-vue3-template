export { default as Breadcrumb } from './Breadcrumb.vue'
import type { RouteLocationRaw } from 'vue-router'

export interface BreadcrumbToken {
  text: string
  to?: RouteLocationRaw
}
