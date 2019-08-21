import Cookie from 'js-cookie';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const isUserLoggedIn = () => typeof Cookie.get('ASID') === 'string';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (isUserLoggedIn()) {
          next('/players');
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('./views/Players.vue'),
      beforeEnter: (to, from, next) => {
        if (!isUserLoggedIn()) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('./views/Board.vue'),
      beforeEnter: (to, from, next) => {
        if (!isUserLoggedIn()) {
          next('/');
        } else {
          next();
        }
      },
    },
  ],
});
