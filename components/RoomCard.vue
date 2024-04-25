<script setup lang="ts">
import type { Room } from '~/types'
import { Button } from '~/components/ui/button'

const props = defineProps<{ room: Room }>()
</script>

<template>
  <div
    class="w-full flex flex-col overflow-hidden border-2 border-surface-200 rounded-xl"
  >
    <NuxtImg
      :src="`/images/rooms/${room.id}/${room.images.preview.id}.jpg`"
      class="aspect-video w-full"
    />
    <div class="flex flex-col p-4">
      <h6 class="text-2xl font-bold">
        {{ props.room.title }}
      </h6>
      <span class="mt-3"> {{ room.price }}р ночь</span>
      <Button class="mt-3 w-max" variant="secondary" size="sm" label="" outlined>
        Подробнее
      </Button>
    </div>
  </div>
</template>
