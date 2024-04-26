<script setup lang="ts">
import { Box, Users, BedDouble, BedSingle } from 'lucide-vue-next'
import type { Room } from '~/types'
import { ROOM_OPTIONS } from '~/constants'
import RoomGalleria from '~/components/RoomGalleria.vue'

const props = withDefaults(defineProps<{
  room: Room
  button?: {
    show?: boolean
    isOutlined?: boolean
  }
}>(), {
  button: () => ({
    show: true,
    isOutlined: false,
  }),
})
</script>

<template>
  <div class="grid grid-cols-[2fr_1fr] gap-8 overflow-clip">
    <RoomGalleria :room="props.room" />
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h3 class="text-3xl font-bold">
          {{ props.room.title }}
        </h3>
        <span class="text-xl text-slate-500 font-bold">
          от {{ props.room.price }}р ночь
        </span>
      </div>
      <div class="grid gap-4 grid-cols-[max-content,max-content]">
        <div class="flex gap-2">
          <Box />
          <span>{{ props.room.conditions.square }} м<sup>2</sup></span>
        </div>
        <div class="flex gap-2">
          <Users />
          <span>{{ props.room.conditions.maxPersons }}</span>
        </div>
        <div
          v-if="props.room.conditions.beds.double"
          class="flex gap-2"
        >
          <BedDouble />
          <span>{{ props.room.conditions.beds.double }}</span>
        </div>
        <div
          v-if="props.room.conditions.beds.single"
          class="flex gap-2"
        >
          <BedSingle />
          <span>{{ props.room.conditions.beds.single }}</span>
        </div>
      </div>

      <ul class="flex flex-col gap-2">
        <li
          v-for="option in props.room.conditions.options"
          :key="option"
        >
          {{ ROOM_OPTIONS[option].title }}
        </li>
      </ul>
      <NuxtLink
        v-if="props.button.show"
        :to="`/rooms/${props.room.id}`"
      >
        <Button
          class="w-fit"
          :variant="props.button.isOutlined ? 'outline' : 'default'"
        >
          Забронировать
        </Button>
      </NuxtLink>
    </section>
  </div>
</template>
