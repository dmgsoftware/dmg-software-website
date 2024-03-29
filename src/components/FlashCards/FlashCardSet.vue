<script lang="ts">
import { isProxy, toRaw } from 'vue'
import NewFlashCardLabel from '@/components/FlashCards/NewFlashCardLabel.vue'
import NewFlashCardValue from '@/components/FlashCards/NewFlashCardValue.vue'

export default {
  name: 'FlashCardSet',
  components: { NewFlashCardLabel, NewFlashCardValue },
  props: {
    setId: String
  },
  inject: ['addSetFunc', 'editSetFunc', 'loadSetFunc'],
  data() {
    return {
      set_name: '',
      labels: [{ side: 'front' }, { side: 'back' }],
      cards: [[]],
      counter: 0
      // study_set: [],
    }
  },
  methods: {
    buttonClicked() {
      this.setId ? this.editSet() : this.submitSet()
    },
    submitSet() {
      const newSet = {
        set: {
          setName: isProxy(this.set_name) ? toRaw(this.set_name) : this.set_name,
          labels: isProxy(this.labels) ? toRaw(this.labels) : this.labels,
          cards: isProxy(this.cards) ? toRaw(this.cards) : this.cards
        },
        done: (setId: number) => {
          this.$router.push({ name: 'flash_cards_view_set', params: { set_id: setId } })
        }
      }

      this.addSetFunc(newSet)
    },
    loadSet() {
      this.loadSetFunc({
        setId: this.setId,
        done: (set: {}) => {
          this.set_name = set.setName
          this.labels = set.labels
          this.cards = set.cards
        }
      })
    },
    editSet() {
      this.editSetFunc({
        setId: this.setId,
        set: {
          setName: isProxy(this.set_name) ? toRaw(this.set_name) : this.set_name,
          labels: isProxy(this.labels) ? toRaw(this.labels) : this.labels,
          cards: isProxy(this.cards) ? toRaw(this.cards) : this.cards
        },
        done: () =>
          this.$router.push({
            name: 'flash_cards_view_set',
            params: { set_id: this.setId }
          })
      })
    },

    updateLabelName(labelObj: typeof NewFlashCardLabel, name: string) {
      this.labels[labelObj.counter / 2].name = name
      labelObj.name = name
    },
    updateLabelSide(labelObj: typeof NewFlashCardLabel, side: string) {
      this.labels[labelObj.counter / 2].side = side
      labelObj.side = side
    },
    removeLabel(labelObj: typeof NewFlashCardLabel) {
      const index = labelObj.counter / 2

      this.labels.splice(index, 1)

      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].splice(index, 1)
      }
    },
    updateFlashCard(flashCardObj, val) {
      this.cards[flashCardObj.index_i][flashCardObj.index_j] = val
    },
    removeFlashCard(index: number) {
      this.cards.splice(index, 1)
    },
    createNewLabel() {
      this.labels.push({ side: '', name: '' })
    },
    newFlashCard() {
      this.cards = [...this.cards, Array(this.labels.length)]
    }
  },
  created() {
    if (this.setId) {
      this.loadSet()
    }
  }
}
</script>

<template>
  <h2 v-if="set_name" class="p-2 w-full">Editing: {{ set_name }}</h2>
  <h2 v-else>Adding Flash Card Set</h2>
  <div class="join mb-3 justify-enter">
    <label class="join-item btn" for="setName">Set Name</label>
    <input
      type="text"
      name="set_name"
      v-model="set_name"
      id="setName"
      class="join-item"
      placeholder="Basic Kanji"
    />
  </div>
  <div class="mb-3">
    <h5 class="form-label w-100">Flash Card Value Label</h5>
    <new-flash-card-label
      v-for="(label, index) in labels"
      :key="index"
      :label="label"
      :counter="index * 2"
      @update-label-name="updateLabelName"
      @update-label-side="updateLabelSide"
      @remove-label="removeLabel"
    />
    <div>
      <button class="btn" type="button" @click="createNewLabel">+ Add Label</button>
    </div>
  </div>
  <div id="flash_cards" class="mb-3">
    <h5>Flash Cards</h5>
    <ol v-if="this && this.cards">
      <li
        v-for="(card, index) in this.cards"
        :key="index"
        class="flex justify-center items-center pb-2"
      >
        <span>{{ index + 1 }}.</span>
        <div class="join ml-2 flex flex-wrap justify-center items-center">
          <button class="join-item btn btn-error" type="button" @click="removeFlashCard(index)">
            X
          </button>
          <new-flash-card-value
            v-for="(label, j) in this.labels"
            :value="card[j]"
            :cardval="card[j]"
            :index_i="index"
            :index_j="j"
            :placeholder="label.name"
            :key="j"
            :name="'cards[' + index + '][' + j + ']'"
            @update-flash-card="updateFlashCard"
          />
        </div>
      </li>
    </ol>
    <button class="btn w-fit mx-auto" type="button" @click="newFlashCard">+ Add Flash Card</button>
  </div>
  <button class="btn btn-outline-primary" type="button" @click="buttonClicked()">Save Set</button>
  <!--	</form>-->
</template>

<style scoped>
h2 {
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
}
#flash_cards {
  display: flex;
  flex-direction: column;
}

input[type='text'] {
  border: 1px solid var(--main-text-color);
  padding-left: 0.5em;
  min-height: 3em;
}
</style>
