<script setup lang="ts">
const props = defineProps<{

}>()
</script>

<template>
  <UCalendar
    v-model="(startAndEndBooking as unknown as Date[] | null)"
    :input-props="{
      value: formattedCheckIn,
    }"
    placeholder="Дата заезда"
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
      <span v-else>{{ date.day }}</span>
    </template>
  </UCalendar>
</template>
