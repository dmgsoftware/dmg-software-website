<script setup lang="ts">
import { RouterView } from 'vue-router'
import TransitionComponent from '@/components/TransitionComponent.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import FootComponent from '@/components/FootComponent.vue'
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <router-view v-slot="{ Component }">
      <TransitionComponent>
        <component :is="Component" />
      </TransitionComponent>
    </router-view>
    <FootComponent />
  </div>
</template>

<style scoped></style>
