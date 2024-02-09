<script lang="ts">
import FlashCardSet from '@/components/FlashCards/FlashCardSet.vue'
import FlashCardsWrapper from '@/components/FlashCards/WrapperComponent.vue'
export default {
  name: 'AddSet',
  components: {
    FlashCardsWrapper,
    FlashCardSet
  }
}
</script>

<template>
  <FlashCardsWrapper>
    <div class="p-3 pt-1">
      <FlashCardSet />
    </div>
  </FlashCardsWrapper>
</template>

<style scoped></style>
