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
  view('/login', BlankLayout, { title: '登录模块', redirect: '/login/login' }, [
    view('login', () => import('../views/login/login.vue'), { title: '登录模块-登录' }),
  ]),
  view('/', BlankLayout, { title: '首页', redirect: '/home', layout: 'PanelLayout' }, [
    view('home', () => import('../views/home/home.vue'), { title: '首页模块-首页' }),
  ]),
];

const router = new VueRouter({
  routes: baseRoutes,
});

export default router;
