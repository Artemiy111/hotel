export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'shadcn-nuxt',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  imports: { autoImport: true },
  components: {
    dirs: [],
  },
  eslint: {
    config: {
      stylistic: true,
    },
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

})
