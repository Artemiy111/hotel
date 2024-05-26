<script setup lang="ts">
import type { CarouselApi } from './ui/carousel'
import type { RoomDto } from '~/types'

const props = defineProps<{ room: RoomDto }>()

const carouselApi = ref<CarouselApi | null>(null)
const currentSlide = ref(0)

watch(carouselApi, () => {
  if (!carouselApi.value)
    return

  carouselApi.value.on('select', (api) => {
    selectSlide(api.selectedScrollSnap())
  })
}, { once: true })

function selectSlide(index: number) {
  currentSlide.value = index
  if (carouselApi.value)
    carouselApi.value.scrollTo(index)
}
</script>

<template>
  <Carousel
    class="w-full h-fit"
    :opts="{
      loop: true,

    }"
    @init-api="carouselApi = $event"
  >
    <CarouselContent class="w-full">
      <CarouselItem
        v-for="img in props.room.images"
        :key="img.id"
        class="flex w-full p-0 mr-10 items-center justify-center"
      >
        <NuxtImg
          :src="img.url"
          format="avif,webp,png,jpg"
          class="aspect-video w-full object-cover"
        />
      </CarouselItem>
    </CarouselContent>
    <div class="absolute bottom-0 left-0 w-full">
      <div class="flex mx-auto gap-4 w-fit rounded-t-lg justify-center p-4 bg-black/30">
        <div
          v-for="n in props.room.images.length"
          :key="n"
          class="w-10 h-2  cursor-pointer rounded-full"
          :class="n - 1 === currentSlide ? 'bg-black' : 'bg-white'"
          @click="selectSlide(n - 1)"
        />
      </div>
    </div>
  </Carousel>
</template>
