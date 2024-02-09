<script lang="ts">
import FlashCardSet from '@/components/FlashCards/FlashCardSet.vue'
import FlashCardsWrapper from '@/components/FlashCards/WrapperComponent.vue'

export default {
  name: 'Edit',
  components: { FlashCardsWrapper, FlashCardSet },
  props: ['set_id']
}
</script>

<template>
  <FlashCardsWrapper>
    <div class="p-3 pt-1">
      <FlashCardSet :setId="set_id" />
    </div>
  </FlashCardsWrapper>
</template>

<style scoped></style>
