<script setup lang="ts">
import BookingCalendar from '~/components/BookingCalendar.vue'
import { UOverlayPanel } from '#components'
import { useBookingStore } from '~/store/useBookingStore'

const props = withDefaults(defineProps<{ showButton?: boolean }>(), { showButton: true })

const bookingStore = useBookingStore()

const adults = ref(1)
const children = ref(0)

const refOverlay = ref<InstanceType<typeof UOverlayPanel> | null>(null)

function openOverlay(event: Event) {
  refOverlay.value?.show(event)
}
</script>

<template>
  <!-- eslint-disable vue/valid-v-model -->

  <form class="flex gap-2" @submit.prevent>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>
      <BookingCalendar interval-type="start" />
    </UInputGroup>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>

      <!-- <UCalendar
        v-model="bookingStore.checkOut"
        placeholder="Дата выезда"
        date-format="dd/mm/yy"
        :min-date="startOfToday"
        :pt="{
          // input: 'rounded-l-0',
        }"
        :pt-options="{ mergeProps: true }"
      /> -->
      <BookingCalendar interval-type="end" />
    </UInputGroup>
    <UButton
      label=""
      class=""
      :pt="{ root: 'bg-white text-surface-800 hover:bg-white' }"
      :pt-options="{ mergeProps: true }"
      @click="openOverlay"
    >
      Взрослых: {{ adults }}, детей: {{ children }}
    </UButton>
    <UOverlayPanel ref="refOverlay">
      <div class="flex flex-col gap-2">
        <UInputGroup class="">
          <UInputGroupAddon class="w-30">
            Взрослых
          </UInputGroupAddon>
          <UInputNumber
            v-model="adults"
            class="[&_input]:rounded-l-0"
            show-buttons
            :min="1"
            :max="10"
            increment-button-class="disabled"
          />
        </UInputGroup>
        <UInputGroup>
          <UInputGroupAddon class="w-30">
            Детей
          </UInputGroupAddon>
          <UInputNumber
            v-model="children"
            class="[&_input]:rounded-l-0"
            show-buttons
            :min="0"
            :max="10"
          />
        </UInputGroup>
      </div>
    </UOverlayPanel>
    <UButton v-if="props.showButton" type="submit" label="Найти" />
  </form>
</template>
