<script setup lang="ts">
import InputNumberWithButtons from './InputNumberWithButtons.vue'
import { useBookingStore } from '~/store/booking'

const bookingStore = useBookingStore()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="bg-white hover:bg-primary-foreground"
      >
        Гостей: {{ bookingStore.countGuests }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-4 flex flex-col w-full gap-4">
      <div class="grid grid-cols-[1fr,max-content] gap-x-16 gap-y-4 justify-between items-center">
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
      </div>
    </PopoverContent>
  </Popover>
</template>
