import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '../layout/layout.vue';
import BlankLayout from '../layout/BlankLayout.vue';

// router modules
import exampleRouter from './modules/example';

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
  view('/login', BlankLayout, { title: '登录模块' }, [
    //
    view('login', () => import('../views/login/login.vue'), { title: '登录模块-登录' }),
    view('register', () => import('../views/login/register.vue'), { title: '登录模块-注册' }),
  ]),
];

const router = new VueRouter({
  routes: baseRoutes,
});

export default router;
