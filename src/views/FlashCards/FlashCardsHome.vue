<script lang="ts">
import FlashCardsWrapper from '../../components/FlashCards/WrapperComponent.vue'
import FlashCardSets from '@/components/FlashCards/FlashCardSets.vue'

export default {
  components: { FlashCardSets, FlashCardsWrapper }
}
</script>

<template>
  <FlashCardsWrapper>
    <FlashCardSets />
  </FlashCardsWrapper>
</template>

<style scoped></style>
