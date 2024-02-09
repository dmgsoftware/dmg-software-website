<script lang="ts">
export default {
	name: "TheHeader",
};
</script>

<template>
	<header class="flex justify-between align-items-center p-3">
		<h4 class="mb-0 me-4 text-lg">
			<router-link :to="{ name: 'flash_cards_home' }" class="link-dark text-decoration-none">
				Flash Card App
			</router-link>
		</h4>
		<router-link :to="{ name: 'flash_cards_settings' }" class="ms-4">Settings</router-link>
	</header>
</template>

<style scoped>
header {
	border-bottom: 1px solid var(--main-color)
}
</style>
