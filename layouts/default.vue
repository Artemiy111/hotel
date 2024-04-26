<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheMain from '~/components/layout/TheMain.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<template>
  <div class="">
    <TheHeader />
    <TheMain> <slot /> </TheMain>
    <TheFooter />
  </div>
</template>
