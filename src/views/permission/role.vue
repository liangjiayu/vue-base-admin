<template>
  <div>
    <div class="app-base-container">
      <el-button type="primary" @click="handleAddRole">添加</el-button>

      <el-table :data="roleList" border style="width: 100%;margin-top:30px;">
        <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="description" label="角色描述"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增角色" :visible.sync="dialogVisible">
        <el-form label-width="80px" label-position="left" :model="roleForm">
          <el-form-item label="名称">
            <el-input type="text" placeholder="请输入内容" v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" placeholder="请输入内容" v-model="roleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="菜单">
            <el-tree
              ref="roleTree"
              :data="routesData"
              show-checkbox
              default-expand-all
              :props="{children: 'children',label: 'name'}"
              node-key="path"
            ></el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmRole">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import _ from 'lodash';
import routesData from '@/configs/menu.js';

// 以下的方法是模仿数据库的操作
let getRoles = () => {
  let roleList = window._Storage.get('roleList', []);
  return _.cloneDeep(roleList);
};

let getRoleById = (id) => {
  let roleList = window._Storage.get('roleList', []);
  let item = roleList.find((item) => {
    return item.id === id;
  });
  return _.cloneDeep(item);
};

let addRole = (role = {}) => {
  let roleList = window._Storage.get('roleList', []);
  roleList.push(role);

  window._Storage.set('roleList', roleList);
};

let updateRole = (role = {}) => {
  let roleList = window._Storage.get('roleList', []);
  roleList = roleList.map((item) => {
    if (item.id === role.id) {
      item = role;
    }
    return item;
  });

  window._Storage.set('roleList', roleList);
};

let deleteRole = (id) => {
  let roleList = window._Storage.get('roleList', []);
  roleList = roleList.filter((value) => {
    return value.id !== id;
  });

  window._Storage.set('roleList', roleList);
};

const defaultRoleForm = {
  id: '',
  name: '',
  description: '',
  routes: null,
  checkedNodes: [],
};

export default {
  name: 'role',
  components: {},
  data() {
    return {
      roleList: [],
      roleForm: { ...defaultRoleForm },
      routesData: routesData,
      dialogVisible: false,
      dialogType: 'add',
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getRolesList();
  },
  methods: {
    getRolesList() {
      this.roleList = getRoles();
    },

    handleAddRole() {
      this.roleForm = { ...defaultRoleForm };
      this.dialogType = 'add';
      if (this.$refs.roleTree) {
        this.$refs.roleTree.setCheckedNodes([]);
      }
      this.dialogVisible = true;
    },

    handleEdit(row) {
      let item = getRoleById(row.id);
      this.dialogVisible = true;
      this.roleForm = item;
      this.dialogType = 'edit';

      this.$nextTick(() => {
        this.$refs.roleTree.setCheckedNodes(item.checkedNodes);
      });
    },

    handleDelete(row) {
      deleteRole(row.id);
      this.getRolesList();
    },

    confirmRole() {
      let checkedKeys = this.$refs.roleTree.getCheckedKeys();
      let checkedNodes = this.$refs.roleTree.getCheckedNodes();
      this.roleForm.routes = this.generateTree(_.cloneDeep(this.routesData), checkedKeys);
      this.roleForm.checkedNodes = checkedNodes;

      if (this.dialogType === 'add') {
        this.roleForm.id = new Date().getTime();
        addRole(this.roleForm);
      }

      if (this.dialogType === 'edit') {
        updateRole(this.roleForm);
      }
      this.dialogVisible = false;
      this.getRolesList();
    },

    generateTree(routes, checkedKeys) {
      let res = [];
      for (let route of routes) {
        if (route.children) {
          route.children = this.generateTree(route.children, checkedKeys);
        }
        if (checkedKeys.includes(route.path) || (route.children && route.children.length >= 1)) {
          res.push(route);
        }
      }
      return res;
    },
  },
};
</script>


<style lang="scss" scoped>
</style>