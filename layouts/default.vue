<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
import TheMain from '~/components/TheMain.vue'
import TheFooter from '~/components/TheFooter.vue'
</script>

<template>
  <div class="">
    <TheHeader />
    <TheMain> <slot /> </TheMain>
    <TheFooter />
  </div>
</template>
