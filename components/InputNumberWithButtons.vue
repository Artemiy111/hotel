<script setup lang='ts'>
import { Minus, Plus } from 'lucide-vue-next'

const props = defineProps<{
  number: number
  canIncrement: boolean
  canDecrement: boolean
}>()

const emit = defineEmits<{
  increment: []
  decrement: []
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      class="p-1 h-fit rounded-full"
      variant="default"
      :disabled="!props.canDecrement"
      @click="emit('decrement')"
    >
      <Minus :size="16" />
    </Button>
    <span class="w-6 text-center">{{ props.number }}</span>

    <Button
      class="p-1 h-fit rounded-full"
      variant="default"
      :disabled="!props.canIncrement"
      @click="emit('increment')"
    >
      <Plus :size="16" />
    </Button>
  </div>
</template>
