<script lang="ts">

export default {
	components: {  },
	inject: ['loadSetsFunc', 'resetSetsFunc', 'saveAllSetsFunc'],
	methods: {
		setupSaveButtonHref() {
			// console.log('setupSaveButton')
			this.loadSetsFunc({
				done: (sets = {}) => {
					let aElem = document.getElementById("saveFlashCardsBtn");// as HTMLAnchorElement;
					let href = "data:text/json;charset=utf-16,";
					href += encodeURIComponent(JSON.stringify(sets));

					aElem.href = href;
				},
			});
		},
		loadFlashCardsFromText() {
			let loadTextElem = document.getElementById("load-text");// as HTMLTextAreaElement;
			let val = loadTextElem.value;

			if (confirm(
				"Are you sure you want to load this data? It will overwrite your current flash cards."
			)
			) {
				this.saveAllSetsFunc({
					setsJson: decodeURIComponent(val),
					done: () => {
						// loadTextElem.value = "";
						// this.setupSaveButtonHref();
						this.$router.push({ name: "flash_cards_home" });
					},
				});
			} else {
				console.log("canceled");
			}
		},
		resetData() {
			if (
				confirm("Are you sure you want to clear all of your flash card data?")
			) {
				this.resetSetsFunc({
					done: () => {
						//this.setupSaveButtonHref();
						this.$router.push({ name: "flash_cards_home" });
					},
				});
			}
		},
	},
	mounted() {
		this.setupSaveButtonHref();
	},
};
</script>

<template>
	<div id="container" class="p-2">
		<h2 class="mb-3">Settings</h2>
		<a id="saveFlashCardsBtn"	class="btn mb-4" download="flash_cards.json">
			Save Flash Cards to File
		</a>
		<p>If you would like to load from a previously saved state, paste contents below.</p>
		<textarea id="load-text" class="textarea textarea-lg my-4"
		          placeholder="Paste previously saved data here."></textarea>
		<div class="d-flex justify-content-around">
			<button class="btn btn-primary" @click="loadFlashCardsFromText">
				Load from Text
			</button>
		</div>
		<p class="my-4">
			If you would like to reset your flash card data, click the button
			below.
		</p>
		<button class="btn btn-error" @click="resetData">Reset</button>
	</div>
</template>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
}
h2 {
	width: 100%;
	font-size: 1.2em;
}
a {
	text-decoration: none;
}

textarea {
	flex-grow: 1;
	background-color: unset;
	border: 2px solid var(--main-color);
	/*color: var(--main-text-color);*/
}
/*::placeholder {
	color: var(--main-text-color);
}*/
textarea:focus-visible {
	outline: var(--main-accent-color) solid;
	outline-width: 2px;
}

@media (max-width: 30em) {
	textarea {
		width: calc(100% - 1em);
	}
}
</style>
