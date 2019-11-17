<template>
  <div>
    <div class="app-base-container">
      <div class="app-base-title">新闻列表</div>

      <el-table :data="newsData.list" :border="true">
        <el-table-column prop="id" label="ID" width="90"></el-table-column>
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="author" label="作者" width="120"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-button size="mini" @click="onEdit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :total="newsData.total"
        @current-change="nextList"
        class="app-base-pager"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsList',
  components: {},
  data() {
    return {
      newsData: {
        list: [],
        total: 10,
      },
      newsParams: {
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.resetList();
  },
  methods: {
    resetList() {
      this.newsParams.pageNum = 1;
      this.newsParams.pageSize = 10;
      this.nextList(1);
    },

    nextList(num) {
      this.newsParams.pageNum = num;
      this.$requestPost({
        url: '/news/list',
        data: this.newsParams,
      }).then((res) => {
        this.newsData.list = res.data.record;
        this.newsData.total = res.data.total;
      });
    },

    onEdit(item) {
      console.log(item);
    },

    onDelete(item) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
        type: 'warning',
      }).then(
        () => {
          this.newsData.list.splice(item.$index, 1);
        },
        () => {}
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>