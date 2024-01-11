import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from '@/router'
import { createPinia } from 'pinia'
import { Head, createHead } from '@vueuse/head'
import detectHiddenScrollbar from '@/plugins/detectHiddenScrollbar'
import { createToaster } from '@/plugins/toaster'
import { PageHeader } from '@/components'
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
app.use(createToaster(), { variant: 'primary' })

app.component('UseHead', Head)
app.component('PageHeader', PageHeader)

app.mount('#app')
