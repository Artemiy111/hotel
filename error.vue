<script setup lang="ts">
import type { NuxtError } from '#app'
import { buttonVariants } from '~/components/ui/button'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <NuxtLayout name="default">
    <div class="m-auto h-[70vh] flex gap-4 flex-col justify-center items-center container">
      <h1 class="font-bold leading-none text-[100px]">
        {{ props.error.statusCode }}
      </h1>
      <span>{{ props.error.message }}</span>
      <NuxtLink
        :class="buttonVariants({ variant: 'default' })"
        to="/"
      >
        На главную
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
