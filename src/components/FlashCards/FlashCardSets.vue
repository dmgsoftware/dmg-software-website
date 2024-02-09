<script lang="ts">
export default {
	name: "FlashCardSets",
	inject: ['sets'],
	methods: {
		hasSets(): boolean {
			return this.sets && this.sets.length > 0
		}
	},
};
</script>

<template v-slot="slotProps">
	<div id="flash-card-sets" class="p-3">
		<p v-if="!hasSets()">It looks like you don't have any flash card sets. Let's go ahead and add your first set!</p>
		<ul v-else class="menu w-56 mx-auto border border-primary">
			<li class="h6">
				Study Sets:
			</li>
			<li	v-for="(set, i) in this.sets"
				:key="i"
				class="mx-auto">
				<router-link :to="'/flash_cards/set/' + i">
					{{set.setName ? set.setName : '--no name--'}}
				</router-link>
			</li>
		</ul>
		<router-link :to="{ name: 'flash_cards_add_set' }" class="btn mt-3">+ Add New Set</router-link>
	</div>
</template>

<style scoped>
#flash-card-sets {
	/*border-right: 1px solid var(--main-color);*/
}
</style>
