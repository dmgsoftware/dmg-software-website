<script setup lang="ts"></script>

<template>
  <Transition mode="out-in" :duration="220"><slot /></Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
