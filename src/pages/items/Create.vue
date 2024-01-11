<script setup lang="ts"></script>

<template>
  <useHead>
    <title>{{ $t('pages.itemsCreate.title') }}</title>
  </useHead>

  <div>
    <PageHeader
      :title="$t('pages.itemsCreate.title')"
      :breadcrumbs="[{ text: $t('nav.items'), to: { name: 'items' } }]"
    />
  </div>
</template>
