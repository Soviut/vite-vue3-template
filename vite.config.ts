/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      fullInstall: false, // do not install components and directives
      include: path.resolve(__dirname, './src/locales/**'),
    }),
  ],

  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    ],
  },

  test: {
    environment: 'jsdom',
    // remove or set to 'default' to only show failing tests
    reporters: 'verbose',
  },
})
