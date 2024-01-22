import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import 'primevue/resources/themes/lara-light-green/theme.css'

// import Lara from '@/presets/lara'

export default defineNuxtPlugin((app) => {
  app.vueApp.use(PrimeVue, {
    unstyled: false,
    ripple: true,
    // inputStyle: 'filled', //not working

    // pt: Lara,
    ptOptions: {
      mergeSections: true,
      mergeProps: false,
    },
  } satisfies PrimeVueConfiguration)
})
