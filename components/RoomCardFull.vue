<script setup lang="ts">
import type { Room } from '~/types'
import RoomGalleria from '~/components/RoomGalleria.vue'

const props = withDefaults(defineProps<{ room: Room, showButton?: boolean }>(), {
  showButton: true,
})
</script>

<template>
  <div class="grid grid-cols-[2fr_1fr] gap-8 overflow-clip">
    <RoomGalleria :room="props.room" />
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h3 class="text-4xl font-bold">
          {{ props.room.title }}
        </h3>
        <p class="text-2xl text-primary-500 font-bold">
          от {{ props.room.price }}р ночь
        </p>
      </div>
      <ul class="flex flex-col gap-2">
        <li>{{ props.room.conditions.square }} м<sup>2</sup></li>
        <li v-for="condition in props.room.conditions.other" :key="condition">
          {{ condition }}
        </li>
      </ul>
      <NuxtLink v-if="showButton" :to="`/rooms/${props.room.id}`">
        <UButton class="w-fit" label="Забронировать" />
      </NuxtLink>
    </div>
  </div>
</template>
