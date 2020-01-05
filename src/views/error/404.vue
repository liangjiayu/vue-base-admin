<template>
  <div class="error-root-box">
    <div class="img">
      <img src="./images/404.png" alt />
    </div>
    <div class="info">
      <h3>404</h3>
      <h4>抱歉，你访问的页面不存在</h4>
      <el-button type="primary" size="mini" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-page',
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.error-root-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 500px;
  .img {
    max-width: 260px;
    margin-right: 30px;
    height: auto;
    img {
      display: block;
      width: 100%;
    }
  }
  .info {
    h3 {
      font-size: 30px;
      color: #333;
      margin-bottom: 20px;
    }
    h4 {
      font-size: 20px;
      color: #666;
      margin-bottom: 20px;
    }
  }
}
</style>