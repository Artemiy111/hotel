import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import { defineNuxtPlugin } from '#imports'

// export default
defineNuxtPlugin(app => {
  app.vueApp.use(PrimeVue, { unstyled: true, pt: Lara })
})
