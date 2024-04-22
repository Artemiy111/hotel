export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'nuxt-primevue',
    'nuxt-icon',
  ],
  imports: { autoImport: true },
  components: {
    dirs: [],
  },
  image: {
    format: ['avif', 'webp', 'png', 'jpeg'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },

  primevue: {
    usePrimeVue: true,
    // cssLayerOrder: 'reset, primevue, base',
    components: { include: '*', prefix: 'U' },
  },
})
