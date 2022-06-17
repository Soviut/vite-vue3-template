import { createI18n } from 'vue-i18n'
import en from '@/locales/en.yaml'

export default createI18n({
  legacy: false, // must be false to use Composition API
  globalInjection: true, // allows $t to be used in templates
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
})
