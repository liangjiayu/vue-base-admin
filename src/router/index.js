// ***  vue的路由配置文件 ***
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import BlankLayout from '../layout/BlankLayout.vue';

// let view = (path = '', component, meta = {}, children = []) => {
//   let redirect = '';
//   if (meta && meta.redirect) {
//     redirect = meta.redirect;
//   }
//   return {
//     path: path,
//     component: component,
//     meta: meta,
//     redirect: redirect,
//     children: children,
//   };
// };

/**
 * path                           url
 * component                      () => import('../views/login/login.vue')
 * redirect: redirect             redirect
 * name:'router-name'             name
 * meta : {
    layout                       布局名称
    title: 'title'               页面标题
    permission: {}               权限信息
  }
 */

const baseRoutes = [
  {
    path: '/login',
    component: BlankLayout,
    meta: {
      title: '登录模块',
      layout: 'BlankLayout',
      permission: { auth: false },
    },
    children: [
      {
        path: '',
        component: () => import('../views/login/login.vue'),
      },
    ],
  },

  {
    path: '/',
    component: BlankLayout,
    redirect: '/home',
    meta: {
      title: '首页模块',
      layout: 'PanelLayout',
      permission: { auth: true },
    },
    children: [
      {
        path: 'home',
        component: () => import('../views/home/home.vue'),
      },
    ],
  },

  {
    path: '/permission',
    component: BlankLayout,
    redirect: '/permission/role',
    meta: {
      title: '权限管理',
      layout: 'PanelLayout',
      permission: { auth: true },
    },
    children: [
      {
        path: 'role',
        component: () => import('../views/permission/role.vue'),
      },
    ],
  },

  {
    path: '/table',
    component: BlankLayout,
    redirect: '/table/complex-table',
    meta: {
      title: '表格',
      layout: 'PanelLayout',
      permission: { auth: true },
    },
    children: [
      {
        path: 'complex-table',
        component: () => import('../views/table/complex-table.vue'),
      },
      {
        path: 'drag-table',
        component: () => import('../views/table/drag-table.vue'),
      },
      {
        path: 'edit-table',
        component: () => import('../views/table/edit-table.vue'),
      },
    ],
  },

  {
    path: '/error',
    component: BlankLayout,
    redirect: '/error/404',
    meta: {
      title: '异常',
      layout: 'PanelLayout',
      // permission: { auth: true },
    },
    children: [
      {
        path: '204',
        component: () => import('../views/error/204.vue'),
      },
      {
        path: '403',
        component: () => import('../views/error/403.vue'),
      },
      {
        path: '404',
        component: () => import('../views/error/404.vue'),
      },
      {
        path: '500',
        component: () => import('../views/error/500.vue'),
      },
    ],
  },

  {
    path: '*',
    redirect: '/error/404',
  },
];

const router = new VueRouter({
  routes: baseRoutes,
});

export default router;
