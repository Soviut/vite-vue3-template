import { defineStore } from 'pinia'
import { User } from '@/types'

export const useStore = defineStore('main', {
  state: (): {
    currentUser: null | User
  } => ({
    currentUser: null,
  }),

  actions: {
    async login(email: string, _password: string) {
      // TODO: call auth service here

      this.currentUser = {
        email,
      }
    },

    async logout() {
      // TODO: call auth service here

      this.currentUser = null
    },
  },
})
