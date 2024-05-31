export const useAuthStore = defineStore('auth', () => {
  const isAuthed = ref(false)
  const auth = (password: string) => {
    if (password === '111') {
      isAuthed.value = true
    }
    return isAuthed.value
  }

  return {
    isAuthed,
    auth,
  }
})
