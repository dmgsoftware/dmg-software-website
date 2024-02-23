<script lang="ts">
export default {
  name: 'NewFlashCardLabel',
  data() {
    return { name: '', side: '' }
  },
  props: { label: Object, counter: Number },
  methods: {
    updateLabelName(val: string) {
      this.$emit('update-label-name', this, val)
    },
    updateLabelSide(val: string) {
      this.$emit('update-label-side', this, val)
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
      @input="updateLabelName($event.target.value)"
      :value="label.name"
    />
    <input
      :id="counter"
      class="join-item btn"
      type="radio"
      :name="'label[' + counter / 2 + '][side]'"
      aria-label="Front"
      value="front"
      autocomplete="off"
      @change="updateLabelSide($event.target.value)"
      :checked="label.side === 'front'"
    />
    <input
      :id="counter + 1"
      class="join-item btn"
      type="radio"
      :name="'label[' + counter / 2 + '][side]'"
      aria-label="Back"
      value="back"
      autocomplete="off"
      @change="updateLabelSide($event.target.value)"
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
