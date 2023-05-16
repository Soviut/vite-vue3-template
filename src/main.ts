import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from '@/router'
import { createPinia } from 'pinia'
import { Head, createHead } from '@vueuse/head'
import detectHiddenScrollbar from '@/plugins/detectHiddenScrollbar'
import '@/assets/index.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createPinia())
app.use(
  createHead({
    titleTemplate: (title) => (title ? `${title} - ` : '') + 'Vite App',
  })
)
app.use(detectHiddenScrollbar)

app.component('UseHead', Head)

app.mount('#app')
