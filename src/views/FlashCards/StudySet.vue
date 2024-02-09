<script lang="ts">
import FlashCardsWrapper from '@/components/FlashCards/WrapperComponent.vue'
import FlashCards from '@/components/FlashCards/FlashCards.vue'

export default {
  name: 'Study',
  components: { FlashCardsWrapper, FlashCards },
  props: ['set_id']
}
</script>

<template>
  <FlashCardsWrapper>
    <div class="p-3 pt-1">
      <FlashCards :set-id="set_id" />
    </div>
  </FlashCardsWrapper>
</template>

<style scoped></style>
