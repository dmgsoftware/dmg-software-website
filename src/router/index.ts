import { createRouter, createWebHistory } from 'vue-router'
import { useHead } from 'unhead'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'DMG Software',
        meta: [
          {
            name: 'description',
            content:
              'Explore various technologies and programming topics in JS, TS, Vue, ' +
              'CSS, and PHP. We make understanding these subjects simple and accessible, ' +
              'empowering you to use them in your own projects.'
          },
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]
      }
    },
    {
      path: '/theme_color_helper',
      name: 'theme_color_helper',
      component: () => import('@/views/ThemeColorHelper.vue'),
      meta: {
        title: 'Theme Color Helper - DMG Software',
        meta: [
          {
            name: 'description',
            content:
              'Created using Vue, Theme Color Helper is meant to generate ' +
              'any number of colors you like and help you determine what colors work well together.'
          },
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]
      }
    },
    {
      path: '/flash_cards',
      name: 'flash_cards_index',
      component: () => import('@/views/FlashCardsIndex.vue'),
      meta: {
        title: 'Flash Cards App - DMG Software',
        meta: [
          {
            name: 'description',
            content:
              "Created using Vue, this flash cards app is meant to showcase some of Vue's capabilities."
          },
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]
      }
    },
    {
      path: '/flash_cards/home',
      name: 'flash_cards_home',
      component: () => import('@/views/FlashCards/FlashCardsHome.vue'),
      meta: {
        title: 'Home - Flash Cards App',
        meta: [
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    },
    {
      path: '/flash_cards/add_set',
      name: 'flash_cards_add_set',
      component: () => import('@/views/FlashCards/AddSet.vue'),
      meta: {
        title: 'Add Set - Flash Cards App',
        meta: [
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    },
    {
      path: '/flash_cards/set/:set_id',
      name: 'flash_cards_view_set',
      component: () => import('@/views/FlashCards/StudySet.vue'),
      props: true,
      meta: {
        title: 'Study Set - Flash Cards App',
        meta: [
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    },
    {
      path: '/flash_cards/set/:set_id/edit',
      name: 'flash_cards_edit_set',
      component: () => import('@/views/FlashCards/EditSet.vue'),
      props: true,
      meta: {
        title: 'Edit Set - Flash Cards App',
        meta: [
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    },
    {
      path: '/flash_cards/settings',
      name: 'flash_cards_settings',
      component: () => import('@/views/FlashCards/SettingsView.vue'),
      meta: {
        title: 'Settings - Flash Cards App',
        meta: [
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404_not_found',
      component: () => import('@/views/404View.vue'),
      meta: {
        title: '404 Not Found - DMG Software',
        meta: [
          {
            name: 'description',
            content: 'Unfortunately, we were not able to find this page!'
          },
          {
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const path = to.path

  if (path !== '/' && path.endsWith('/')) {
    return {
      replace: true,
      path: to.fullPath.replace(path, path.slice(0, -1))
    }
  }

  useHead(to.meta)
})

export default router
