<script lang="ts">
export default {
  name: 'NewFlashCardLabel',
  data() {
    return { name: '', side: '' }
  },
  props: {
    label: {
      type: Object,
      default: () => {
        return { name: '' }
      }
    },
    counter: { type: Number, default: 0 }
  },
  methods: {
    updateLabelName(e: Event) {
      this.$emit('update-label-name', this, (e.target as HTMLInputElement).value)
    },
    updateLabelSide(e: Event) {
      this.$emit('update-label-side', this, (e.target as HTMLInputElement).value)
    },
    removeLabel() {
      this.$emit('remove-label', this)
    }
  },
  created() {
    if (this.label !== undefined) {
      this.name = this.label.name
      this.side = this.label.side
    }
  }
}
</script>

<template>
  <div class="join m-2 flex justify-center">
    <button class="join-item btn btn-error" type="button" @click="removeLabel">X</button>
    <input
      type="text"
      :name="'flash_card_label[' + counter / 2 + ']'"
      id="flashCardLabel"
      class="join-item"
      placeholder="漢字"
      @input="updateLabelName"
      :value="label.name"
    />
    <input
      class="join-item btn"
      type="radio"
      :name="'label[' + counter / 2 + '][side]'"
      aria-label="Front"
      value="front"
      autocomplete="off"
      @change="updateLabelSide"
      :checked="label.side === 'front'"
    />
    <input
      class="join-item btn"
      type="radio"
      :name="'label[' + counter / 2 + '][side]'"
      aria-label="Back"
      value="back"
      autocomplete="off"
      @change="updateLabelSide"
      :checked="label.side === 'back'"
    />
  </div>
</template>

<style scoped>
input[type='text'] {
  border: 1px solid var(--main-text-color);
  padding-left: 0.5em;
}
@media (max-width: 30em) {
  input[type='text'] {
    width: calc(100% / 2);
  }
}
</style>
