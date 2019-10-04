import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '../layout/layout.vue';

const baseRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        meta: { title: '首页' },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login/index.vue'),
    hidden: true,
  },
  {
    path: '/tree',
    component: layout,
    redirect: '/tree/menu1',
    meta: { title: '多级菜单' },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('../views/Tree/Menu1/index.vue'),
        meta: { title: '菜单1' },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            component: () => import('../views/Tree/Menu1/Menu1-1/index.vue'),
            meta: { title: '菜单1-1' },
          },
          {
            path: 'menu1-2',
            name: 'Menu1-2',
            component: () => import('../views/Tree/Menu1/Menu1-2/index.vue'),
            meta: { title: '菜单1-2' },
          },
          {
            path: 'menu1-3',
            name: 'Menu1-3',
            component: () => import('../views/Tree/Menu1/Menu1-3/index.vue'),
            meta: { title: '菜单1-3' },
            hidden: true,
          },
        ],
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('../views/Tree/Menu2/index.vue'),
        meta: { title: '菜单2' },
      },
    ],
  },
];

const createRouter = () => {
  return new VueRouter({
    routes: baseRoutes,
  });
};

const router = createRouter();

export default router;
