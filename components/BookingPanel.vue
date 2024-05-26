<script setup lang="ts">
import BookingCalendarButton from './BookingCalendarButton.vue'
import BookingGuestsCountButton from './BookingGuestsCountButton.vue'
import { buttonVariants } from './ui/button'

const props = withDefaults(defineProps<{
  showButton?: boolean
  bookedDateRanges: Array<{ start: Date, end: Date }> }>(),
{ showButton: true })
</script>

<template>
  <div class="flex w-fit flex-wrap items-center justify-center gap-4">
    <BookingCalendarButton :booked-date-ranges="props.bookedDateRanges" />
    <BookingGuestsCountButton />
    <NuxtLink
      v-if="props.showButton"
      to="/find"
      :class="buttonVariants()"
    >
      Найти
    </NuxtLink>
  </div>
</template>
