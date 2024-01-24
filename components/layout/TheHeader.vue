<script setup lang="ts">
const route = useRoute()

const isMainPage = computed(() => route.fullPath === '/')

const routes = [
  {
    title: 'Главная',
    link: '/',
  },
  { title: 'Номера', link: '/rooms/find' },
]
</script>

<template>
  <header
    class="z-100 w-full flex justify-between gap-2 p-4"
    :class="[isMainPage ? 'fixed left-0 top-0 backdrop-blur-lg backdrop-brightness-75 text-white' : 'mb-8 border-b-2 border-surface-200']"
  >
    <NuxtLink to="/">
      <span class="font-bold">Отель Ватриго</span>
    </NuxtLink>

    <nav class="flex gap-5">
      <NuxtLink
        v-for="routeItem in routes"
        :key="routeItem.link"
        :to="routeItem.link"
        class="[&.router-link-exact-active]:font-bold"
      >
        {{ routeItem.title }}
      </NuxtLink>
    </nav>

    <div class="flex gap-4">
      <a class="flex items-center gap-2" href="/">
        <div class="i-mingcute:telegram-line text-2xl" />
      </a>
      <a class="flex items-center gap-2" href="/">
        <div class="i-mingcute:whatsapp-line text-2xl" />
      </a>
      <NuxtLink href="tel:+79999999999" class="flex items-center gap-2">
        <!-- <div class="i-mingcute:phone-line text-xl"></div> -->
        <span>+7 999 999 99 99</span>
      </NuxtLink>
    </div>
  </header>
</template>
