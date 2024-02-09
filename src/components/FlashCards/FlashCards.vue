<script lang="ts">
import FlashCard from '@/components/FlashCards/FlashCard.vue'

export default {
  name: 'FlashCards',
  components: { FlashCard },
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
    }
  },
  methods: {
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
      this.knownCards.push(this.cardsToStudy[this.currentCardIndex])
      this.goForward()
    },
    didNotKnow() {
      this.unknownCards.push(this.cardsToStudy[this.currentCardIndex])
      this.goForward()
    },
    goBack() {
      if (this.showEndCard) {
        this.showEndCard = false
      } else {
        this.currentCardIndex--
      }

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
    handleKeyPress(e) {
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
  <div
    v-if="cardsToStudy && cardsToStudy.length > 0"
    class="col-xl-6 col-lg-7 col-md-8 col-sm-9 col-12"
  >
    <!--'left: ' + 100 * (index - this.currentCardIndex - (this.showEndCard ? 1 : 0)) + '%;'-->
    <div id="flash-card-container" class="d-grid border overflow-hidden">
      <div
        v-for="(card, index) in getCardsToDisplay"
        :key="index"
        class="flash-card"
        :style="
          'left: ' +
          100 * (index - this.currentCardIndex - (this.showEndCard ? 1 : 0)) +
          '%; z-index:2;'
        "
      >
        <flash-card :card="card" :labels="this.labels" :ref="'flashCard' + index" />
      </div>

      <div
        id="end-card"
        :class="
          'display-card align-items-center justify-content-center d-flex flex-column p-5' +
          (!showEndCard ? ' transparent' : '')
        "
        style="z-index: 1"
      >
        <a href="#study-all" @click="studyAll">Study all of the flash cards.</a>
        <a href="#study-not-known" @click="studyUnknown" v-if="this.unknownCards.length > 0"
          >Study the flash cards you did not remember.</a
        >
        <span v-else>
          Congratulations, you remembered all of the flash cards!
          <a href="#study-again" @click="studyAgain">Click here</a> to study the same flash cards
          again.
        </span>
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
        :disabled="this.currentCardIndex == 0 && !showEndCard"
        @click="goBack"
      >
        Back
      </button>
      <router-link
        class="h-fit"
        :to="{ name: 'flash_cards_edit_set', params: { set_id: this.setId } }"
      >
        Edit
      </router-link>
      <span class=""> {{ currentCardIndex + 1 }} / {{ this.cardsToStudy.length }} </span>
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
  grid-template: 1fr / 1fr;
  height: 15em;
  position: relative;
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
  transition: 1000ms all ease-in-out;
}
#end-card.transparent {
  opacity: 0;
}
</style>