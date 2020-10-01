import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Locations from '../components/Locations.vue'
import Character from '../components/Character.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'locations',
    component: Locations
  },
  {
    path: '/character/:id',
    name: 'character',
    component: Character
  }
]

const router = new VueRouter({
  routes
})

export default router
