<script lang="ts">
import { Swipeable, SWIPE } from 'vue-swipy'
import FlashCard from '@/components/FlashCards/FlashCard.vue'

export default {
  name: 'FlashCards',
  components: { FlashCard, Swipeable },
  props: { setId: String },
  inject: ['loadSetFunc'],
  data() {
    return {
      setName: '--no name--',
      cards: [],
      labels: [],
      currentCardIndex: 0,
      cardToStudyIndex: 0,
      showEndCard: false,
      knownCards: [],
      unknownCards: [],
      cardsToStudy: []
    }
  },
  computed: {
    //at most only want 10 cards drawn on the canvas
    //this is in case we have hundreds or thousands of cards
    getCardsToDisplay() {
      let low = this.currentCardIndex <= 5 ? 0 : this.currentCardIndex - 5
      let high =
        this.currentCardIndex + 5 > this.cardsToStudy.length
          ? this.cardsToStudy.length
          : this.currentCardIndex + 5

      let cardsToDisplay = {}
      let slicedCards = this.cardsToStudy.slice(low, high)

      for (let i = high; i > low; i--) {
        cardsToDisplay[i - 1] = slicedCards.pop()
      }

      return cardsToDisplay
    },
    knewAllOfTheCards() {
      return this.knownCards.length >= this.cardsToStudy.length && this.unknownCards.length === 0
    }
  },
  methods: {
    getStatus(card) {
      let status = SWIPE.NONE
      if (this.unknownCards.indexOf(card) > -1) {
        status = SWIPE.LEFT
      } else if (this.knownCards.indexOf(card) > -1) {
        status = SWIPE.RIGHT
      }
      return status
    },
    getCurrentSwipeable() {
      return this.$refs['swipeable' + this.currentCardIndex][0]
    },
    onSwipe(direction: string) {
      if (direction === SWIPE.LEFT) {
        this.didNotKnow()
      } else if (direction === SWIPE.RIGHT) {
        this.didKnow()
      } else {
        console.error('Received a direction we are not familiar with: ', direction)
      }
    },
    loadSet() {
      if (typeof this.loadSetFunc !== 'function') {
        return
      }
      this.loadSetFunc({
        setId: this.setId,
        done: (set = {}) => {
          //this.study_set = set;
          this.cards = set.cards
          this.labels = set.labels
          this.setName = set.setName
        }
      })
    },
    didKnow() {
      if (this.getCurrentSwipeable().getStatus() !== SWIPE.RIGHT) {
        this.getCurrentSwipeable().setStatus(SWIPE.RIGHT)
      }

      this.knownCards.push(this.cardsToStudy[this.currentCardIndex])
      this.goForward()
    },
    didNotKnow() {
      if (this.getCurrentSwipeable().getStatus() !== SWIPE.LEFT) {
        this.getCurrentSwipeable().setStatus(SWIPE.LEFT)
      }

      this.unknownCards.push(this.cardsToStudy[this.currentCardIndex])
      this.goForward()
    },
    goBack() {
      if (this.showEndCard) {
        this.showEndCard = false
      } else {
        this.currentCardIndex--
      }

      this.getCurrentSwipeable().setStatus(SWIPE.NONE)

      //find last card in known/unknown and remove it
      let card = this.cards[this.currentCardIndex]

      if (
        this.unknownCards.length > 0 &&
        this.unknownCards[this.unknownCards.length - 1] === card
      ) {
        this.unknownCards.pop()
      } else if (
        this.knownCards.length > 0 &&
        this.knownCards[this.knownCards.length - 1] === card
      ) {
        this.knownCards.pop()
      }
    },
    handleKeyPress(e: KeyboardEvent) {
      if (e.code === 'Space') {
        this.$refs['flashCard' + this.currentCardIndex][0].flip()
        e.preventDefault()
      } else if (e.code === 'ArrowLeft') {
        this.didNotKnow()
      } else if (e.code === 'ArrowRight') {
        this.didKnow()
      }
      //console.log(e.code);
    },
    studyAll() {
      this.restart(this.cards)
    },
    studyUnknown() {
      this.restart(this.unknownCards)
    },
    studyAgain() {
      this.restart(this.cardsToStudy)
    },
    goForward() {
      if (this.currentCardIndex + 1 >= this.cardsToStudy.length) {
        this.showEndCard = true
      } else {
        this.currentCardIndex++
      }
    },
    restart(cardsToStudy) {
      this.cardsToStudy.forEach((card, index) => {
        if (this.$refs['flashCard' + index] && this.$refs['flashCard' + index][0]) {
          this.$refs['flashCard' + index][0].flipped = false
          this.$refs['swipeable' + index][0].setStatus(SWIPE.NONE)
        }
      })

      this.cardsToStudy = cardsToStudy
      this.currentCardIndex = 0
      this.unknownCards = []
      this.knownCards = []
      //this.flippedCards = [];
      this.showEndCard = false
    }
  },
  mounted() {
    document.addEventListener('keyup', this.handleKeyPress)
  },
  unmounted() {
    document.removeEventListener('keyup', this.handleKeyPress)
  },
  created() {
    this.loadSet()
    this.cardsToStudy = this.cards
  }
  // beforeUpdate() {
  //I can't think of an instance when we would be needing to load a fresh copy of the set
  //while we are studying it
  // this.loadSet();
  // },
  //commented this out and doesn't seem to give us any issues
  // watch: {
  // 	cards() {
  // 		this.studyAll();
  // 	},
  // },
}
</script>

<template>
  <h5 class="p-2" v-if="cards && cards.length > 0">
    Studying:
    {{ setName }}
  </h5>
  <div v-if="cardsToStudy && cardsToStudy.length > 0">
    <div id="flash-card-container" class="border overflow-hidden">
      <Swipeable
        v-for="(card, index) in getCardsToDisplay"
        :key="index"
        v-on:swipe="onSwipe"
        class="flash-card"
        :style="{
          zIndex: index * -1
        }"
        :ref="'swipeable' + index"
        :outOfSightXOffset="750"
        :initialStatus="getStatus(card)"
      >
        <flash-card :card="card" :labels="labels" :ref="'flashCard' + index"
      /></Swipeable>

      <div
        id="end-card"
        :class="
          'flash-card flex flex-col justify-center items-center p-5 space-y-6' +
          (!showEndCard ? ' transparent' : '')
        "
        :style="{
          zIndex: cardsToStudy.length * -1
        }"
      >
        <div class="space-y-6" v-if="knewAllOfTheCards">
          <h3 class="text-lg">Congratulations, you knew all of the flash cards!</h3>
          <button class="btn" @click="studyAgain">Study the same cards again.</button>
        </div>
        <button v-else class="btn w-fit" @click="studyUnknown">
          Study the flash cards you did not remember.
        </button>
        <button class="btn w-fit" @click="studyAll">Study all of the flash cards again.</button>
      </div>
    </div>
    <div class="flex justify-around p-4">
      <button @click="didNotKnow" class="btn btn-warning" type="button" :disabled="showEndCard">
        Nope
      </button>
      <button @click="didKnow" class="btn btn-success" type="button" :disabled="showEndCard">
        Yup
      </button>
    </div>
    <div class="flex justify-between items-center">
      <button
        class="btn btn-sm btn-outline-primary"
        :disabled="currentCardIndex == 0 && !showEndCard"
        @click="goBack"
      >
        Back
      </button>
      <router-link class="h-fit" :to="{ name: 'flash_cards_edit_set', params: { set_id: setId } }"
        >Edit</router-link
      >
      <span class=""> {{ currentCardIndex + 1 }} / {{ cardsToStudy.length }} </span>
    </div>
  </div>
  <div v-else class="h6 pt-3">
    This is an invalid flash card set.
    <router-link :to="{ name: 'flash_cards_home' }">Please go home</router-link> and select a valid
    set, or
    <router-link :to="{ name: 'flash_cards_add_set' }">create a new set here.</router-link>
  </div>
</template>

<style scoped>
#flash-card-container {
  height: 15em;
  position: relative;
  z-index: 0;
  border-color: var(--main-accent-color);
}
.flash-card {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  transition: all 0.8s ease;

  border: 1px solid var(--main-accent-color);
  background-color: var(--main-bg-color);
}
#end-card {
  opacity: 1;
  transition: 500ms all ease-in-out;
}
#end-card.transparent {
  opacity: 0;
}
</style>
