<template>
  <div>
    <header>
      <router-link :to="{ name: 'home' }">
        Template App
      </router-link>

      <nav>
        <router-link :to="{ name: 'home' }">
          Home
        </router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>
