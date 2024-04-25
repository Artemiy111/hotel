<script setup lang="ts">
const guest = defineModel<{ lastName: string, name: string, middleName: string }>({
  required: true,
})
</script>

<template>
  <div class="flex gap-4">
    <Input v-model="guest.lastName" placeholder="Фамилия" class="w-fit" />
    <Input v-model="guest.name" placeholder="Имя" class="w-fit" />
    <Input v-model="guest.middleName" placeholder="Отчество" class="w-fit" />
  </div>
</template>
