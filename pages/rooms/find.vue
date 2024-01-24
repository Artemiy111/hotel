<script setup lang="ts">
import BookingCalendar from '~/components/BookingCalendar.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import type { Room } from '~/types'
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
         <UInputNumber v-model="bookingStore.countGuests.adults" :min="1" :max="10"/>
        <USlider  :step="1" :min="1" :max="10" v-model="bookingStore.countGuests.adults"/>
       </div>
      </div>
    </aside>
    <section class="flex flex-col gap-8">
      <RoomCardFull v-for="room in rooms" :key="room.id" :room="room" />
    </section>
  </div>
</template>
