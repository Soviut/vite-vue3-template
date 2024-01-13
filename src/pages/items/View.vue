<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = ref(route.params.id)

const items = ref([
  { id: '111', name: 'First Item' },
  { id: '222', name: 'Second Item' },
  { id: '333', name: 'Third Item' },
])

const item = computed(() => {
  return items.value.find((item) => item.id === id.value)
})
</script>

<template>
  <useHead>
    <title>{{ item?.name }}</title>
  </useHead>

  <div>
    <PageHeader
      :title="item?.name"
      :breadcrumbs="[{ text: $t('nav.items'), to: { name: 'items' } }]"
    />
  </div>
</template>
