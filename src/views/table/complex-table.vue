<template>
  <div>
    <div class="app-base-container">
      <div class="filter-container">
        <el-date-picker
          v-model="tableQuery.date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          class="filter-item"
        ></el-date-picker>
        <el-input
          v-model="tableQuery.author"
          placeholder="作者名称"
          style="width:200px;"
          class="filter-item"
        ></el-input>
        <el-select
          v-model="tableQuery.rank"
          class="filter-item"
          placeholder="等级"
          style="width:100px;"
          clearable
        >
          <el-option v-for="item in [1,2,3]" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select
          v-model="tableQuery.type"
          class="filter-item"
          placeholder="类型"
          style="width:100px;"
          clearable
        >
          <el-option v-for="item in tableDataType" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select
          v-model="tableQuery.status"
          class="filter-item"
          placeholder="状态"
          style="width:100px;"
          clearable
        >
          <el-option v-for="item in tableDataStatus" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="resetTableData">重置</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
      </div>

      <el-table :data="tableData.list" border v-loading="tableLoading">
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
        <el-table-column label="操作" width="240" align="center" v-slot="{row}">
          <template>
            <el-button type="primary" @click="handleUpdate(row)">编辑</el-button>
            <el-button type="success">发布</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加编辑弹窗 -->
      <el-dialog title="新增数据" :visible.sync="dialogFormVisible">
        <el-form
          ref="dialogForm"
          :model="dialogFormData"
          :rules="dialogFormRules"
          label-width="80px"
          style="width:450px;"
        >
          <el-form-item label="日期" prop="time">
            <el-date-picker
              v-model="dialogFormData.time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="dialogFormData.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="dialogFormData.author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select placeholder="type" v-model="dialogFormData.type">
              <el-option v-for="i in tableDataType" :key="i" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="rank">
            <el-rate v-model="dialogFormData.rank" :max="3" style="margin-top:6px;" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select placeholder="status" v-model="dialogFormData.status">
              <el-option v-for="i in tableDataStatus" :key="i" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDialogForm">确定</el-button>
        </div>
      </el-dialog>

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
// 基础的列表页面，功能包括 增删改查
export default {
  name: 'complex-table',
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

      dialogFormVisible: false,
      dialogFormType: 'create', // create update
      dialogFormRules: {
        time: [{ required: true, trigger: 'change' }],
        title: [{ required: true, trigger: 'change' }],
        author: [{ required: true, trigger: 'change' }],
        type: [{ required: true, trigger: 'change' }],
        status: [{ required: true, trigger: 'change' }],
      },
      dialogFormData: {
        id: undefined,
        time: '',
        title: '',
        author: '',
        type: '',
        rank: 1,
        status: '',
      },
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      this.axios.post('/table/list', this.tableQuery).then((res) => {
        this.tableLoading = false;
        this.tableData.list = res.list;
        this.tableData.total = res.total;
      });
    },

    resetTableData() {
      this.tableQuery = {
        pageSize: 15,
        pageNum: 1,
        date: '',
        author: '',
        type: '',
        rank: '',
        status: '',
      };
      this.getTableData();
    },

    changePager(i) {
      this.tableQuery.pageNum = i;
      this.getTableData();
    },

    handleDelete(row) {
      this.$confirm('是否要删除该数据?', '提示', {}).then(
        () => {
          this.axios.post('/table/delete', { id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getTableData();
          });
        },
        () => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        }
      );
    },

    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogFormType = 'create';
      this.dialogFormData = {
        id: undefined,
        time: '',
        title: '',
        author: '',
        type: '',
        rank: 1,
        status: '',
      };
    },

    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogFormType = 'update';
      this.dialogFormData = { ...row };
    },

    confirmDialogForm() {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          let postUrl = '';
          if (this.dialogFormType === 'create') {
            postUrl = '/table/create';
          }
          if (this.dialogFormType === 'update') {
            postUrl = '/table/update';
          }
          this.axios.post(postUrl, this.dialogFormData).then(() => {
            this.dialogFormVisible = false;
            this.getTableData();
          });
        }
      });
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
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>