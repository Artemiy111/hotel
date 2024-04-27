<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>

<style>
body {
  scrollbar-gutter: stable;
}

* {
  @apply text-sm
}

@screen xs {
  * {
    @apply text-base
  }
}
</style>
