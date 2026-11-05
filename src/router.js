import { createRouter, createWebHistory } from 'vue-router'
import DesignPreview from './previews/DesignPreview.vue'

const routes = [
  {
    path: '/preview/:style(editorial|studio|workshop)',
    component: DesignPreview,
  },
  {
    path: '/',
    name: 'home',
    component: DesignPreview,
  },
  {
    path: '/preview/original',
    name: 'original',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/uses',
    name: 'uses',
    component: () => import('./pages/UsesPage.vue'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('./pages/PersonalPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
