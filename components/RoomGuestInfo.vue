<script setup lang="ts">
const guest = defineModel<{ lastName: string, name: string, middleName: string }>({
  required: true,
})
</script>

<template>
  <div class="flex w-full max-w-[785px] gap-4">
    <Input
      v-model="guest.lastName"
      placeholder="Фамилия"
      class="w-full"
    />
    <Input
      v-model="guest.name"
      placeholder="Имя"
      class="w-full"
    />
    <Input
      v-model="guest.middleName"
      placeholder="Отчество"
      class="w-full"
    />
  </div>
</template>
