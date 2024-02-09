<script setup lang="ts">
import MenuComponent from '@/components/MenuComponent.vue'
import FootComponent from '@/components/FootComponent.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

//If this page is refreshed or navigated to via the address bar,
//there won't be any state to go off of
let lastPage = router.options.history.state['back']?.toString() ?? '/'
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <main class="flex-grow px-3 mx-auto my-2">
      <h2 class="text-5xl mt-4 w-full text-center">404</h2>
      <h3 class="text-3xl p-10">Page not found :(</h3>
      <div class="flex justify-between my-4">
        <RouterLink :to="lastPage" class="btn">&lt;-- Go Back</RouterLink>
        <RouterLink to="/" class="btn">Go Home</RouterLink>
      </div>
    </main>
    <FootComponent />
  </div>
</template>
