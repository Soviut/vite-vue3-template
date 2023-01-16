<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Btn } from '@/components'

const router = useRouter()
const route = useRoute()
const store = useStore()

const email = ref('')
const password = ref('')

const showPassword = ref(false)

const login = async () => {
  await store.login(email.value, password.value)

  // if supplied, redirect to the previous page after login
  const redirect = route.query.redirect
  if (redirect) {
    router.replace(redirect as string)
  } else {
    router.replace({ name: 'home' })
  }
}
</script>

<template>
  <div class="mx-auto max-w-md rounded border p-5">
    <header class="mb-8 text-center">
      <h1>Sign in</h1>
    </header>

    <form @submit.prevent="login">
      <div class="mb-5">
        <label for="email" class="sr-only">{{ $t('forms.login.email') }}</label>
        <input
          id="email"
          v-model="email"
          type="email"
          :placeholder="$t('forms.login.emailPlaceholder')"
          required
        />
      </div>

      <div class="mb-2">
        <label for="password" class="sr-only">{{
          $t('forms.login.password')
        }}</label>
        <input
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="$t('forms.login.passwordPlaceholder')"
          required
        />
      </div>

      <div class="mb-8 flex items-center">
        <input
          id="show-password"
          v-model="showPassword"
          class="mr-2"
          type="checkbox"
        />

        <label for="show-password" class="text-sm">{{
          $t('forms.login.showPassword')
        }}</label>
      </div>

      <hr class="mb-8" />

      <Btn type="submit" variant="primary" class="!block w-full">{{
        $t('actions.login')
      }}</Btn>
    </form>
  </div>
</template>
