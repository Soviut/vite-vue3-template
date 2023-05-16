<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Btn, PromptPanel } from '@/components'

const router = useRouter()
const store = useStore()

const logout = async () => {
  await store.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <UseHead>
    <title>{{ $t('pages.logout.title') }}</title>
  </UseHead>

  <PromptPanel>
    <template #header>
      <h1>{{ $t('pages.logout.title') }}</h1>
    </template>

    <p class="mb-8">{{ $t('pages.logout.confirm') }}</p>

    <template #actions>
      <Btn variant="danger" class="!block w-full" @click="logout">
        {{ $t('actions.logout') }}
      </Btn>
    </template>
  </PromptPanel>
</template>
