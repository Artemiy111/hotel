<script setup lang="ts">
import type { Room, RoomImage } from '~/types'

const props = defineProps<{ room: Room }>()
</script>

<template>
  <UGalleria
    :value="props.room.images.all"
    :id="'u-galleria'"
    :pt-options="{ mergeProps: true }"
    :pt="{
      root: 'rounded-xl overflow-clip',
      content: '',
      itemWrapper: 'relative flex w-full  flex-col items-center',
      itemContainer: 'relative w-full',
      item: 'flex aspect-video justify-center',
      previousItemButton:
        'color-white translate-y--50% hover:color-primary-300 active:color-primary-500 absolute top-50% flex aspect-square backdrop-blur-sm w-12 justify-center rounded-full items-center backdrop-brightness-75 left-2 cursor-pointer',
      nextItemButton:
        'color-white translate-y--50% hover:color-primary-300 active:color-primary-500 absolute top-50% flex aspect-square backdrop-blur-sm w-12 justify-center rounded-full items-center backdrop-brightness-75 right-2 cursor-pointer',
      indicators:
        'absolute p-4 flex bottom-0 w-max justify-center gap-4 backdrop-blur-sm backdrop-brightness-75 rounded-t-xl',
      indicator: '[&[data-p-highlight=true]]:bg-primary-500 bg-white cursor-pointer rounded-sm',
    }"
    :change-item-on-indicator-hover="true"
    :show-thumbnails="false"
    show-indicators
    show-item-navigators
    circular
    auto-play
  >
    <template #item="{ item: image }: { item: RoomImage }">
      <NuxtImg
        :src="`/images/rooms/${props.room.id}/${image.id}.jpg`"
        :key="image.id"
        class="w-full object-cover"
      />
    </template>
    <template #previousthumbnailicon></template>
    <template #indicator="indicator">
      <div class="w-15 flex h-2 flex-col"></div>
    </template>
    <template #previousitemicon>
      <div class="i-mingcute:arrow-left-line text-3xl"></div>
    </template>
    <template #nextitemicon>
      <div class="i-mingcute:arrow-right-line text-3xl"></div>
    </template>
  </UGalleria>
</template>
