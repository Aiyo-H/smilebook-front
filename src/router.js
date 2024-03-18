import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Wait from './components/WaitActivation.vue'
import Login from './components/Login.vue'
import MainBook from './components/MainBook.vue'
import Logouted from './components/Logouted.vue'
import Mypage from './components/Mypage.vue'
import DetailPage from './components/DetailPage.vue'
import UserPage from './components/UserPage.vue'
import CreateRecipe from './components/CreateRecipe.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      name: 'Home',
      component: Home,
      path: '/'
    },
    {
      name: 'Wait',
      component: Wait,
      path: '/wait'
    },
    {
      name: 'SignUp',
      component: SignUp,
      path: '/sign-up'
    },
    // Add these new routes
    {
      name: 'Login',
      component: Login,
      path: '/login'
    },
    {
      name: 'MainBook',
      component: MainBook,
      path: '/mainbook'
    },
    {
      name: 'Logouted',
      component: Logouted,
      path: '/logouted'
    },
    {
      name: 'Mypage',
      component: Mypage,
      path: '/my-page'
    },
    {
      name: 'DetailPage',
      component: DetailPage,
      path: '/recipes/:id' // Dynamic segment for recipe ID
    },
    {
      name: 'UserPage',
      component: UserPage,
      path: '/user-page/:username' // Dynamic segment for username
    },
    {
      name: 'CreateRecipe',
      component: CreateRecipe,
      path: '/create-recipe' // Dynamic segment for username
    },
  ]

const router=createRouter({
    history:createWebHistory(),
    routes
});

export default router;