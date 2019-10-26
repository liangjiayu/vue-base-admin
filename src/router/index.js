import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '../layout/layout.vue';

// router modules
import exampleRouter from './modules/example';

const baseRoutes = [
  {
    path: '/login',
    component: () => import('../views/Login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home/home.vue'),
        meta: { title: '首页' },
      },
    ],
  },
  exampleRouter,
];

const createRouter = () => {
  return new VueRouter({
    routes: baseRoutes,
  });
};

const router = createRouter();

export default router;
