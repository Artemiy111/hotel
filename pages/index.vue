<script setup lang="ts">
import type { UOverlayPanel } from '#build/components'

const checkIn = ref<Date | null>(null)
const checkOut = ref<Date | null>(null)

const adults = ref(1)
const children = ref(0)

const refOverlay = ref<InstanceType<typeof UOverlayPanel> | null>(null)

const openOverlay = (event: Event) => {
  refOverlay.value?.show(event)
}

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const getDate = (date: { day: number; month: number; year: number }): Date => {
  const newDate = new Date(date.year, date.month, date.day)
  return newDate
}

const isDateBeforeToday = (today: Date, date: Date) => {
  const delta = today.getTime() - date.getTime()
  const ONE_DAY = 1000 * 60 * 60 * 24
  return delta / ONE_DAY > 1
}
</script>

<template>
  <section class="h-100dvh relative flex flex-col items-center justify-center gap-10">
    <NuxtImg src="/images/hotel-screen.jpg" class="z--1 absolute h-full w-full" />
    <h1 class="text-4xl font-bold text-white">Бронируйте номера в нашем гостевом доме</h1>
    <UInputGroup>
      <UInputNumber show-buttons />
      <!-- <UInputGroupAddon>dfdf</UInputGroupAddon> -->
    </UInputGroup>
    <form
      class="flex gap-2 rounded-3xl p-10 shadow-lg backdrop-blur-sm backdrop-brightness-75"
      @submit.prevent
    >
      <UCalendar
        placeholder="Дата заезда"
        show-icon
        icon-display="input"
        :min-date="today"
        date-format="dd/mm/yy"
        v-model="checkIn"
        :pt="{
          dayLabel: ({ context: e }) => ({
            // class: [{ 'bg-red-100': !e }],
          }),
        }"
        :pt-options="{ mergeProps: true }"
      >
        <template #date="dateSlot">
          <span :class="[isDateBeforeToday(today, getDate(dateSlot.date)) ? 'line-through' : '']">{{
            dateSlot.date.day
          }}</span></template
        >
      </UCalendar>
      <UCalendar
        placeholder="Дата выезда"
        show-icon
        icon-display="input"
        :min-date="today"
        date-format="dd/mm/yy"
        v-model="checkOut"
      />
      <UButton
        label=""
        @click="openOverlay"
        class=""
        :pt="{ root: 'bg-white text-surface-800 hover:bg-white' }"
        :pt-options="{ mergeProps: true }"
        >Взрослых: {{ adults }}, детей: {{ children }}</UButton
      >
      <UOverlayPanel ref="refOverlay">
        <div class="flex flex-col gap-2">
          <UInputGroup class="">
            <UInputGroupAddon class="w-30">Взрослых</UInputGroupAddon>
            <UInputNumber
              class="[&_input]:rounded-l-0"
              :min="1"
              :max="10"
              v-model="adults"
              show-buttons
            />
          </UInputGroup>
          <UInputGroup>
            <UInputGroupAddon class="w-30">Детей</UInputGroupAddon>
            <UInputNumber
              class="[&_input]:rounded-l-0"
              :min="0"
              :max="10"
              v-model="children"
              show-buttons
            />
          </UInputGroup>
        </div>
      </UOverlayPanel>
      <UButton type="submit" label="Найти" />
    </form>
  </section>
  <section id="rooms" class="container m-auto mt-20 flex flex-col gap-8">
    <h2 class="text-4xl font-bold">Номера</h2>
    <div class="grid grid-cols-3 gap-5">
      <div v-for="n in 3" class="w-full overflow-hidden rounded-xl border-2 border-slate-200">
        <NuxtImg src="/images/hotel-screen.jpg" class="aspect-video w-full" />
        <UGalleria> </UGalleria>
        <div class="p-4">
          <h6 class="text-2xl font-bold">Делюкс</h6>
          <span class="mt-3"> 1500 р/ночь</span>
        </div>
      </div>
    </div>
  </section>
  <section class="container m-auto mt-20 flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h3 class="text-4xl font-bold">Расположение</h3>
      <span>г. Москва, ул Запоздалая, дом 34</span>
    </div>
    <div class="w-full">
      <NuxtImg src="/images/map.jpg" class="max-h-70dvh mb-10 w-full rounded-xl object-cover" />
    </div>
  </section>
</template>
