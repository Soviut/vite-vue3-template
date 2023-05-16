<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello world')
</script>

<template>
  <UseHead>
    <title>{{ $t('pages.home.title') }}</title>
  </UseHead>

  <div>
    <header class="mb-8">
      <h1>{{ $t('pages.home.title') }}</h1>
    </header>

    <div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
