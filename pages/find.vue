<script setup lang="ts">
import BookingCalendarButton from '~/components/BookingCalendarButton.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import InputNumberWithButtons from '~/components/InputNumberWithButtons.vue'
import { useBookingStore } from '~/store/booking'

const bookingStore = useBookingStore()

const { data: rooms, error: _error } = await useFetch('/api/rooms')

const square = ref(0)
</script>

<template>
  <div class="grid grid-cols-[300px_1fr] mx-auto gap-16 container">
    <aside class="flex flex-col gap-4">
      <span class="font-bold">Фильтры</span>
      <div class="flex flex-col gap-4" />
      <BookingCalendarButton />

      <span class="whitespace-nowrap">Взрослые <span class="text-slate-500">от 12 лет</span> </span>
      <InputNumberWithButtons
        :can-decrement="bookingStore.canDecrementAdults"
        :can-increment="bookingStore.canIncrementAdults"
        :number="bookingStore.guests.adults"
        @increment="bookingStore.incrementAdults"
        @decrement="bookingStore.decrementAdults"
      />
      <span class="whitespace-nowrap">Дети <span class="text-slate-500">от 2 до 12 лет</span> </span>

      <InputNumberWithButtons
        :can-decrement="bookingStore.canDecrementChildren"
        :can-increment="bookingStore.canIncrementChildren"
        :number="bookingStore.guests.children"
        @increment="bookingStore.incrementChildren"
        @decrement="bookingStore.decrementChildren"
      />
      <span class="whitespace-nowrap">Младенцы <span class="text-slate-500">до 2 лет</span> </span>

      <InputNumberWithButtons
        :can-decrement="bookingStore.canDecrementBabies"
        :can-increment="bookingStore.canIncrementBabies"
        :number="bookingStore.guests.babies"
        @increment="bookingStore.incrementBabies"
        @decrement="bookingStore.decrementBabies"
      />

      <div class="">
        <Label class="text-base" for="square">Площадь <span>м<sup>2</sup></span></Label>
        <Input id="square" v-model="square" type="number" :min="0" :max="100" />
      </div>
    </aside>
    <section class="flex flex-col gap-8">
      <RoomCardFull v-for="room in rooms" :key="room.id" :room="room" :button="{ show: true, isOutlined: true }" />
    </section>
  </div>
</template>
