<template>
  <div>
    <!-- 只有一级导航 -->
    <template v-if="routerInfoState==='singel'">
      <el-menu-item :index="onlyOneChild.path">
        <span slot="title">{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </template>
    <!-- 有二级导航 -->
    <el-submenu v-if="routerInfoState==='multiple'" :index="item.path" popper-append-to-body>
      <template slot="title" v-if="item.meta">
        <span>{{item.meta.title}}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child"></sidebar-item>
    </el-submenu>
  </div>
</template>


<script>
export default {
  name: "SidebarItem",
  components: {},
  mixins: [],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onlyOneChild: null,
      routerInfoState: "" //singel multiple
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
        this.onlyOneChild = { ...routerItem };
        this.routerInfoState = "singel";
        return;
      }
      if (routerItem.children.length === 1 && !routerItem.children[0].children) {
        this.onlyOneChild = routerItem.children[0];
        this.routerInfoState = "singel";
        return;
      }

      if (routerItem.children.length === 0) {
        return;
      }

      this.routerInfoState = "multiple";
    }
  }
};
</script>


<style lang="scss">
</style>