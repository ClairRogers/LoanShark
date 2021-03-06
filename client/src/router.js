import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Messages from './views/Messages.vue'
import Contacts from './views/Contacts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile/:profileId',
      name: 'profile',
      props: true,
      component: Profile
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }
  ]
})
