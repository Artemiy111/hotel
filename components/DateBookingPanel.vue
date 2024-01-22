<script setup lang="ts">
import {
  type Interval,
  addDays,
  addYears,
  areIntervalsOverlapping,
  eachDayOfInterval,
  format,
  getDate,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
} from 'date-fns'
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

const now = new Date()
const startOfToday = startOfDay(now)
const startOfTomorrow = addDays(startOfToday, 1)
const _startOfThisMonth = startOfMonth(now)

const disabledIntervals: Interval[] = [
  { start: addDays(startOfToday, 4), end: addDays(startOfToday, 4) },
  { start: addDays(startOfToday, 25), end: addDays(startOfToday, 30) },
]

const disabledDates = disabledIntervals.map(interval => eachDayOfInterval(interval)).flat()

// ([addDays(startOfToday, 4), addDays(startOfToday, 30)])

const startMinDate = startOfToday
const startMaxDate = addYears(startOfToday, 1)
const startAndEndBooking = ref< [Date, Date | null] | null >([startOfToday, startOfTomorrow])
watch(startAndEndBooking, () => {
  bookingStore.value.checkIn = startAndEndBooking.value?.[0] || null
  bookingStore.value.checkOut = startAndEndBooking.value?.[1] || null
})

interface CalendarDate {
  day: number
  month: number // month index
  year: number
  selectable: boolean
  otherMonth?: boolean
}

function fromCalendarDateToDate(date: CalendarDate): Date {
  const newDate = new Date(date.year, date.month, date.day)
  return newDate
}

function isBeforeMinDate(date: Date): boolean {
  return isBefore(date, startMinDate)
}

function isAfterMaxDate(date: Date) {
  return isAfter(date, startMaxDate)
}

function isExplisitlyDisabledCalendarDate(calendarDate: CalendarDate): boolean {
  const date = fromCalendarDateToDate(calendarDate)

  if (calendarDate.otherMonth || isBeforeMinDate(date) || isAfterMaxDate(date))
    return false
  return !calendarDate.selectable
}

const formattedCheckIn = computed(() => {
  return bookingStore.value.checkIn ? format(bookingStore.value.checkIn, 'dd/MM/yyyy') : null
})

const formattedCheckOut = computed(() => {
  return bookingStore.value.checkOut ? format(bookingStore.value.checkOut, 'dd/MM/yyyy') : null
})
</script>

<template>
  <!-- eslint-disable vue/valid-v-model -->

  <form class="flex gap-2" @submit.prevent>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>
      <UCalendar
        v-model="(startAndEndBooking as unknown as Date[] | null)"
        :input-props="{
          value: formattedCheckIn,
        }"
        placeholder="Дата заезда"
        selection-mode="range"
        view="date"
        date-format="dd/mm/yy"
        :disabled-dates="disabledDates"
        :min-date="startMinDate"
        :max-date="startMaxDate"
        :select-other-months="false"
        :number-of-months="2"
        :manual-input="false"
        :show-button-bar="true"
        :pt="{
          input: 'rounded-l-0',
          dayLabel: ({ context: e }) => ({
            class: [{ 'bg-red-200': isExplisitlyDisabledCalendarDate(e.date as unknown as CalendarDate) }],
          }),

        }"
        :pt-options="{ mergeProps: true }"
      >
        <template #date="{ date }">
          <span
            v-if="isExplisitlyDisabledCalendarDate(date)"
            v-tooltip="{ value: 'Уже забронированно', pt: { text: 'whitespace-nowrap w-max' } }"
            :data-pc-ripple="false"
            class="focus:unset pointer-events-auto bg-red-200"
          >
            {{ date.day }}

          </span>
          <span
            v-else
            :class="[
              isBeforeMinDate(fromCalendarDateToDate(date)) || isAfterMaxDate(fromCalendarDateToDate(date))
                ? 'line-through' : '',
            ]"
          >{{ date.day }}</span>
        </template>
      </UCalendar>
    </UInputGroup>
    <UInputGroup class="w-fit flex">
      <UInputGroupAddon><div class="i-mingcute:calendar-month-line" /></UInputGroupAddon>

      <UCalendar
        v-model="bookingStore.checkOut"
        placeholder="Дата выезда"
        date-format="dd/mm/yy"
        :min-date="startOfToday"
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
