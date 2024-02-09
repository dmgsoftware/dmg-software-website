<script setup lang="ts">
import MenuComponent from '@/components/MenuComponent.vue'
import FootComponent from '@/components/FootComponent.vue'
import ColorsComponent from '@/components/ThemeColorHelper/ColorsComponent.vue'
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <main class="flex-grow px-3 mx-auto my-2">
      <ColorsComponent />
      <!--      <div>-->
      <!--        <ul>-->
      <!--          <li>This is a very nice picker https://htmlcolorcodes.com/color-picker/</li>-->
      <!--          <li>Inspired by https://keyframes.app/colors/</li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </main>
    <FootComponent />
  </div>
</template>

<style scoped>
main {
  /*max-width: calc(100% - 1.5em);*/
  max-width: 100%;
}
@media (max-width: 30em) {
  main {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
