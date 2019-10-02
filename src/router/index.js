import Vue from 'vue';
import VueRouter from 'vue-router';

import layout from '../layout/layout.vue';
import Home from '../views/Home/Home.vue';

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: 'Home', icon: 'Home' },
      },
    ],
  },
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
});

export default router;
