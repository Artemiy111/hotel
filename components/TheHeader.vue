<script setup lang="ts">
const route = useRoute()

const isMainPage = computed(() => route.fullPath === '/')

const routes = [
  {
    title: 'Главная',
    link: '/',
  },
  { title: 'Номера', link: '/rooms/1' },
]
</script>

<template>
  <header
    class="z-100 flex w-full justify-between gap-2 p-4 text-white backdrop-blur-lg backdrop-brightness-75"
    :class="[isMainPage ? 'fixed left-0 top-0 ' : 'mb-8']"
  >
    <span class="font-bold">Отель Ватриго</span>

    <nav class="flex gap-5">
      <NuxtLink
        v-for="route in routes"
        :to="route.link"
        class="[&.router-link-exact-active]:font-bold"
        >{{ route.title }}</NuxtLink
      >
    </nav>

    <div class="flex gap-4">
      <NuxtLink class="flex items-center gap-2">
        <div class="i-mingcute:telegram-line text-2xl"></div>
      </NuxtLink>
      <NuxtLink class="flex items-center gap-2">
        <div class="i-mingcute:whatsapp-line text-2xl"></div>
      </NuxtLink>
      <NuxtLink href="tel:+79999999999" class="flex items-center gap-2">
        <!-- <div class="i-mingcute:phone-line text-xl"></div> -->
        <span>+7 999 999 99 99</span>
      </NuxtLink>
    </div>
  </header>
</template>
