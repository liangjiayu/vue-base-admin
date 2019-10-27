<template>
  <div>
    <div class="app-base-container">
      <div class="app-base-title">新闻列表</div>
      <el-table :data="tableData" :border="true">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  components: {},
  data() {
    return {
      tableData: [
        {
          id: '10',
          date: '2016-05-02',
          author: '王小虎',
          title: '双十一如何购买商品最优惠',
        },
        {
          id: '11',
          date: '2016-05-02',
          author: '王小虎',
          title: '双十一如何购买商品最优惠',
        },
        {
          id: '12',
          date: '2016-05-02',
          author: '王小虎',
          title: '双十一如何购买商品最优惠',
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onEdit(item) {
      console.log(item);
    },
    onDelete(item) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
        type: 'warning',
      }).then(() => {
        this.tableData.splice(item.$index, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>