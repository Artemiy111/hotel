<script setup lang="ts">
const guest = defineModel<{ lastName: string, name: string, middleMane: string }>({
  // required: true,
  default: () => ({
    lastName: '',
    name: '',
    middleName: '',
  }),
})
</script>

<template>
  <div class="flex gap-4">
    <UInputText v-model="guest.lastName" placeholder="Фамилия" />
    <UInputText v-model="guest.name" placeholder="Имя" />
    <UInputText v-model="guest.middleMane" placeholder="Отчество" />
  </div>
</template>
