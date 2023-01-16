<script setup lang="ts">
import { useStore } from '@/store'
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const store = useStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <header class="flex bg-gray-900">
      <router-link
        :to="{ name: 'home' }"
        class="p-5 text-2xl font-thin text-white hover:no-underline"
      >
        {{ $t('title') }}
      </router-link>

      <nav class="flex">
        <router-link
          :to="{ name: 'home' }"
          class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          {{ $t('nav.home') }}
        </router-link>
      </nav>

      <nav class="ml-auto flex">
        <button
          class="py-4 px-5 text-primary-500 hover:text-white hover:no-underline"
          active-class="bg-gray-800 text-white"
          @click="toggleDark()"
        >
          <SunIcon v-if="isDark" class="mx-auto h-6 w-6" />
          <MoonIcon v-else class="mx-auto h-6 w-6" />
          <span class="sr-only">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>

        <router-link
          v-if="!store.currentUser"
          :to="{ name: 'login' }"
          class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          {{ $t('nav.login') }}
        </router-link>

        <router-link
          v-else
          :to="{ name: 'logout' }"
          class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          {{ $t('nav.logout') }}
        </router-link>
      </nav>
    </header>

    <main class="container mx-auto px-5 py-10">
      <suspense>
        <router-view v-slot="{ Component, route: pageRoute }">
          <component :is="Component" :key="pageRoute.path" />
        </router-view>
      </suspense>
    </main>
  </div>
</template>
