import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { archiveItems } from '../data/archiveItems.js'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, top: 88, behavior: 'smooth' }), 120)
      })
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('../views/challenge/CodeChallengeView.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/archive/PracticeArchiveView.vue'),
    },
    {
      path: '/archive/live',
      component: () => import('../views/hands-on/HandsOnLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../legacy/hands-on/App.vue'),
          children: [
            {
              path: '',
              name: 'archive-live',
              component: () => import('../legacy/hands-on/views/WeatherHomeView.vue'),
            },
            {
              path: 'weather/:cityId',
              name: 'archive-live-detail',
              component: () =>
                import('../legacy/hands-on/views/WeatherDetailView.vue'),
            },
            {
              path: 'about',
              name: 'archive-live-about',
              component: () => import('../legacy/hands-on/views/WeatherAboutView.vue'),
            },
            {
              path: 'stats',
              name: 'archive-live-stats',
              component: () => import('../legacy/hands-on/views/WeatherStatsView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/archive/:id',
      redirect: (to) => {
        const item = archiveItems.find((entry) => entry.id === to.params.id)
        return item?.to ?? '/archive'
      },
    },
    { path: '/hands-on', redirect: '/archive/live' },
    {
      path: '/hands-on/weather/:cityId',
      redirect: (to) => `/archive/live/weather/${to.params.cityId}`,
    },
    { path: '/hands-on/about', redirect: '/archive/live/about' },
    { path: '/hands-on/stats', redirect: '/archive/live/stats' },
    { path: '/hands-on/:pathMatch(.*)*', redirect: '/archive' },
  ],
})

export default router
