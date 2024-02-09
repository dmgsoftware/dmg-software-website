<script setup lang="ts">
import ColorLabel from '@/components/ThemeColorHelper/ColorLabel.vue'
import { rgbToHex } from '@/ts/ThemeColorHelper'

const props = defineProps(['colors', 'position'])

const copyColor = async function (color: string) {
  await navigator.clipboard.writeText(color)
}
</script>

<template>
  <div
    class="color"
    :data-position="props.position"
    :style="{ backgroundColor: colors[props.position - 1].color }"
  >
    <label>
      <input
        type="color"
        :value="rgbToHex(colors[props.position - 1].color)"
        @change="$emit('colorChange', props.position, $event)"
      />
      <span class="color-labels">
        <ColorLabel
          v-for="(thisColor, i) in colors"
          :key="i"
          :position="i + 1"
          :thisColor="thisColor.color"
          :parentColor="colors[props.position - 1].color"
        />
      </span>
    </label>
    <div class="randomize-label">
      <div>
        <input
          type="text"
          :data-position="props.position"
          disabled
          :value="colors[props.position - 1].color"
        />
        <button class="btn" @click="copyColor(colors[props.position - 1].color)">Copy</button>
      </div>
      <label
        >Randomize<input
          class="checkbox checkbox-md checkbox-secondary"
          type="checkbox"
          @change="$emit('allowRandomize', props.position, $event)"
          checked
      /></label>
    </div>
  </div>
</template>

<style scoped>
.color {
  min-height: 400px;
  width: 250px;
  margin: 0 0 20px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.color > label {
  display: flex;
  flex-grow: 1;
  cursor: pointer;
}

input[type='color'] {
  display: none;
}

.color-labels {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.color-labels > span {
  display: flex;
  justify-content: space-between;
}

.randomize-label {
  position: relative;
  width: calc(100% + 20px);
  left: -10px;
  top: 10px;
  padding: 10px;
  /*padding-bottom: 10px;*/
  /*padding-left: 10px;*/

  /*background-color: var(--main-bg-color);*/
  background-color: rgba(0, 0, 0, 0.5);
  /*color: var(--main-text-color);*/
  color: white;

  display: flex;
  flex-direction: column;
}
.randomize-label > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.randomize-label button {
  background-color: transparent;
  border-color: white;
  color: white;
}

.randomize-label > *:last-child {
  display: flex;
  align-items: center;
  width: fit-content;
}

.randomize-label input[type='text'] {
  background: unset;
  border: none;
  border-bottom: 1px solid;
  color: inherit;
  font-size: 14px;
  max-width: 65%;
}

.randomize-label input[type='checkbox'] {
  border: 2px solid white;
  margin-left: 10px;
  /*scale: 1.3;*/
}

@media (max-width: 30em) {
  .color {
    width: calc(100%);
  }
}
</style>
