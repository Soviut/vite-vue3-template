<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello world')
</script>

<template>
  <UseHead>
    <title>{{ $t('pages.home.title') }}</title>
  </UseHead>

  <div>
    <PageHeader :title="$t('pages.home.title')" class="mb-10" />

    <div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
