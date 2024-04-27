<script setup lang="ts">
import NavigationMenuIndicator from '../ui/navigation-menu/NavigationMenuIndicator.vue'
import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu'
import { cn } from '~/lib/utils'

const route = useRoute()
const isMainPage = computed(() => route.fullPath === '/')

const routes = [
  {
    title: 'Главная',
    link: '/',
  },
  { title: 'Номера', link: '/find' },
]
</script>

<template>
  <header
    class="z-50 w-full flex justify-between items-center gap-2 px-4 py-2 "
    :class="[isMainPage ? 'fixed left-0 top-0 backdrop-blur-lg backdrop-brightness-75 text-white' : 'mb-8 border-b-2 border-secondary']"
  >
    <NuxtLink to="/">
      <span class="font-bold">Отель Ватриго</span>
    </NuxtLink>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem
          v-for="routeItem in routes"
          :key="routeItem.link"
        >
          <NavigationMenuLink
            as-child
            :class="cn(navigationMenuTriggerStyle(), 'bg-transparent',
                       routeItem.link === route.path && 'font-bold',
                       isMainPage && 'hover:bg-white/10 hover:text-white focus:bg-white/20 focus:text-white')"
          >
            <NuxtLink :to="routeItem.link">
              {{ routeItem.title }}
            </NuxtLink>
          </NavigationMenuLink>
          <NavigationMenuIndicator />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="flex gap-4">
      <a
        class="flex items-center gap-2"
        href="/"
      >
        <Icon
          name="mingcute:telegram-line"
          class="text-2xl"
        />
      </a>
      <a
        class="flex items-center gap-2"
        href="/"
      >
        <Icon
          name="mingcute:whatsapp-line"
          class="text-2xl"
        />
      </a>
      <NuxtLink
        href="tel:+79999999999"
        class="flex items-center gap-2"
      >
        <span>+7 999 999 99 99</span>
      </NuxtLink>
    </div>
  </header>
</template>
