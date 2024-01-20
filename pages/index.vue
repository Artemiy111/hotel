<script setup lang="ts">
import DateBookingPanel from '~/components/DateBookingPanel.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import type { Room } from '~/types'

const cardDialogInfo = ref<Room | null>(null)

const isCardDialogVisible = ref(false)

const openCardOverlay = (room: Room) => {
  cardDialogInfo.value = room
  isCardDialogVisible.value = true
}

watch(isCardDialogVisible, () => {
  if (!isCardDialogVisible.value) cardDialogInfo.value = null
})

const { data: rooms, error } = await useFetch('/api/rooms')
</script>

<template>
  <section class="h-100dvh relative flex flex-col items-center justify-center gap-10">
    <NuxtImg src="/images/hotel-screen.jpg" class="z--1 absolute h-full w-full" />
    <h1 class="text-4xl font-bold text-white">Бронируйте номера в нашем гостевом доме</h1>
    <DateBookingPanel class="rounded-3xl p-10 shadow-lg backdrop-blur-sm backdrop-brightness-75" />
  </section>
  <section id="rooms" class="container m-auto mt-20 flex flex-col gap-8">
    <h2 class="text-4xl font-bold">Номера</h2>
    <div class="grid grid-cols-3 gap-5">
      <div
        v-for="room in rooms"
        class="flex w-full flex-col overflow-hidden rounded-xl border-2 border-surface-200"
      >
        <NuxtImg
          :src="`/images/rooms/${room.id}/${room.images.preview.id}.jpg`"
          class="aspect-video w-full"
        />
        <div class="flex cursor-pointer flex-col p-4" @click="openCardOverlay(room)">
          <h6 class="text-2xl font-bold">{{ room.title }}</h6>
          <span class="mt-3"> {{ room.price }}р ночь</span>
          <UButton class="mt-3 w-max" size="small" label="" outlined>Подробнее</UButton>
        </div>
      </div>
    </div>
  </section>
  <UDialog
    v-model:visible="isCardDialogVisible"
    modal
    :closable="false"
    :dismissable-mask="true"
    :show-header="false"
    :pt="{ root: 'w-95dvw', content: '', mask: 'backdrop-brightness-75' }"
    :pt-options="{ mergeProps: false, mergeSections: true }"
  >
    <template #container>
      <RoomCardFull
        v-if="cardDialogInfo"
        class="rounded-xl border-2 border-surface-200 bg-white p-8"
        :room="cardDialogInfo"
      />
    </template>
  </UDialog>
  <section class="container m-auto mt-20 flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h3 class="text-4xl font-bold">Расположение</h3>
      <span>г. Москва, ул Запоздалая, дом 34</span>
    </div>
    <div class="w-full">
      <NuxtImg src="/images/map.jpg" class="max-h-70dvh mb-10 w-full rounded-xl object-cover" />
    </div>
  </section>
</template>
