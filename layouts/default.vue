<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
import TheMain from '~/components/TheMain.vue'
</script>

<template>
  <div class="">
    <TheHeader />
    <TheMain> <slot></slot> </TheMain>
  </div>
</template>
