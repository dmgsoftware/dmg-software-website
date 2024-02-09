<script setup lang="ts">
import {RouterLink} from "vue-router";
import {onMounted} from "vue";

onMounted(() => {
	const navbarToggler = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement

	if (navbarToggler == undefined) {
		return
	}
	navbarToggler.addEventListener('keypress', function(event: KeyboardEvent) {
		const checkbox = this.nextElementSibling as HTMLInputElement
		if (checkbox == null) {
			return
		}

		if (event.code == "Enter") {
			checkbox.checked = !checkbox.checked
		}
	});
})


</script>

<template>
  <nav>
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/" tabindex=0 role="button">
	      <svg id="logo" viewBox="151.122 81.687 88.1641 42.783" width="88.1641" height="42.783" xmlns="http://www.w3.org/2000/svg" style="white-space: pre;">
		      <title>DMG Software Logo</title>
		      <path d="M156 116.7q-1.4 0-2.4-.6t-1.8-1.5l1-.9q.7.9 1.5 1.3t1.8.4q1.3 0 2-.6.6-.6.6-1.6 0-.9-.5-1.3-.5-.5-1.7-.8l-1-.2q-1.6-.4-2.4-1.1-1-.8-1-2.1 0-.8.4-1.4.3-.6.8-1 .5-.5 1.2-.7l1.6-.2q1.4 0 2.3.5 1 .5 1.7 1.4l-1.1.8q-.5-.7-1.2-1-.7-.4-1.7-.4-1.2 0-1.8.5-.7.4-.7 1.4 0 .9.6 1.3.5.4 1.6.7l1 .2q1.8.4 2.5 1.2.8.8.8 2.1 0 .8-.3 1.5-.2.7-.8 1.1-.5.5-1.3.7-.7.3-1.7.3Zm11 0q-1.1 0-2-.4-1-.4-1.7-1.2-.6-.8-1-2-.3-1-.3-2.6 0-1.5.3-2.6.4-1.1 1-2 .7-.7 1.6-1.1 1-.4 2.1-.4t2 .4q1 .4 1.7 1.2.6.8 1 1.9.3 1.1.3 2.6t-.3 2.7q-.4 1.1-1 1.9-.7.8-1.6 1.2-1 .4-2 .4Zm0-1.3q.8 0 1.4-.3.7-.2 1.1-.7.5-.6.8-1.3.2-.7.2-1.6v-2q0-.8-.2-1.5-.3-.8-.8-1.3t-1-.7q-.7-.3-1.5-.3t-1.4.3q-.7.2-1.1.7-.5.5-.7 1.3-.3.7-.3 1.6v2q0 .8.3 1.5.2.7.7 1.2.4.6 1.1.8.6.3 1.4.3Zm7.6 1v-11.8h7v1.3H176v4h5.2v1.2H176v5.4Zm13.5-10.5v10.6h-1.4v-10.6h-3.8v-1.3h9v1.3Zm7.6 10.6-2.9-11.9h1.6l1.2 5.7 1 4.4 1.2-4.4 1.5-5.7h1.6l1.4 5.7 1.1 4.4 1.1-4.4 1.4-5.7h1.4l-3 11.9h-1.6l-1.6-6-1-4.3-1.2 4.3-1.6 6Zm20.9 0-1.2-3.5h-4.8l-1.2 3.5H208l4.1-11.9h1.8l4.2 11.9Zm-3.6-10.6-2 5.8h4Zm8.5 10.6H220v-11.9h4.8q1.5 0 2.4.9.9.8.9 2.5 0 1.3-.6 2.1-.6.9-1.8 1.1l2.7 5.3h-1.6l-2.6-5.1h-2.7Zm3.3-6.4q.8 0 1.3-.4t.5-1.3v-.8q0-.8-.5-1.3-.5-.4-1.3-.4h-3.3v4.2Zm6.1 6.4v-11.9h7.3v1.3h-5.8v4h5.4v1.2h-5.4v4.1h5.8v1.3ZM176.6 98V85.9h4.2q1.4 0 2.1.2 1 .2 1.8.9 1 .8 1.5 2 .4 1.3.4 3 0 1.3-.3 2.4-.3 1-.8 1.8-.5.7-1.1 1-.6.5-1.5.7-.8.2-2 .2Zm1.6-1.4h2.6q1.2 0 1.9-.3.7-.2 1-.6.6-.6 1-1.5.3-1 .3-2.4 0-1.9-.7-3-.6-1-1.5-1.3-.6-.3-2-.3h-2.6Zm10.6 1.4V85.9h2.4l2.9 8.6.6 1.8.6-2 3-8.4h2.1v12.2H199V87.9l-3.6 10.2H194l-3.5-10.4v10.4Zm20-4.8V92h5v4.5q-1.1 1-2.4 1.4-1.2.5-2.6.5-1.8 0-3.2-.8-1.5-.7-2.2-2.2-.8-1.4-.8-3.2 0-1.8.8-3.3.7-1.6 2-2.3 1.5-.8 3.3-.8 1.3 0 2.4.5 1 .4 1.7 1.1.6.8.9 2l-1.5.4q-.2-.9-.7-1.4-.4-.6-1.1-.9-.8-.3-1.7-.3-1 0-2 .3-.7.4-1.2 1-.5.5-.8 1.1-.4 1.2-.4 2.5 0 1.6.5 2.7.6 1 1.7 1.6 1 .6 2.2.6 1 0 2-.4t1.6-1v-2.2Z"/>
	      </svg>
      </RouterLink>

      <label class="navbar-toggler" type="button" role="button" for="navbar-toggle" tabindex=0>
        <svg class="stroke-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" ><title>Menu</title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
	    <input id="navbar-toggle" type="checkbox" class="hidden" name="">

      <div class="" id="menu">
        <RouterLink to="/" tabindex=0>Home</RouterLink>
	      <RouterLink to="/theme_color_helper" tabindex=0>Theme Color Helper</RouterLink>
	      <RouterLink to="/flash_cards" tabindex=0>Flash Cards</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: sticky;
  padding: 1em;
  top: 0;
  z-index: 10;

  border-bottom: 3px solid var(--main-color);
  color:var(--main-text-color);
  background-color: var(--main-bg-color);

  box-shadow: 0 15px 30px -30px var(--main-color);
}

.navbar-brand {
	fill: var(--main-text-color);
	transition: 500ms all ease-in-out;
}
.navbar-brand:hover {
	/*animation: jiggle 5s linear infinite;*/
	scale: 1.1;
}
.navbar-brand {
  margin-right: auto;
}

a:not(:first-child) {
  margin-left: 2em;
}

.container-fluid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
}
button {
  display: none;
}
#menu {
  justify-content: flex-end;
  display: flex;
  align-items: center;
  max-height: 120px;
  transition: all 500ms ease-in-out;
}
.collapse {
  display: block;
  top: 0;
}

label {
  display: none;
}


@media (max-width: 30em) {
  #menu {
    max-height: 0;
    opacity: 0;
    grid-column: 1 / 3;
    display: flex;
    flex-direction: column;
    overflow:hidden;
  }

  a.navbar-toggler {
    padding: .3em;
	  border-radius: 5px;
  }
  .navbar-toggler:hover {
    animation: jiggle 2000ms linear infinite;
	  animation-delay: 2s;
    /*background-color: rgba(255,255,255,.2);*/
  }

	.navbar-toggler svg {
		stroke: var(--main-text-color);
		align-self: center;
		transition: 500ms all linear;

	}
	.navbar-toggler:hover svg {
		stroke: var(--main-accent-color);
	}

  /*
  Display menu when menu "button" (checkbox) is checked.
  */
  input:checked + #menu {
	  /*We can set this high, it won't necessarily be hit. However, that does affect transition speed*/
    max-height: 150px;
    opacity: 1;
  }

  label {
    display: inline-grid;
    /*display: block;*/
    height: auto;
    justify-self: flex-end;
  }
  #menu a {
    padding: .75em;
    width: 100%;
    text-align: center;
  }
  #menu a::after {
    content: none;
  }
  #menu a:not(:last-child) {
    border-bottom: 1px solid var(--main-text-color);
    grid-column: 1 / 3;
  }
  #menu a:not(:last-child):hover {
    border-bottom-color: var(--main-accent-color);
  }
  a:not(:first-child) {
    margin-left: 0;
  }
}

</style>