<script lang="ts">
export default {
	name: "NewFlashCardValue",
	props: {
		//card: Array,
	},
	data() {
		return { value: "", label: "" };
	},
	methods: {
		updateFlashCard(e) {
			this.$emit("update-flash-card", this, e);
		},
	},
	created() {
		this.value = this.$attrs.cardval ?? "";
		this.label = this.$attrs.placeholder ?? "";
		this.index_i = this.$attrs.index_i;
		this.index_j = this.$attrs.index_j;
	},
};
</script>

<template>
	<input
		type="text"
		id=""
		class="join-item mb-1"
		:placeholder="label"
		@input="updateFlashCard($event.target.value)"
	/>
</template>

<style scoped>
input {
	padding-top: .75em;
	padding-bottom: .75em;
	max-width: calc(100% / 2 - 1em);
}
</style>
