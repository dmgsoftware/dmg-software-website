<script setup lang="ts">
import { determineContrast } from '@/ts/ThemeColorHelper'

const props = defineProps(['thisColor', 'parentColor', 'position'])
</script>

<template>
  <span :style="{ color: thisColor }">
    <span class="color-text">Color {{ props.position }}</span>
    <span class="contrast">
      {{ determineContrast(props.thisColor, props.parentColor) }}
    </span>
  </span>
</template>

<style scoped></style>
