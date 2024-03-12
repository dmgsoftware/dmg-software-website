<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuComponent from '@/components/MenuComponent.vue'
import FootComponent from '@/components/FootComponent.vue'
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <RouterView />
    <FootComponent />
  </div>
</template>

<style scoped></style>
