<script setup lang="ts">
import { useStore } from '@/store'
import { useDark, useToggle } from '@vueuse/core'
import {
  Bars3Icon,
  RectangleGroupIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/solid'
import { Logo, Sidebar, SidebarItem } from '@/components'

const store = useStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <Sidebar sidebar-class="bg-gray-900">
      <template #aside>
        <div class="flex h-full flex-col justify-between">
          <nav>
            <router-link
              :to="{ name: 'home' }"
              class="block border-b border-gray-800 p-5 text-2xl font-thin text-white hover:bg-white/5 hover:no-underline focus:bg-white/5 focus:outline-none"
            >
              <Logo />
            </router-link>

            <SidebarItem :to="{ name: 'home' }" :icon="RectangleGroupIcon">{{
              $t('nav.home')
            }}</SidebarItem>

            <SidebarItem :to="{ name: 'items' }" :icon="RectangleGroupIcon">{{
              $t('nav.items')
            }}</SidebarItem>
          </nav>

          <nav>
            <SidebarItem
              :icon="isDark ? SunIcon : MoonIcon"
              @click="toggleDark()"
              >{{ isDark ? 'Light' : 'Dark' }}</SidebarItem
            >
            <SidebarItem
              :to="{ name: !store.currentUser ? 'login' : 'logout' }"
              :icon="UserCircleIcon"
              >{{
                !store.currentUser ? $t('nav.login') : $t('nav.logout')
              }}</SidebarItem
            >
          </nav>
        </div>
      </template>

      <template #default="{ state, toggle }">
        <header
          v-if="state !== 'pinned'"
          class="flex border-b border-gray-800 bg-gray-900"
        >
          <router-link
            :to="{ name: 'home' }"
            class="p-5 text-2xl font-thin text-white hover:no-underline"
          >
            <Logo />
          </router-link>

          <!-- uncomment if not using sidebar -->
          <!-- <nav class="flex">
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
              <span class="sr-only">{{
                isDark ? 'Light Mode' : 'Dark Mode'
              }}</span>
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
          </nav> -->

          <nav class="ml-auto">
            <button class="p-5 text-white" @click="toggle">
              <Bars3Icon class="h-6 w-6" />
            </button>
          </nav>
        </header>

        <main class="container mx-auto px-5 py-10 lg:px-10">
          <suspense>
            <router-view v-slot="{ Component, route: pageRoute }">
              <component :is="Component" :key="pageRoute.path" />
            </router-view>
          </suspense>
        </main>
      </template>
    </Sidebar>
  </div>
</template>
