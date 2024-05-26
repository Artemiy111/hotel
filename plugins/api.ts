export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.apiBaseUrl,
  })
  return {
    provide: {
      api,
    },
  }
})
