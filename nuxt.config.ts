import path from 'path'
import UnoCSS from 'unocss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-primevue', '@nuxt/image'],
  css: ['@/assets/css/main.css'],
  imports: { autoImport: true },
  components: {
    dirs: [],
  },
  image: {
    format: ['avif', 'webp', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  vite: {
    plugins: [UnoCSS()],
  },
  postcss: {
    plugins: { '@unocss/postcss': {} },
  },
  primevue: {
    usePrimeVue: false,
    cssLayerOrder: 'reset, primevue, base',
    components: { include: '*', prefix: 'U' },
    // importPT: { as: 'Lara', from: path.resolve(__dirname, './presets/lara/') },
  },
})
