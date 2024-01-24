<script setup lang="ts">
// eslint-disable vue/valid-v-model
import {
  type Interval,
  addDays,
  addYears,
  areIntervalsOverlapping,
  eachDayOfInterval,
  format,
  getDate,
  interval,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
} from 'date-fns'

import { useBookingStore } from '~/store/useBookingStore'

const props = withDefaults(defineProps<{
  intervalType: 'start' | 'end'
  inputIdPostfix?: string
}>(), {
  inputIdPostfix: '',
})

interface UCalendarDate {
  day: number
  month: number // month index
  year: number
  selectable: boolean
  otherMonth?: boolean
}

type UCalendarRangeInterval = [Date, Date | null] | null

const bookingStore = useBookingStore()

const now = new Date()
const startToday = startOfDay(now)
const disabledIntervals: Interval[] = [
  { start: addDays(startToday, 4), end: addDays(startToday, 4) },
  { start: addDays(startToday, 25), end: addDays(startToday, 30) },
]
const disabledDates = disabledIntervals.map(interval => eachDayOfInterval(interval)).flat()

const startMinDate = startToday
const startMaxDate = addYears(startToday, 1)
const startAndEndBooking = computed({
  get() {
    return (bookingStore.value.checkIn ? [bookingStore.value.checkIn, bookingStore.value.checkOut] : null) satisfies UCalendarRangeInterval
  },
  set(newInterval: UCalendarRangeInterval) {
    if (!newInterval) {
      bookingStore.value.checkIn = null
      bookingStore.value.checkOut = null
      return
    }

    if (!newInterval[1]) {
      bookingStore.value.checkIn = newInterval[0]
      bookingStore.value.checkOut = null
      return
    }

    if (newInterval[1] && isEqual(newInterval[0], newInterval[1])) {
      bookingStore.value.checkIn = newInterval[0]
      bookingStore.value.checkOut = null
      return
    }

    const normalizedInterlal = interval(newInterval[0], newInterval[1])
    const shortenedInterfal = shortenToDisabledInterval(normalizedInterlal)
    bookingStore.value.checkIn = shortenedInterfal.start as Date
    bookingStore.value.checkOut = shortenedInterfal.end as Date
  },
})

function shortenToDisabledInterval(interval: Interval): Interval {
  const shortenedInterfal = interval
  for (const disabledInterval of disabledIntervals) {
    if (areIntervalsOverlapping(shortenedInterfal, disabledInterval))
      shortenedInterfal.end = disabledInterval.start
  }
  return shortenedInterfal
}

const inputId = computed(() => `u-calendar-input-${props.intervalType}${props.inputIdPostfix}`)
const inputRef = ref<HTMLInputElement | null>(null)
onMounted(() => {
  inputRef.value = document.getElementById(inputId.value) as HTMLInputElement
  updateUcalendarInputText()
})
onUpdated(() => {
  updateUcalendarInputText()
})
watch(bookingStore, async () => {
  updateUcalendarInputText()
}, { deep: true, immediate: true, flush: 'post' })
function updateUcalendarInputText() {
  if (!inputRef.value)
    return

  switch (props.intervalType) {
    case 'start' : {
      inputRef.value.value = formattedDate(bookingStore.value.checkIn)
      break
    }
    case 'end' : {
      inputRef.value.value = formattedDate(bookingStore.value.checkOut)
      break
    }
    default: throw new Error('No such prop.intervalType')
  }
}

function formattedDate(date: Date | null) {
  return date ? format(date, 'dd/MM/yyyy') : ''
}

function fromCalendarDateToDate(date: UCalendarDate): Date {
  const newDate = new Date(date.year, date.month, date.day)
  return newDate
}

function isBeforeMinDate(date: Date): boolean {
  return isBefore(date, startMinDate)
}

function isAfterMaxDate(date: Date) {
  return isAfter(date, startMaxDate)
}

function isExplisitlyDisabledCalendarDate(calendarDate: UCalendarDate): boolean {
  const date = fromCalendarDateToDate(calendarDate)

  if (calendarDate.otherMonth || isBeforeMinDate(date) || isAfterMaxDate(date))
    return false
  return !calendarDate.selectable
}
</script>

<template>
  <UCalendar
    v-model="(startAndEndBooking as unknown as Date[] | null)"
    :input-id="inputId"
    :placeholder="props.intervalType === 'start' ? 'Дата заезда' : 'Дата отъезда'"

    selection-mode="range"
    view="date"
    :disabled-dates="disabledDates"
    :min-date="startMinDate"
    :max-date="startMaxDate"
    :select-other-months="false"
    :number-of-months="2"
    :manual-input="false"
    :show-button-bar="true"
    :pt="{
      dayLabel: ({ context: e }) => ({
        class: [{ 'bg-red-200': isExplisitlyDisabledCalendarDate(e.date as unknown as UCalendarDate) }],
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
      <span v-else>{{ date.day }}</span>
    </template>
  </UCalendar>
</template>
