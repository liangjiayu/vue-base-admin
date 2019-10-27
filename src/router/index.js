import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '../layout/layout.vue';

// router modules
import exampleRouter from './modules/example';

const baseRoutes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
  },

  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/home.vue'),
      },
    ],
  },

  {
    path: '/list',
    component: layout,
    children: [
      {
        path: 'base',
        name: 'baseList',
        component: () => import('../views/list/baseList.vue'),
      },
      {
        path: 'general',
        name: 'generalList',
        component: () => import('../views/list/generalList.vue'),
      },
    ],
  },

  {
    path: '/news',
    component: layout,
    redirect: '/news/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/news/list.vue'),
      },
    ],
  },

  {
    path: '/table',
    component: layout,
    children: [
      {
        path: 'base',
        name: 'baseTable',
        component: () => import('../views/table/baseTable.vue'),
      },
      {
        path: 'general',
        name: 'generalTable',
        component: () => import('../views/table/generalTable.vue'),
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
