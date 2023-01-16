<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello world')
</script>

<template>
  <div>
    <header class="mb-8">
      <h1>{{ $t('pages.home.title') }}</h1>
    </header>

    <div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
