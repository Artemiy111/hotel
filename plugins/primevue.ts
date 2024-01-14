import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import Lara from '@/presets/lara'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((app) => {
  app.vueApp.use(PrimeVue, {
    unstyled: true,
    ripple: false,
    // inputStyle: 'filled',

    pt: Lara,
    ptOptions: {
      mergeSections: true,
      mergeProps: false,
    },
  } satisfies PrimeVueConfiguration)
})
