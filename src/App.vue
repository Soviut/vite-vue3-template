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
import { NavItem, Sidebar } from '@/components'

const store = useStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const sidebarEnabled = true
</script>

<template>
  <div>
    <Sidebar sidebar-class="bg-gray-900" :disabled="!sidebarEnabled">
      <template #aside>
        <div class="flex h-full flex-col justify-between">
          <nav>
            <NavItem to="/" :icon="RectangleGroupIcon">Home</NavItem>
          </nav>

          <nav>
            <NavItem
              :icon="isDark ? SunIcon : MoonIcon"
              @click="toggleDark()"
              >{{ isDark ? 'Light' : 'Dark' }}</NavItem
            >
            <NavItem to="/login" :icon="UserCircleIcon">Account</NavItem>
          </nav>
        </div>
      </template>

      <template #default="{ toggle }">
        <header
          class="flex bg-gray-900"
          :class="{ 'lg:hidden': sidebarEnabled }"
        >
          <router-link
            :to="{ name: 'home' }"
            class="p-5 text-2xl font-thin text-white hover:no-underline"
          >
            {{ $t('title') }}
          </router-link>

          <nav v-if="!sidebarEnabled" class="flex">
            <router-link
              :to="{ name: 'home' }"
              class="border-b-4 border-transparent p-5 hover:text-white hover:no-underline"
              active-class="border-primary-500 text-white"
            >
              {{ $t('nav.home') }}
            </router-link>
          </nav>

          <nav v-if="!sidebarEnabled" class="ml-auto flex">
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
          </nav>

          <nav v-if="sidebarEnabled" class="ml-auto">
            <button class="p-5" @click="toggle">
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
