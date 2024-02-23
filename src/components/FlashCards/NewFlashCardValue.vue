<script lang="ts">
export default {
  name: 'NewFlashCardValue',
  props: {
    index_i: Number,
    index_j: Number
  },
  data() {
    return { value: '', label: '' }
  },
  methods: {
    updateFlashCard(e: Event) {
      this.$emit('update-flash-card', this, (e.target as HTMLInputElement).value)
    }
  }
}
</script>

<template>
  <input type="text" id="" class="join-item" :placeholder="label" @input="updateFlashCard" />
</template>

<style scoped>
input {
  max-width: calc(100% / 2 - 2em);
}
</style>
