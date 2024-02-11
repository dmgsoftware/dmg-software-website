<script setup lang="ts">
import MenuComponent from '@/components/MenuComponent.vue'
import FootComponent from '@/components/FootComponent.vue'
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <main class="flex-grow px-3 mx-auto my-2">
      <div class="hero h-full">
        <div class="hero-content text-center">
          <div class="">
            <h1 class="text-4xl font-bold">Welcome</h1>
            <p class="text-xl py-10">Providing simple introductions to various technologies.</p>
            <div class="flex justify-around">
              <img src="/vue-logo.svg" alt="Vue logo" height="100px" width="100px" />
              <img src="/ts-logo.svg" alt="TypeScript logo" height="100px" width="100px" />
              <img id="php-logo" src="/php-logo.svg" alt="PHP logo" height="100px" width="100px" />
            </div>
          </div>
        </div>
      </div>
    </main>
    <FootComponent />
  </div>
</template>

<style scoped>
img {
  transition: 1000ms all ease-in-out;
}
img:hover {
  scale: 1.15;
}

@media (prefers-color-scheme: dark) {
  #php-logo {
    filter: invert(100%);
  }
}
</style>
