<script setup lang="ts">
import BookingCalendarButton from './BookingCalendarButton.vue'
import BookingGuestsCountButton from './BookingGuestsCountButton.vue'
import { buttonVariants } from './ui/button'
import { useBookingStore } from '~/store/booking'

const props = withDefaults(defineProps<{ showButton?: boolean }>(), { showButton: true })
</script>

<template>
  <div class="flex gap-4">
    <BookingCalendarButton />
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
