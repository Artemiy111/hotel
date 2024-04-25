<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue'
import BookingPanel from '~/components/BookingPanel.vue'
import RoomCard from '~/components/RoomCard.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import type { Room } from '~/types'
import { useToast } from '~/components/ui/toast'

const cardDialogInfo = ref<Room | null>(null)
const isCardDialogVisible = ref(false)

function openCardDialog(room: Room) {
  cardDialogInfo.value = room
  isCardDialogVisible.value = true
}

watch(isCardDialogVisible, () => {
  if (!isCardDialogVisible.value)
    cardDialogInfo.value = null
})

const { data: rooms, error } = await useFetch('/api/rooms')
const toast = useToast()
watch(error, () => {
  if (error)
    return

  toast.toast({ variant: 'destructive', title: 'Ошибка', description: 'Не удалось загрузить информацию о номерах' })
})
</script>

<template>
  <div class="">
    <section id="start-screen" class="relative h-dvh flex flex-col items-center justify-center gap-10">
      <NuxtImg src="/images/hotel-screen.jpg" class="absolute z--1 h-full w-full" />
      <h1 class="text-4xl text-white font-bold">
        Бронируйте номера в нашем гостевом доме
      </h1>
      <BookingPanel class="rounded-3xl p-10 shadow-lg backdrop-blur-sm backdrop-brightness-75" />
    </section>
    <section id="rooms" class="m-auto mt-20 flex flex-col gap-8 container">
      <h2 class="text-4xl font-bold">
        Номера
      </h2>
      <div class="grid grid-cols-3 gap-5">
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" class="cursor-pointer" @click="openCardDialog(room)" />
      </div>
    </section>
    <Dialog v-model:open="isCardDialogVisible">
      <DialogContent as-child class="flex max-w-full">
        <RoomCardFull
          v-if="cardDialogInfo"
          class="w-[80dvw]"
          :room="cardDialogInfo"
        />
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Комната</DialogTitle>
            <DialogDescription>Комната</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
    >

    <section class="m-auto mt-20 flex flex-col gap-8 container">
      <div class="flex flex-col gap-4">
        <h3 class="text-4xl font-bold">
          Расположение
        </h3>
        <span>г. Москва, ул Запоздалая, дом 34</span>
      </div>
      <div class="w-full">
        <NuxtImg src="/images/map.jpg" class="mb-10 max-h-70dvh w-full rounded-xl object-cover" />
      </div>
    </section>
  </div>
</template>
