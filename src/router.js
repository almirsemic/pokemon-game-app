import VueRouter from 'vue-router'
import Vue from 'vue'
import GamePage from './components/GamePage.vue'
import HomePage from './components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/game',
    component: GamePage,
  },
  {
    path: '/',
    component: HomePage,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
