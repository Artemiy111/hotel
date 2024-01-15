import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import Lara from '@/presets/lara'
// import 'primevue/resources/themes/lara-light-green/theme.css'

// declare module 'primevue/galleria'

// import {} from 'primevue/galleria/style/galleriastyle.js'
// import {} from 'primevue/galleria'

export default defineNuxtPlugin((app) => {
  app.vueApp.use(PrimeVue, {
    unstyled: true,
    ripple: false,
    // inputStyle: 'filled', //not working

    pt: Lara,
    ptOptions: {
      mergeSections: true,
      mergeProps: false,
    },
  } satisfies PrimeVueConfiguration)
})
