<template>
  <div>
    <div class="app-base-container">
      <div class="app-base-title">
        <span>新闻列表</span>
        <div class="right-inner">
          <el-button type="primary" @click="addNewsFormVisible = true">添加</el-button>
        </div>
      </div>

      <el-form :inline="true" :model="fliterParams">
        <el-form-item label="ID">
          <el-input v-model.number="fliterParams.id" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="fliterParams.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="fliterParams.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetList">重置</el-button>
          <el-button type="primary" @click="onFliter">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="newsData.list" :border="true">
        <el-table-column prop="id" label="ID" width="90"></el-table-column>
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="author" label="作者" width="120"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-button type="text" @click="onEdit(scope)">编辑</el-button>
            <el-button type="text" @click="onDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :total="newsData.total"
        @current-change="changePager"
        class="app-base-pager"
      ></el-pagination>
    </div>

    <el-dialog title="添加文章" :visible.sync="addNewsFormVisible">
      <el-form
        :model="addNewsForm"
        :rules="rules"
        label-width="80px"
        style="width:500px;"
        ref="newsForm"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="addNewsForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="addNewsForm.author"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="addNewsForm.title" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewsFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onAddNews">确定</el-button>
      </div>
    </el-dialog>
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
      fliterParams: {
        id: '',
        date: '',
        author: '',
      },
      addNewsForm: {
        date: '',
        author: '',
        title: '',
      },
      addNewsFormVisible: false,
      rules: {
        date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
        ],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
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
      this.fliterParams.id = '';
      this.fliterParams.date = '';
      this.fliterParams.author = '';
      this.onFliter();
    },

    changePager(num) {
      this.newsParams.pageNum = num;
      this.nextList();
    },

    nextList() {
      this.$requestPost({
        url: '/news/list',
        data: this.newsParams,
      }).then((res) => {
        this.newsData.list = res.data.record;
        this.newsData.total = res.data.total;
      });
    },

    onFliter() {
      this.newsParams = Object.assign({}, this.newsParams, this.fliterParams);
      this.nextList();
    },

    onEdit(item) {
      this.$router.push({
        path: 'detail',
        query: {
          id: item.row.id,
        },
      });
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

    onAddNews() {
      this.$refs['newsForm'].validate((valid) => {
        if (valid) {
          this.$requestPost({
            url: '/news/add',
            data: this.addNewsForm,
          }).then((res) => {
            this.addNewsFormVisible = false;
            this.resetList();
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>