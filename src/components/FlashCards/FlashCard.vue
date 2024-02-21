<script lang="ts">
export default {
  name: 'FlashCard',
  data() {
    return {
      click: false,
      drag: false,
      flipped: false
    }
  },
  props: {
    card: Array,
    labels: Object
  },
  methods: {
    flip() {
      //mouseup fires after dragstart, so it will reset drag status if was set
      if (this.drag) {
        this.click = false
        this.drag = false
        return
      }

      this.flipped = !this.flipped
    }
  },
  computed: {
    getFront() {
      return this.card.filter((val, i) => this.labels[i] && this.labels[i].side === 'front')
    },
    getBack() {
      return this.card.filter((val, i) => this.labels[i] && this.labels[i].side === 'back')
    }
  }
}
</script>

<template>
  <div
    class="parent-display-card"
    @dragstart="this.drag = true"
    @mousedown="this.click = true"
    @mouseup="flip"
    draggable="true"
  >
    <div :class="'display-card p-3 bg-light' + (this.flipped ? ' flipped' : '')">
      <div v-for="(label, i) in getFront" :key="i">
        <span>{{ label }}</span>
      </div>
    </div>
    <div
      :class="
        'display-card p-3 bg-neutral-700 text-neutral-200' + (!this.flipped ? ' flipped' : '')
      "
    >
      <div v-for="(label, i) in getBack" :key="i">
        <span>{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.8s ease;
  height: 100%;
  width: 100%;
  z-index: 2;
}
.display-card.flipped {
  transform: rotateY(180deg);
  z-index: 1;
}
</style>
