<template>
  <div>
    <header class="flex bg-gray-900">
      <router-link
        :to="{ name: 'home' }"
        class="p-5 text-white text-2xl font-thin hover:no-underline"
      >
        Template
      </router-link>

      <nav class="flex">
        <router-link
          :to="{ name: 'home' }"
          class="p-5 border-b-4 border-transparent hover:no-underline"
          active-class="border-primary-500 text-white"
        >
          Home
        </router-link>
      </nav>
    </header>

    <main class="container mx-auto px-5 py-10">
      <router-view />
    </main>
  </div>
</template>
