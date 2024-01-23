<script setup lang="ts">
import BookingPanel from '~/components/BookingPanel.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import type { Room } from '~/types'

const cardDialogInfo = ref<Room | null>(null)

const isCardDialogVisible = ref(false)

function openCardOverlay(room: Room) {
  cardDialogInfo.value = room
  isCardDialogVisible.value = true
}

watch(isCardDialogVisible, () => {
  if (!isCardDialogVisible.value)
    cardDialogInfo.value = null
})

const { data: rooms, error: _error } = await useFetch('/api/rooms')
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <section id="start-screen" class="relative h-100dvh flex flex-col items-center justify-center gap-10">
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
      <div
        v-for="room in rooms"
        :key="room.id"
        class="w-full flex flex-col overflow-hidden border-2 border-surface-200 rounded-xl"
      >
        <NuxtImg
          :src="`/images/rooms/${room.id}/${room.images.preview.id}.jpg`"
          class="aspect-video w-full"
        />
        <div class="flex flex-col cursor-pointer p-4" @click="openCardOverlay(room)">
          <h6 class="text-2xl font-bold">
            {{ room.title }}
          </h6>
          <span class="mt-3"> {{ room.price }}р ночь</span>
          <UButton class="mt-3 w-max" size="small" label="" outlined>
            Подробнее
          </UButton>
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
        class="border-2 border-surface-200 rounded-xl bg-white p-8"
        :room="cardDialogInfo"
      />
    </template>
  </UDialog>

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
</template>
