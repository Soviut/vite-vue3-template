import { Empty } from '@/components/Empty'; import { Btn } from '@/components';
import { RouterLink } from 'vue-router';
<script setup lang="ts">
import { ref } from 'vue'
import { Btn, Empty, Panel } from '@/components'

const items = ref([
  { id: '111', name: 'First Item' },
  { id: '222', name: 'Second Item' },
  { id: '333', name: 'Third Item' },
])
</script>

<template>
  <useHead>
    <title>{{ $t('pages.items.title') }}</title>
  </useHead>

  <div>
    <PageHeader :title="$t('pages.items.title')" class="mb-10">
      <template #actions>
        <Btn :to="{ name: 'items-create' }" variant="primary">
          {{ $t('actions.create') }}
        </Btn>
      </template>
    </PageHeader>

    <Empty
      v-if="items.length === 0"
      :title="$t('messages.noModel', { model: $t('models.items') })"
      size="xl"
    >
      <template #actions>
        <Btn :to="{ name: 'items-create' }" variant="primary">
          {{ $t('actions.create') }}
        </Btn>
      </template>
    </Empty>

    <ul v-else class="space-y-2">
      <Panel
        v-for="item in items"
        :key="item.id"
        as="li"
        body-class="flex items-center justify-between"
      >
        <div>
          <RouterLink :to="{ name: 'items-edit', params: { id: item.id } }">
            {{ item.name }}
          </RouterLink>
        </div>

        <div class="space-x-2">
          <Btn
            :to="{ name: 'items-view', params: { id: item.id } }"
            variant="secondary"
            outline
            size="sm"
          >
            {{ $t('actions.view') }}
          </Btn>

          <Btn
            :to="{ name: 'items-edit', params: { id: item.id } }"
            variant="secondary"
            outline
            size="sm"
          >
            {{ $t('actions.edit') }}
          </Btn>
        </div>
      </Panel>
    </ul>
  </div>
</template>
