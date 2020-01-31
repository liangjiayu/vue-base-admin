<template>
  <div>
    <div class="app-base-container">
      <div class="filter-container">
        <el-input class="filter-item" placeholder="标题" style="width:200px;margin-right:10px;"></el-input>
        <!-- <el-select class="filter-item" placeholder="等级" style="width:100px;margin-right:10px;">
          <el-option v-for="item in [1,2,3]" :key="item" :label="item" :value="item"></el-option>
        </el-select>-->
        <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-edit">添加</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-download">导出</el-button>
      </div>

      <el-table :data="tableData.list" border style="width: 100%">
        <el-table-column prop="id" label="id" width="160"></el-table-column>
        <el-table-column prop="time" label="日期" width="100"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者" width="100"></el-table-column>
        <el-table-column prop="rank" label="等级" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column label="操作" width="240"></el-table-column>
      </el-table>

      <el-pagination
        class="app-base-pager"
        background
        @current-change="changePager"
        :total="tableData.total"
        :page-size="tableQuery.pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'complex-table',
  data() {
    return {
      tableData: {
        list: [],
        total: 0,
      },
      tableQuery: {
        pageSize: 15,
        pageNum: 1,
      },
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.JY.request({
        url: '/table/list',
        data: this.tableQuery,
      }).then((res) => {
        this.tableData.list = res.data.list;
        this.tableData.total = res.data.total;
      });
    },

    changePager(i) {
      this.tableQuery.pageNum = i;
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  margin-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 10px;
  }
}
</style>