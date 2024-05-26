<script setup lang="ts">
import { Frown } from 'lucide-vue-next'
import { type BedType, type RoomOption, BED_TYPES, ROOM_OPTIONS } from '~/constants'
import BookingCalendarButton from '~/components/BookingCalendarButton.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import InputNumberRange from '~/components/InputNumberRange.vue'
import { useBookingStore } from '~/store/booking'
import BookingGuestsCountButton from '~/components/BookingGuestsCountButton.vue'
import type { RoomDto } from '~/types'

const bookingStore = useBookingStore()
const { $api } = useNuxtApp()
const { data: rooms, error: _error } = useAsyncData(async () => await $api<RoomDto[]>('/rooms'), {
  transform: rooms => rooms.map((room) => {
    return {
      ...room,
      bookedDateRanges: room.bookedDateRanges.map(r =>
        ({
          roomId: r.roomId,
          start: new Date(r.start),
          end: new Date(r.end) }
        )),
    } satisfies RoomDto
  }),
})

watch(rooms, () => {
  if (!rooms.value) return
  const minPrice = Math.min(...rooms.value.map(r => r.price))
  const maxPrice = Math.max(...rooms.value.map(r => r.price))

  const minSquare = Math.min(...rooms.value.map(r => r.conditions.square))
  const maxSquare = Math.max(...rooms.value.map(r => r.conditions.square))

  priceConstraints.value = [minPrice, maxPrice]
  roomSquareConstraints.value = [minSquare, maxSquare]

  priceRange.value = [priceConstraints.value[0], priceConstraints.value[1]]
  roomSquareRange.value = [roomSquareConstraints.value[0], roomSquareConstraints.value[1]]
})

const bookedDateRanges = computed(() => rooms.value?.flatMap(r => r.bookedDateRanges) || [])

const initial = {
  priceConstraints: [1000, 10000] as [number, number],
  roomSquareConstraints: [15, 40] as [number, number],
}
const priceConstraints = ref<[number, number]>(initial.priceConstraints)
const priceRange = ref<[number, number]>(initial.priceConstraints)

const roomSquareConstraints = ref<[number, number]>(initial.roomSquareConstraints)
const roomSquareRange = ref<[number, number]>(initial.roomSquareConstraints)

const bedTypes = ref<BedType[]>([])

const BEDS_COUNT = ['does-not-matter', '1', '2', '3'] as const
type BeadsCount = typeof BEDS_COUNT[number]

const bedsCount = ref<BeadsCount>('does-not-matter')

const roomOptions = ref<RoomOption[]>([])

const resetFilters = () => {
  bookingStore.resetDates()
  bookingStore.resetGuests()
  priceRange.value = initial.priceConstraints
  roomSquareRange.value = initial.roomSquareConstraints
  bedTypes.value = []
  bedsCount.value = 'does-not-matter'
  roomOptions.value = []
}

const filteredRooms = computed(() => {
  if (!rooms.value) return null
  return rooms.value.filter((room) => {
    const guestsCountFilter = bookingStore.countGuests <= room.conditions.maxGuests
    const priceFilter = priceRange.value[0] <= room.price && room.price <= priceRange.value[1]
    const squareFilter = roomSquareRange.value[0] <= room.conditions.square && room.conditions.square <= roomSquareRange.value[1]

    const bedsCountFilter = bedsCount.value === 'does-not-matter'
      || Number(bedsCount.value) <= room.conditions.beds.double + room.conditions.beds.single

    const bedsTypesFilter = bedTypes.value.filter((type) => {
      if (type === 'double') return room.conditions.beds.double > 0
      else if (type === 'separate') return room.conditions.beds.single > 0
      return true
    }).length === bedTypes.value.length

    const optionsFilter = roomOptions.value.filter(
      option => room.conditions.options[option],
    ).length
    === roomOptions.value.length

    return guestsCountFilter && priceFilter && squareFilter && bedsTypesFilter && bedsCountFilter && optionsFilter
  })
})
</script>

<template>
  <div class="grid grid-cols-[300px_1fr] mx-auto gap-16 container">
    <aside class="flex flex-col gap-6">
      <BookingCalendarButton
        :booked-date-ranges="bookedDateRanges"
        class="w-full"
      />
      <BookingGuestsCountButton />

      <div class="flex flex-col gap-2">
        <span class="text-base">Цена за ночь</span>
        <InputNumberRange
          v-model="priceRange"
          :step="100"
          :min="priceConstraints[0]"
          :max="priceConstraints[1]"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span for="square">Площадь <span>м<sup>2</sup></span></span>
        <InputNumberRange
          v-model="roomSquareRange"
          :step="1"
          :min="roomSquareConstraints[0]"
          :max="roomSquareConstraints[1]"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span>Типы кроватей</span>
        <div
          v-for="(bed, bedKey) in BED_TYPES"
          :key="bedKey"
          class="flex gap-2 items-center"
        >
          <Checkbox
            :id="`bed-type-${bedKey}`"
            name="bed-types"
            :checked="bedTypes.includes(bedKey)"
            @update:checked="(checked) => {
              if (checked) bedTypes.push(bedKey)
              else bedTypes = bedTypes.filter(b => b !== bedKey)
            } "
          />
          <Label
            :for="`bed-type-${bedKey}`"
            class="cursor-pointer"
          >{{ bed.title }}</Label>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span>Количество кроватей</span>
        <RadioGroup v-model="bedsCount">
          <div
            v-for="countString in BEDS_COUNT"
            :key="countString"
            class="flex gap-2"
          >
            <RadioGroupItem
              :id="`beds-count-${countString}`"
              :value="countString"
            />
            <Label
              :for="`beds-count-${countString}`"
              class="cursor-pointer"
            >{{ countString === 'does-not-matter' ? 'Не важно' : countString }}  </Label>
          </div>
        </RadioGroup>
      </div>

      <div class="flex flex-col gap-2">
        <span>Опции</span>
        <div
          v-for="(option, optionKey) in ROOM_OPTIONS"
          :key="optionKey"
          class="flex gap-2 items-center"
        >
          <Checkbox
            :id="`room-option-${optionKey}`"
            name="room-options"
            :checked="roomOptions.includes(optionKey)"
            @update:checked="(checked) => {
              if (checked) roomOptions.push(optionKey)
              else roomOptions = roomOptions.filter(b => b !== optionKey)
            } "
          />
          <Label
            :for="`room-option-${optionKey}`"
            class="cursor-pointer"
          >{{ option.title }}</Label>
        </div>
      </div>

      <Button @click="resetFilters">
        Сбросить фильтры
      </Button>
    </aside>
    <section class="flex flex-col gap-8">
      <template v-if="filteredRooms?.length">
        <RoomCardFull
          v-for="room in filteredRooms"
          :key="room.id"
          :room="room"
          :button="{ show: true, isOutlined: true }"
        />
      </template>
      <template v-else>
        <div class="w-full flex flex-col gap-4 justify-center items-center px-4 h-[40dvh] bg-primary-foreground">
          <Frown
            :size="50"
            :stroke-width="1.5"
          />
          <span class="text-base"> Нет подходящих номеров</span>
        </div>
      </template>
    </section>
  </div>
</template>
