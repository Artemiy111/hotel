<script setup lang="ts">
const props = defineProps<{
  min: number
  max: number
  step: number
}>()

const range = defineModel<[number, number]>('modelValue', {
  required: true,
})
const startId = `start-${useId()}`
const endId = `end-${useId()}`
</script>

<template>
  <div class="">
    <div class="grid grid-cols-2">
      <Input :id="startId" v-model="range[0]" type="number" :step="props.step" :min="props.min" :max="range[1]" />
      <Input :id="endId" v-model="range[1]" type="number" :step="props.step" :min="range[0]" :max="props.max" />
    </div>
    <Slider v-model="range" :min="props.min" :max="props.max" :step="props.step" />
  </div>
</template>
