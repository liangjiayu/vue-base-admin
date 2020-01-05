<template>
  <div id="app">
    <component :is="LayoutId"></component>
  </div>
</template>

<script>
import layouts from './layout/index.js';

export default {
  name: 'App',
  components: {
    ...layouts,
  },
  data() {
    return {
      LayoutId: 'BlankLayout',
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(route) {
        let layoutId = 'BlankLayout';
        // 获取匹配的路由的布局信息
        for (let index = route.matched.length - 1; index >= 0; index--) {
          let item = route.matched[index];
          if (item.meta && item.meta.layout) {
            layoutId = item.meta.layout;
            break;
          }
        }
        if (route.meta && route.meta.title) {
          document.title = `${route.meta.title}_${this.CONFIG.PROJECT_TITLE}`;
        } else {
          document.title = this.CONFIG.PROJECT_TITLE;
        }
        this.LayoutId = layoutId;
      },
    },
  },
  mounted() {},
};
</script>

<style>
</style>