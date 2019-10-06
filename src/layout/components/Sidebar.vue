<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wraper">
      <el-menu
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :unique-opened="false"
        :collapse-transition="false"
        :default-active="activeMenu"
      >
        <sidebar-item
          v-for="item in baseRoutes"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script>
import SidebarItem from './SidebarItem';

// 递归过滤需要隐藏的菜单选项
function filterHidden(routes) {
  let handleChildren = (data) => {
    return data.filter((item) => {
      if (item.children) {
        item.children = handleChildren(item.children);
      }
      if (!item.hidden) {
        return true;
      }
    });
  };

  return handleChildren(routes);
}

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    baseRoutes() {
      let showRoutes = filterHidden(this.$router.options.routes);
      if (!showRoutes) {
        return [];
      }
      return showRoutes;
    },
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>


<style lang="scss">
</style>