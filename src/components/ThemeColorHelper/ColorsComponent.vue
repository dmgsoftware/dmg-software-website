<script setup lang="ts">
import ColorComponent from '@/components/ThemeColorHelper/ColorComponent.vue'
import { randomRgbColor, hexToRgb } from '@/ts/ThemeColorHelper'
import { ref } from 'vue'

const colors = ref(
  Array(4)
    .fill(null)
    .map(() => {
      return {
        allowRandomize: true,
        color: randomRgbColor()
      }
    })
)

interface ChangeEvent extends Event {
  target: HTMLInputElement
}

const randomizeColors = () => {
  for (let i = 0; i < colors.value.length; i++) {
    if (colors.value[i].allowRandomize) {
      colors.value[i].color = randomRgbColor()
    }
  }
}
const addColor = () => {
  colors.value.push({
    allowRandomize: true,
    color: randomRgbColor()
  })
}
const colorChange = (position: string, event: ChangeEvent) => {
  colors.value[Number(position) - 1].color = hexToRgb(event.target.value)
  //colors.value[Number(position) - 1].color = convert.hex.rgb(event.target.value)//colorString.get.rgb(event.target.value)
}
const allowRandomize = (position: string, event: ChangeEvent) => {
  //
  colors.value[Number(position) - 1].allowRandomize = event.target.checked
}
</script>

<template>
  <div id="tools">
    <button id="randomize" class="btn" @click="randomizeColors()">Randomize</button>
    <button id="add-color" class="btn" @click="addColor()">Add Color</button>
  </div>
  <div id="colors">
    <ColorComponent
      v-for="i in colors.length"
      :position="i"
      :key="i"
      :colors="colors"
      @color-change="colorChange"
      @allow-randomize="allowRandomize"
    />
  </div>
</template>

<style scoped>
#tools {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

#tools > button {
  margin: 0 2em;
}
#colors {
  overflow-x: clip;
  overflow-y: scroll;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
