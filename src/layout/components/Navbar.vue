<template>
  <div class="navbar-wrap-con">
    <el-breadcrumb separator="/" class="navbar-breadcrumb" v-if="breadList">
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path">
        <span v-if="index === breadList.length-1">{{item.meta.title}}</span>
        <router-link v-else :to="item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="navbar-right-box">
      <el-tooltip content="全屏">
        <div class="box" @click="setFullScreen">
          <i class="el-icon-full-screen"></i>
        </div>
      </el-tooltip>

      <el-tooltip class="box" content="布局大小">
        <i class="el-icon-set-up"></i>
      </el-tooltip>

      <el-dropdown trigger="click" class="user-panel-box" size="small">
        <div class="user-panel-btn">
          <img src="https://liangjiayu.github.io/uploads/avatar.png" alt />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
import screenfull from 'screenfull';
import { mapMutations } from 'vuex';

export default {
  name: 'Navbar',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      breadList: null,
    };
  },
  computed: {},
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),

    getBreadcrumb() {
      let breadList = this.$route.matched.filter((item) => {
        if (item.meta && item.meta.title) {
          return true;
        }
      });
      this.breadList = breadList;
    },

    logout() {
      this.setUserInfo(null);
      this.$router.replace('/login');
    },

    setFullScreen() {
      screenfull.toggle();
    },
  },
};
</script>


<style lang="scss" scoped>
.navbar-wrap-con {
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.navbar-breadcrumb {
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}

.navbar-right-box {
  display: block;
  .box {
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
    font-size: 22px;
    height: 100%;
    line-height: 50px;
  }
}

.user-panel-box {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  margin-right: 30px;
  .user-panel-btn {
    position: relative;
    display: block;
    padding: 5px;
    .el-icon-caret-bottom {
      position: absolute;
      right: -10px;
      bottom: 5px;
      font-size: 12px;
    }
    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }
}
</style>