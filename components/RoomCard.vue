<script setup lang="ts">
import type { Room } from '~/types'

const props = defineProps<{ room: Room }>()
const emit = defineEmits<{
  (e: 'click:card-body'): void
}>()
</script>

<template>
  <div
    class="w-full flex flex-col overflow-hidden border-2 border-surface-200 rounded-xl"
  >
    <NuxtImg
      :src="`/images/rooms/${room.id}/${room.images.preview.id}.jpg`"
      class="aspect-video w-full"
    />
    <div class="flex flex-col cursor-pointer p-4" @click="emit('click:card-body')">
      <h6 class="text-2xl font-bold">
        {{ props.room.title }}
      </h6>
      <span class="mt-3"> {{ room.price }}р ночь</span>
      <UButton class="mt-3 w-max" size="small" label="" outlined>
        Подробнее
      </UButton>
    </div>
  </div>
</template>
