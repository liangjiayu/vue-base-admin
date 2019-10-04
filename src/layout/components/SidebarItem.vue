<template>
  <div>
    <!-- 只有一级导航 -->
    <template v-if="routerInfoState==='singel'">
      <sidebar-link :link="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <span slot="title">{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </sidebar-link>
    </template>
    <!-- 有二级导航 -->
    <el-submenu v-if="routerInfoState==='multiple'" :index="item.path" popper-append-to-body>
      <template slot="title" v-if="item.meta">
        <span>{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>


<script>
import path from 'path';
import { isExternal } from '@/utils/validate';
import SidebarLink from './SidebarLink';

export default {
  name: 'SidebarItem',
  components: {
    SidebarLink,
  },
  mixins: [],
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      onlyOneChild: null,
      routerInfoState: '', //singel multiple
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.handleInitInfo();
  },
  methods: {
    handleInitInfo() {
      // 思路 需要递归路由信息，当前路由的配置可能会出现多种情况
      // 1.没有children 需要显示当前的路由
      // 2.当前路由children只有一项，并且这一项也没有只子路由
      // 3.children有多项，继续递归路由信息
      let routerItem = this.item;
      if (!routerItem.children) {
        this.onlyOneChild = { ...routerItem, path: '' };
        this.routerInfoState = 'singel';
        return;
      }
      if (
        routerItem.children.length === 1 &&
        !routerItem.children[0].children
      ) {
        this.onlyOneChild = routerItem.children[0];
        this.routerInfoState = 'singel';
        return;
      }

      if (routerItem.children.length === 0) {
        return;
      }

      this.routerInfoState = 'multiple';
    },

    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>


<style lang="scss">
</style>