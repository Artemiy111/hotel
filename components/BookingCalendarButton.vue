<script setup lang="ts">
import type { HTMLAttributes, Ref } from 'vue'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type DateRange, RangeCalendarRoot } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const df = new DateFormatter('ru-RU', {
  dateStyle: 'medium',
})
const date = new Date()
const value = ref({
  start: new CalendarDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  end: new CalendarDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
}) as Ref<DateRange>
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
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="value" locale="ru-RU" initial-focus :number-of-months="2" @update:start-value="(startDate) => value.start = startDate" />
    </PopoverContent>
  </Popover>
</template>