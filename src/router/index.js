// ***  vue的路由配置文件 ***
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import BlankLayout from '../layout/BlankLayout.vue';

let view = (path = '', component, meta = {}, children = []) => {
  let redirect = '';
  if (meta && meta.redirect) {
    redirect = meta.redirect;
  }
  return {
    path: path,
    component: component,
    meta: meta,
    redirect: redirect,
    children: children,
  };
};

const baseRoutes = [
  view('/login', BlankLayout, { title: '登录模块', permission: { auth: false } }, [
    view('', () => import('../views/login/login.vue'), { title: '登录模块-登录' }),
  ]),

  view('/', BlankLayout, { title: '首页', redirect: '/home', layout: 'PanelLayout' }, [
    view('home', () => import('../views/home/home.vue'), { title: '首页模块-首页' }),
    view('home-1', () => import('../views/home/home.vue'), {
      title: '首页模块-首页',
      permission: { auth: true, role: 'member' },
    }),
  ]),

  view('/permission', BlankLayout, { title: '权限管理', redirect: '/permission/role', layout: 'PanelLayout' }, [
    view('role', () => import('../views/permission/role.vue'), { title: '权限管理-角色管理' }),
  ]),

  view('/table', BlankLayout, { title: '表格', redirect: '/table/complex-table', layout: 'PanelLayout' }, [
    view('complex-table', () => import('../views/table/complex-table.vue'), { title: '综合表格' }),
    view('drag-table', () => import('../views/table/drag-table.vue'), { title: '拖拽表格' }),
    view('edit-table', () => import('../views/table/edit-table.vue'), { title: '编辑表格' }),
  ]),

  view('/error', BlankLayout, { title: '异常', redirect: '/error/404', layout: 'PanelLayout' }, [
    view('204', () => import('../views/error/204.vue'), { title: '204' }),
    view('403', () => import('../views/error/403.vue'), { title: '403' }),
    view('404', () => import('../views/error/404.vue'), { title: '404' }),
    view('500', () => import('../views/error/500.vue'), { title: '500' }),
  ]),

  view('*', BlankLayout, { title: '404', redirect: '/error/404', layout: 'PanelLayout' }),
];

const router = new VueRouter({
  routes: baseRoutes,
});

export default router;
