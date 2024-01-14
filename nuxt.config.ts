import path from 'path'
import UnoCSS from 'unocss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-primevue'],
  css: ['@/assets/css/main.css'],
  imports: { autoImport: true },
  components: {
    dirs: [],
  },

  vite: {
    plugins: [UnoCSS()],
  },
  postcss: {
    plugins: { '@unocss/postcss': {} },
  },
  primevue: {
    cssLayerOrder: 'reset, base, primevue',
    components: { include: '*', prefix: 'U' },
    options: { unstyled: true },
    importPT: { as: 'Lara', from: path.resolve(__dirname, './presets/lara/') },
  },
})
