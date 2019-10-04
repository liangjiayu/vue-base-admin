import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '../layout/layout.vue';

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
  {
    path: '/order',
    component: layout,
    redirect: '/order/search',
    meta: { title: '订单模块' },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('../views/Order/Search/index.vue'),
        meta: { title: '订单搜索' },
      },
      {
        path: 'clothes',
        name: 'clothes',
        component: () => import('../views/Order/Clothes/index.vue'),
        meta: { title: '订单衣服' },
        children: [
          {
            path: 'form',
            name: 'form',
            component: () => import('../views/Order/Clothes/form.vue'),
            meta: { title: '订单衣服表单' },
          },
          {
            path: 'detail',
            name: 'detail',
            component: () => import('../views/Order/Clothes/detail.vue'),
            meta: { title: '订单衣服详情' },
          },
        ],
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
