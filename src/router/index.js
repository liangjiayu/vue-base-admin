import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
});

export default router;
