<template>
  <div>
    <!-- 只有一级导航 -->
    <template v-if="routerInfoState==='singel'">
      <sidebar-link :link="onlyOneChild.path">
        <el-menu-item :index="onlyOneChild.path">
          <span v-if="onlyOneChild.icon" :class="[`jy-icon-${onlyOneChild.icon}`]"></span>
          <span slot="title">{{onlyOneChild.name}}</span>
        </el-menu-item>
      </sidebar-link>
    </template>

    <!-- 有二级导航 -->
    <template v-if="routerInfoState==='multiple'">
      <el-submenu :index="item.path" popper-append-to-body>
        <template slot="title" v-if="item.name">
          <span v-if="item.icon" :class="[`jy-icon-${item.icon}`]"></span>
          <span>{{item.name}}</span>
        </template>
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child"></sidebar-item>
      </el-submenu>
    </template>
  </div>
</template>


<script>
// import path from 'path';
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
        this.onlyOneChild = routerItem;
        this.routerInfoState = 'singel';
        return;
      }

      if (routerItem.children.length === 0) {
        this.onlyOneChild = routerItem;
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

      this.routerInfoState = 'multiple';
    },
  },
};
</script>


<style lang="scss">
</style>