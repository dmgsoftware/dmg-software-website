<script setup lang="ts">
import { RouterLink } from 'vue-router'

// const POST = function (url: string, form: HTMLFormElement): Promise<Response> {
//   return fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     body: new FormData(form)
//   })
// }

const showToast = (message: string) => {
  const toast = document.getElementById('toast')

  if (toast === null) {
    return
  }

  const span = toast.querySelector('span')

  if (span === null) {
    return
  }

  span.innerText = message
  toast.classList.add('show')

  setTimeout(() => {
    toast.classList.remove('show')
  }, 5000)
}

function submittedSubscribe(e: Event): void {
  e.preventDefault()

  //const form = e.target as HTMLFormElement
  //POST(form.action, form)

  showToast('Subscribe button does not work yet. Please try again tomorrow!')

  const subscribeButton = document.getElementById('subscribe-btn') as HTMLButtonElement
  if (subscribeButton !== null) {
    subscribeButton.disabled = true
  }
}
</script>

<template>
  <footer id="footer" class="p-4">
    <form
      action=""
      method="POST"
      class="text-right sm:max-w-sm max-w-full ms-auto"
      style="grid-area: subscribe"
      @submit="submittedSubscribe"
    >
      <p class="mb-3">
        If you would like to hear about the latest updates, enter your email down below.
      </p>
      <label class="">
        <input
          type="email"
          placeholder="Email Subscription"
          class="input input-bordered"
          name="email"
        />
      </label>
      <div id="subscribe-btn-container" class="">
        <button id="subscribe-btn" class="btn">Subscribe</button>
      </div>
    </form>
    <div class="" style="grid-area: nav">
      <ul>
        <li class="text-lg"><h2>Menu Links</h2></li>
        <li><RouterLink to="/" tabindex="0">Home</RouterLink></li>
        <li><RouterLink to="/theme_color_helper" tabindex="0">Theme Color Helper</RouterLink></li>
        <li><RouterLink to="/flash_cards" tabindex="0">Flash Cards</RouterLink></li>
      </ul>
    </div>
    <p id="copyright" class="flex" style="grid-area: copyright">&#169; 2024 DMG Software</p>
    <div id="toast" class="toast">
      <div class="alert alert-info">
        <span></span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  overflow: hidden;
  border-top: 2px solid var(--main-color);
  display: grid;
  /*gap: 10px;*/
  /*grid-template-columns: 1fr 1fr;*/
  grid-template-areas:
    'nav subscribe'
    'copyright copyright';
  box-shadow: 0 -15px 30px -30px var(--main-color);
}
li {
  width: max-content;
}
li:not(:first-child) {
  margin-top: 0.5em;
}
#subscribe-btn-container {
  margin: 1em 0 0.5em;
}
#copyright {
  justify-content: center;
}

.toast {
  position: absolute;
  bottom: -100%;
  transition: 500ms all ease-in-out;
  white-space: break-spaces;
}
.toast.show {
  bottom: 0;
}

@media (max-width: 30em) {
  #subscribe-btn-container {
    display: inline-block;
    margin: 0 0 0.75em 0.75em;
  }
  footer {
    /*grid-template-columns: 1fr;*/
    grid-template-areas:
      'subscribe subscribe'
      'nav copyright';
    grid-template-columns: 50% 50%;
  }
  #copyright {
    justify-content: flex-end;
    align-items: flex-end;
  }
}
@media (max-width: 408px) {
  #subscribe-btn-container {
    margin: 0.75em 0 0 0;
    width: 100%;
  }
  footer {
    grid-template-areas:
      'subscribe subscribe'
      'nav nav'
      'copyright copyright';
  }
  /*
	I think when we have more nav links we will be getting rid of the 30em media query in favor of this one.
	Or at least in regards to grid-template-area placement
	*/
  #copyright {
    justify-content: center;
    margin-top: 0.75em;
  }
}
</style>
