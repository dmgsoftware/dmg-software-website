<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardsWrapper from '../components/FlashCards/WrapperComponent.vue'

export default defineComponent({
  components: { FlashCardsWrapper }
})
</script>
<template>
  <FlashCardsWrapper>
    <div id="container" class="h-full p-3 sm:p-5 align-middle">
      <h1 class="text-3xl sm:mt-10 mt-3">Flash Cards App</h1>
      <h2 class="text-xl pb-0 mb-0">
        <router-link to="/flash_cards/home">Get Started --&gt;</router-link>
      </h2>
      <div id="bottom" class="sm:p-3">
        <span>v 0.1.0</span>
        <span>
          <RouterLink to="/">DMG <br />SOFTWARE</RouterLink>
        </span>
      </div>
    </div>
  </FlashCardsWrapper>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h2 {
  border: none;
  width: 100%;
}
#bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h5 {
  align-self: flex-end;
}
</style>
