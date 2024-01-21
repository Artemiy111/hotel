<script setup lang="ts">
const guest = defineModel<{ lastName: string; name: string; middleMane: string }>({
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
    <UInputText placeholder="Фамилия" v-model="guest.lastName" />
    <UInputText placeholder="Имя" v-model="guest.name" />
    <UInputText placeholder="Отчество" v-model="guest.middleMane" />
  </div>
</template>
