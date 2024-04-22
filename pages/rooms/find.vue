<script setup lang="ts">
import BookingCalendar from '~/components/BookingCalendar.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import { useBookingStore } from '~/store/useBookingStore'

const bookingStore = useBookingStore()

const { data: rooms, error: _error } = await useFetch('/api/rooms')
</script>

<template>
  <div class="grid grid-cols-[300px_1fr] mx-auto gap-16 container">
    <aside class="flex flex-col gap-4">
      <span class="font-bold">Фильтры</span>
      <div class="flex flex-col gap-4">
        <BookingCalendar interval-type="start" input-id-postfix="find" />
        <BookingCalendar interval-type="end" input-id-postfix="find" />
        <div class="w-full">
          <span>Взрослых</span>
          <UInputNumber v-model="bookingStore.countGuests.adults" :min="1" :max="10" class="w-full" />
          <USlider v-model="bookingStore.countGuests.adults" :step="1" :min="1" :max="10" />
        </div>
        <div class="w-full">
          <span>Детей</span>
          <UInputNumber v-model="bookingStore.countGuests.adults" :min="1" :max="10" class="w-full" />
          <USlider v-model="bookingStore.countGuests.adults" :step="1" :min="1" :max="10" />
        </div>
      </div>
    </aside>
    <section class="flex flex-col gap-8">
      <RoomCardFull v-for="room in rooms" :key="room.id" :room="room" />
    </section>
  </div>
</template>
