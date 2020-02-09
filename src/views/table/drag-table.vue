<template>
  <div>
    <div class="app-base-container">
      <el-table :data="tableData.list" border v-loading="tableLoading" row-key="id" id="drag-table">
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="time" label="日期" width="120"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者" width="100"></el-table-column>
        <el-table-column prop="rank" label="等级" width="100" v-slot="{row}">
          <template>
            <i class="el-icon-star-on" v-for="i in row.rank" :key="i"></i>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100" v-slot="{row}">
          <el-tag>{{row.type}}</el-tag>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" v-slot="{row}">
          <template>
            <el-tag v-if="row.status==='published'" type="success">{{row.status}}</el-tag>
            <el-tag v-if="row.status==='draft'" type="info">{{row.status}}</el-tag>
            <el-tag v-if="row.status==='deleted'" type="danger">{{row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center">移动</el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: 'drag-table',
  data() {
    return {
      tableData: {
        list: [],
        total: 0,
      },
      tableLoading: false,
      tableQuery: {
        pageSize: 15,
        pageNum: 1,
        date: '',
        author: '',
        type: '',
        rank: '',
        status: '',
      },
      tableDataType: ['CHINA', 'USA', 'JAPAN'],
      tableDataStatus: ['published', 'draft', 'deleted'],

      sortable: null,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      this.JY.request({
        url: '/table/list',
        data: this.tableQuery,
        hideLoading: true,
      }).then((res) => {
        this.tableLoading = false;
        this.tableData.list = res.data.list;
        this.tableData.total = res.data.total;
        this.$nextTick(() => {
          this.sortInit();
        });
      });
    },

    sortInit() {
      const el = document.querySelectorAll('#drag-table tbody')[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '');
        },
        onEnd: (evt) => {
          const targetRow = this.tableData.list.splice(evt.oldIndex, 1)[0];
          this.tableData.list.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
  },
};
</script>


<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
</style>