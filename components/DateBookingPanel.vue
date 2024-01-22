<script setup lang="ts">
// eslint-disable-next-line ts/consistent-type-imports
import type { UOverlayPanel } from '#components'
import { useBookingStore } from '~/store/useBookingStore'

const props = withDefaults(defineProps<{ showButton?: boolean }>(), { showButton: true })

const bookingStore = useBookingStore()

const adults = ref(1)
const children = ref(0)

const refOverlay = ref<InstanceType<typeof UOverlayPanel> | null>(null)

function openOverlay(event: Event) {
  refOverlay.value?.show(event)
}

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

function getDate(date: { day: number, month: number, year: number }): Date {
  const newDate = new Date(date.year, date.month, date.day)
  return newDate
}

function isDateBeforeToday(today: Date, date: Date) {
  const delta = today.getTime() - date.getTime()
  const ONE_DAY = 1000 * 60 * 60 * 24
  return delta / ONE_DAY > 1
}
</script>

<template>
  <form class="flex gap-2" @submit.prevent>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>
      <UCalendar
        v-model="bookingStore.checkIn"
        placeholder="Дата заезда"
        :min-date="today"
        date-format="dd/mm/yy"
        :pt="{
          // input: 'rounded-l-0',
          // dayLabel: ({ context: e }) => ({
          // class: [{ 'bg-red-100': !e }],
          // }),
        }"
        :pt-options="{ mergeProps: true }"
      >
        <template #date="dateSlot">
          <span :class="[isDateBeforeToday(today, getDate(dateSlot.date)) ? 'line-through' : '']">{{
            dateSlot.date.day
          }}</span>
        </template>
      </UCalendar>
    </UInputGroup>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>

      <UCalendar
        v-model="bookingStore.checkOut"
        placeholder="Дата выезда"
        date-format="dd/mm/yy"
        :min-date="today"
        :pt="{
          // input: 'rounded-l-0',
        }"
        :pt-options="{ mergeProps: true }"
      />
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
