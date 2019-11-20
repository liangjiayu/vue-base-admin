import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '../layout/layout.vue';

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
  view('/login', () => import('../views/login/index.vue'), { title: '登录' }),
  view('/news', layout, {}, [
    // 新闻模块
    view('list', () => import('../views/news/list.vue'), { title: '新闻-列表' }),
  ]),
];

const router = new VueRouter({
  routes: baseRoutes,
});

export default router;
