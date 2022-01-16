<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Btn } from '@/components'

const router = useRouter()
const store = useStore()

const logout = async () => {
  await store.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <div class="mx-auto max-w-md p-5 border rounded text-center">
    <header class="mb-8">
      <h1>Sign out</h1>
    </header>

    <p class="mb-8">Are you sure you want to sign out?</p>

    <hr class="mb-8" />

    <Btn variant="danger" class="!block w-full" @click="logout">
      Yes, sign me out
    </Btn>
  </div>
</template>
