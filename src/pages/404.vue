<script lang="ts" setup>
import { PromptPanel } from '@/components'
</script>

<template>
  <UseHead>
    <title>{{ $t('pages.notFound.title') }}</title>
  </UseHead>

  <PromptPanel>
    <template #header>
      <h1>{{ $t('pages.notFound.title') }}</h1>
    </template>

    <p>{{ $t('pages.notFound.message') }}</p>
  </PromptPanel>
</template>
