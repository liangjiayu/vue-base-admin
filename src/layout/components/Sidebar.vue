<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wraper">
      <el-menu
        mode="vertical"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        :unique-opened="false"
        :collapse-transition="false"
        :default-active="activeMenu"
      >
        <sidebar-item v-for="item in sideMenuConfig" :key="item.path" :item="item"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script>
import SidebarItem from './SidebarItem';
import { sideMenuConfig } from '@/configs/menu.js';

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  mixins: [],
  props: {},
  data() {
    return {
      sideMenuConfig: sideMenuConfig,
    };
  },
  computed: {
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