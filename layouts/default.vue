<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheMain from '~/components/layout/TheMain.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<template>
  <div class="flex gap-16 flex-col">
    <div class="min-h-svh flex flex-col">
      <TheHeader />
      <TheMain class="flex-grow">
        <slot />
      </TheMain>
    </div>
    <TheFooter />
  </div>
</template>
