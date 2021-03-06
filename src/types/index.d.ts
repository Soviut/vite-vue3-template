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

// use for props that behave like :class
export type VueClassAttr =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[]
