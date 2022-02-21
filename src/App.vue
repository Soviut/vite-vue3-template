<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <div>
    <header class="flex bg-gray-900">
      <router-link
        :to="{ name: 'home' }"
        class="p-5 text-2xl font-thin text-white hover:no-underline"
      >
        Template
      </router-link>

      <nav class="flex">
        <router-link
          :to="{ name: 'home' }"
          class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          Home
        </router-link>
      </nav>

      <nav class="ml-auto flex">
        <router-link
          v-if="store.currentUser"
          :to="{ name: 'login' }"
          class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          Login
        </router-link>

        <router-link
          v-else
          :to="{ name: 'logout' }"
          class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          Logout
        </router-link>
      </nav>
    </header>

    <main class="container mx-auto px-5 py-10">
      <router-view />
    </main>
  </div>
</template>
