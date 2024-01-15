<script setup lang="ts">
type Image = {
  id: string
  link: string
}

const images: Image[] = [
  {
    link: '/images/room-1/01.jpg',
    id: '1',
  },
  {
    id: '2',
    link: '/images/room-1/02.jpg',
  },
  {
    id: '3',
    link: '/images/room-1/03.jpg',
  },
  {
    id: '4',
    link: '/images/room-1/04.jpg',
  },
]
</script>

<template>
  <div class="flex overflow-clip rounded-xl border-2 border-surface-200">
    <UGalleria
      :value="images"
      :id="'u-galleria'"
      :pt-options="{ mergeProps: true }"
      :pt="{
        root: 'w-400px',
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
    >
      <template #item="{ item: image }: { item: Image }">
        <NuxtImg :src="image.link" :key="image.id" class="w-full object-cover" />
      </template>
      <template #previousthumbnailicon></template>
      <!-- <template #footer></template> -->
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
  </div>
</template>
