import { createI18n } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'

console.log(messages)

export default createI18n({
  legacy: false, // must be false to use Composition API
  globalInjection: true, // allows $t to be used in templates
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
