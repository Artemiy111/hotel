<script setup lang=ts>
import { useAuthStore } from '~/store/auth'
import { useToast } from '~/components/ui/toast'

const authStore = useAuthStore()

const password = ref('')
const { toast } = useToast()
const auth = () => {
  const authed = authStore.auth(password.value)
  console.log(authed)
  if (authed) {
    toast({ variant: 'success', title: 'Вход выполнен' })
    navigateTo('/admin')
  }
  else {
    toast({ variant: 'destructive', title: 'Неправильный пароль' })
  }
}
</script>

<template>
  <div class="container flex flex-col gap-4 max-w-[500px]">
    <div class="flex gap-4 items-center justify-center">
      <Label>Пароль </Label>
      <Input
        v-model="password"
        type="password"
      />
    </div>
    <Button @click="auth">
      Войти
    </Button>
  </div>
</template>
