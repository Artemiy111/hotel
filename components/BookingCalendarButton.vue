<script setup lang="ts">
import type { HTMLAttributes, Ref } from 'vue'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  startOfMonth,
  endOfMonth,
  type DateValue,
  today,
} from '@internationalized/date'
import { isWithinInterval } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type DateRange } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '~/lib/utils'
import { useBookingStore } from '~/store/booking'

const props = defineProps<{
  class?: HTMLAttributes['class']
  bookedDateRanges: Array<{ start: Date, end: Date }>
}>()

const bookingStore = useBookingStore()
const timeZone = bookingStore.timeZone

const df = new DateFormatter('ru-RU', {
  dateStyle: 'medium',
})

const todayDateValue = today(timeZone)
const value = ref({
  start: todayDateValue,
  end: todayDateValue,
}) as Ref<DateRange>

watch(() => value.value, (value) => {
  bookingStore.setDates(value.start?.toDate(timeZone) || null, value.end?.toDate(timeZone) || null)
}, { deep: true, immediate: true })

const start = todayDateValue
const end = todayDateValue.add({ years: 1 })
function isDateDisabled(dateValue: DateValue) {
  if (start.compare(dateValue) <= 0 && end.compare(dateValue) >= 0) return false
  return true
}

function isDateUnavailable(dateValue: DateValue) {
  const date = dateValue.toDate(timeZone)
  for (const range of props.bookedDateRanges) {
    console.log(range)
    if (isWithinInterval(date, range)) {
      return true
    }
  }
  return false
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !value && 'text-muted-foreground', props.class,
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(timeZone)) }} - {{ df.format(value.end.toDate(timeZone)) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(timeZone)) }}
          </template>
        </template>
        <template v-else>
          Выберите даты пребывания
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        locale="ru-RU"
        initial-focus
        :number-of-months="2"
        :is-date-unavailable="isDateUnavailable"
        :is-date-disabled="isDateDisabled"
        @update:start-value="(startDate) => {
          console.log(startDate?.toDate(timeZone), 'start')
          value.start = startDate
        }"
      />
    </PopoverContent>
  </Popover>
</template>
