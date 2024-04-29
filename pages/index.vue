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

const { data: rooms, error } = useFetch('/api/rooms', {
  transform: rooms => rooms.map((room) => {
    return {
      ...room,
      bookedDateRanges: room.bookedDateRanges.map(r => ({ start: new Date(r.start), end: new Date(r.end) })),
    }
  }),
})

const bookedDateRanges = computed(() => rooms.value?.flatMap(r => r.bookedDateRanges) || [])
const toast = useToast()
watch(error, () => {
  if (error)
    return

  toast.toast({ variant: 'destructive', title: 'Ошибка', description: 'Не удалось загрузить информацию о номерах' })
})
</script>

<template>
  <div class="flex flex-col gap-12 xl:gap-16 2xl:gap-20">
    <section
      id="start-screen"
      class="relative h-dvh flex flex-col items-center justify-center px-4  gap-10"
    >
      <NuxtImg
        src="/images/hotel-screen.jpg"
        class="absolute -z-10 h-full w-full"
      />
      <h1 class="md:text-5xl shadow-xl text-3xl text-white font-bold text-balance text-center">
        Гостеприимство с изыском
      </h1>
      <BookingPanel
        :booked-date-ranges="bookedDateRanges"
        class="rounded-xl lg:rounded-3xl p-4 lg:p-8 shadow-lg backdrop-blur-sm backdrop-brightness-75"
      />
    </section>
    <section
      id="rooms"
      class="m-auto flex flex-col 2xl:gap-8 container gap-4 "
    >
      <h2 class="text-2xl lg:text-3xl font-bold">
        Номера
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-2">
        <RoomCard
          v-for="room in rooms"
          :key="room.id"
          :room="room"
          class="cursor-pointer"
          @click="openCardDialog(room)"
        />
      </div>
    </section>
    <Dialog v-model:open="isCardDialogVisible">
      <DialogContent
        as-child
        class="flex max-w-full w-11/12 lg:w-10/12"
      >
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

    <section class="m-auto flex flex-col gap-8 container">
      <div class="flex flex-col gap-4">
        <h3 class="text-2xl lg:text-3xl font-bold">
          Расположение
        </h3>
        <span>г. Москва, ул Запоздалая, дом 34</span>
      </div>
      <div class="w-full ">
        <NuxtImg
          src="/images/map.jpg"
          class="max-h-70dvh aspect-square lg:aspect-video w-full rounded-xl object-cover"
        />
      </div>
    </section>
  </div>
</template>
