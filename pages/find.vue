<script setup lang="ts">
import { type BedType, type RoomOption, BED_TYPES, ROOM_OPTIONS } from '~/constants'
import BookingCalendarButton from '~/components/BookingCalendarButton.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import InputNumberRange from '~/components/InputNumberRange.vue'
import { useBookingStore } from '~/store/booking'
import BookingGuestsCountButton from '~/components/BookingGuestsCountButton.vue'

const bookingStore = useBookingStore()

const { data: rooms, error: _error } = await useFetch('/api/rooms')

const priceConstraints = ref<[number, number]>([1000, 10000])
const priceRange = ref<[number, number]>([1500, 3000])

const roomSquareConstraints = ref<[number, number]>([15, 40])
const roomSquareRange = ref<[number, number]>([roomSquareConstraints.value[0], roomSquareConstraints.value[1]])

const bedTypes = ref<BedType[]>([])

const BEDS_COUNT = ['does-not-matter', '1', '2', '3'] as const
type BeadsCount = typeof BEDS_COUNT[number]

const bedsCount = ref<BeadsCount>('does-not-matter')

const roomOptions = ref<RoomOption[]>([])

const filteredRooms = computed(() => {
})
</script>

<template>
  <div class="grid grid-cols-[300px_1fr] mx-auto gap-16 container">
    <aside class="flex flex-col gap-6">
      <BookingCalendarButton class="w-full" />
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
          <Label :for="`bed-type-${bedKey}`">{{ bed.title }}</Label>
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
            <Label :for="`beds-count-${countString}`">{{ countString === 'does-not-matter' ? 'Не важно' : countString }}</Label>
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
          <Label :for="`room-option-${optionKey}`">{{ option.title }}</Label>
        </div>
      </div>
    </aside>
    <section class="flex flex-col gap-8">
      <RoomCardFull
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        :button="{ show: true, isOutlined: true }"
      />
    </section>
  </div>
</template>
