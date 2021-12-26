import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: () => import(/* webpackChunkName: "connexion" */ '../views/Connexion.vue')
  },
  {
    path: '/signup',
    name: 'Inscription',
    component: () => import(/* webpackChunkName: "inscription" */ '../views/Inscription.vue')
  },
  {
    path: '/home',
    name: 'Accueil',
    component: () => import(/* webpackChunkName: "accueil" */ '../views/Accueil.vue')
  },
  {
    path: '/profile',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "profil" */ '../views/Profil.vue')
  },
  {
    path: '/profile/update',
    name: 'ChangeProfil',
    component: () => import(/* webpackChunkName: "profileUpdate" */ '../views/ProfileUpdate.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
