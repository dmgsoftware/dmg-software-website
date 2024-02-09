import './assets/tailwind.css'
import './assets/main.css'

/*
 * We may or may not use ViteSSG.
 * Not sure yet.
 * */
import { ViteSSG } from 'vite-ssg'
import type { ViteSSGContext } from 'vite-ssg'

import { useHead } from '@unhead/vue'

import App from './App.vue'

import routerOptions from '@/router'

// const app = createApp(App)

export const createApp: (client?: boolean, routePath?: string) => Promise<ViteSSGContext<true>> =
  ViteSSG(App, routerOptions, ({ router }) => {
    //app.use(router)
    //app.use(head)
    //app.mount('#app')
    router.beforeEach((to) => {
      const path = to.path

      if (typeof document !== 'undefined') {
        console.log(document.location.href)
      }

      if (path !== '/' && path.endsWith('/')) {
        return { replace: true, path: to.fullPath.replace(path, path.slice(0, -1)) }
      }

      useHead(to.meta)
    })
    router.afterEach(() => {
      if (typeof document !== 'undefined') {
        console.log(document.location.href)
      }
    })
  })
