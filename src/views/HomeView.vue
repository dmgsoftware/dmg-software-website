<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import FootComponent from '@/components/FootComponent.vue'
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <main class="flex-grow px-3 mx-auto my-2">
      <HomeComponent />
    </main>
    <FootComponent />
  </div>
</template>
