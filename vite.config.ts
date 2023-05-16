/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      fullInstall: false, // do not install components and directives
      include: path.resolve(__dirname, './src/locales/**'),
    }),
    visualizer({
      filename: './dist/stats.html',
      template: 'treemap', // treemap, sunburst, network
    }),
  ],

  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@@', replacement: '/' },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    ],
  },

  server: {
    port: 3000, // default is 5173 (site)
  },

  test: {
    environment: 'jsdom',
    // remove or set to 'default' to only show failing tests
    reporters: 'verbose',
  },
})
