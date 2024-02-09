<script lang="ts">
import FootComponent from '@/components/FootComponent.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import TheHeader from '@/components/FlashCards/HeaderComponent.vue'
import { computed } from 'vue'

const STORAGE_KEY = 'flash_cards'

function hasWindow(): boolean {
  return typeof window !== 'undefined'
}

function getSetsFromLocalStorage(): string {
  if (!hasWindow()) {
    return '[]'
  }
  return window.localStorage.getItem(STORAGE_KEY) ?? '[]'
}

function storeSetsInLocalStorage(value: string): void {
  if (!hasWindow()) {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, value)
}

export default {
  components: {
    TheHeader,
    MenuComponent,
    FootComponent
  },
  data() {
    return {
      sets: []
    }
  },
  provide() {
    return {
      sets: computed(() => this.sets),
      addSetFunc: computed(() => this.addSet),
      loadSetFunc: computed(() => this.loadSet),
      loadSetsFunc: computed(() => this.loadSets),
      editSetFunc: computed(() => this.editSet),
      saveAllSetsFunc: computed(() => this.saveAllSets),
      resetSetsFunc: computed(() => this.resetSets)
    }
  },
  computed: {
    notIndex() {
      return (this.$router.currentRoute.value.name ?? false) !== 'flash_cards_index'
    }
  },
  methods: {
    loadSets(opts = {}) {
      let returnFunc = opts['done']
      let sets = JSON.parse(getSetsFromLocalStorage())

      if (returnFunc instanceof Function) {
        returnFunc(sets)
      }

      return sets
    },
    addSet(opts = {}) {
      // console.log('addSet received', opts)
      let newSet = opts['set']

      if (!newSet) {
        console.warn('New set was not provided for saving.')
        return
      }

      let set_id = this.sets.push(newSet) - 1

      storeSetsInLocalStorage(JSON.stringify(this.sets))

      if (opts['done']) {
        opts['done'](set_id)
      }
    },
    editSet(opts = {}) {
      let setId = opts['setId']
      let set = opts['set']
      let returnFunc = opts['done']

      if (setId && set && this.sets[setId]) {
        this.sets[setId] = set
      } else {
        console.warn('setId or set were undefined', setId, set)
        return
      }

      storeSetsInLocalStorage(JSON.stringify(this.sets))

      if (returnFunc instanceof Function) {
        returnFunc()
      }
    },
    loadSet(opts = {}) {
      let setId = opts['setId']

      if (!setId) {
        console.warn('set_id was undefined')
        return []
      }

      if (this.sets.length <= setId) {
        console.warn(
          'Looking up set_id which is not available',
          'set_id:' + setId,
          'len:' + this.sets.length
        )
        return []
      }

      let set = this.sets[setId]
      let returnFunc = opts['done']

      if (returnFunc instanceof Function) {
        returnFunc(set)
      }

      return set
    },

    saveAllSets(opts = {}) {
      let json = opts['setsJson']
      let returnFunc = opts['done']

      this.sets = JSON.parse(json)

      storeSetsInLocalStorage(json)

      if (returnFunc instanceof Function) {
        returnFunc()
      }
    },
    resetSets(opts = {}) {
      let returnFunc = opts['done']

      this.sets = []
      storeSetsInLocalStorage(JSON.stringify(this.sets))

      if (returnFunc instanceof Function) {
        returnFunc()
      }
    }
  },
  created() {
    this.sets = this.loadSets()
  }
}
</script>

<template>
  <div id="site-wrapper">
    <MenuComponent />
    <main class="flex-grow px-3 mx-auto my-2">
      <div class="pane text-center h-full">
        <TheHeader show-settings v-if="notIndex" />
        <div class="flex flex-row flex-grow justify-center">
          <div class="w-full">
            <slot></slot>
          </div>
        </div>
      </div>
    </main>
    <FootComponent />
  </div>
</template>

<style scoped>
main {
  width: 100%;
}
.pane {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 20em;
}

.pane {
  border: 1px solid var(--main-color);
}
</style>
