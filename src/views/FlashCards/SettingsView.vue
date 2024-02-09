<script lang="ts">
import FlashCardsWrapper from '@/components/FlashCards/WrapperComponent.vue'
import FlashCardSettings from '@/components/FlashCards/SettingsComponent.vue'

export default {
  components: { FlashCardSettings, FlashCardsWrapper }
}
</script>

<template>
  <FlashCardsWrapper>
    <FlashCardSettings />
  </FlashCardsWrapper>
</template>

<style scoped></style>
