<script setup lang="ts">
import BookingCalendar from '~/components/BookingCalendar.vue'
import { useBookingStore } from '~/store/useBookingStore'

const props = withDefaults(defineProps<{ showButton?: boolean }>(), { showButton: true })

const bookingStore = useBookingStore()

const guestsSelectionText = computed(() =>
`Взрослых ${bookingStore.value.countGuests.adults} | детей ${bookingStore.value.countGuests.children}`)
</script>

<template>
  <form class="flex gap-2" @submit.prevent>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>
      <BookingCalendar interval-type="start" />
    </UInputGroup>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>
      <BookingCalendar interval-type="end" />
    </UInputGroup>
    <UDropdown v-model="guestsSelectionText" :placeholder="guestsSelectionText" :pt="{ root: 'w-max', input: 'text-clip text-surface-800', panel: 'mt-4' }">
      <template #empty>
        <div class="flex flex-col gap-2">
          <UInputGroup class="w-fit">
            <UInputGroupAddon class="w-30 justify-start">
              Взрослых
            </UInputGroupAddon>
            <UInputNumber
              v-model="bookingStore.countGuests.adults"
              class="w-20 [&_input]:rounded-l-0"
              show-buttons
              :min="1"
              :max="10"
              increment-button-class="disabled"
            />
          </UInputGroup>
          <UInputGroup class="w-fit">
            <UInputGroupAddon class="w-30 justify-start">
              Детей
            </UInputGroupAddon>
            <UInputNumber
              v-model="bookingStore.countGuests.children"
              class="w-20 [&_input]:rounded-l-0"
              show-buttons
              :min="0"
              :max="10"
            />
          </UInputGroup>
        </div>
      </template>
    </UDropdown>
    <UButton v-if="props.showButton" type="submit" label="Найти" />
  </form>
</template>
