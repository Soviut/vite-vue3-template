export interface User {
  email: string
}

export type Variant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

export type Size = 'sm' | 'md' | 'lg' | 'xl'

// use for props that behave like :class
export type VueClassAttr =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[]

import { Dayjs } from 'dayjs'

export type DateLike = number | string | Date | Dayjs
