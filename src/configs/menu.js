const sideMenuConfig = [
  {
    name: '首页',
    path: '/',
    children: [
      {
        name: '分析页',
        path: '/home',
        children: [
          {
            name: '分析页-home1',
            path: '/home/home1',
          },
          {
            name: '分析页-home2',
            path: '/home/home2',
          },
        ],
      },
      {
        name: '监控页',
        path: '/monitor',
      },
      {
        name: '工作台',
        path: '/workplace',
      },
    ],
  },
  {
    name: '表单页',
    path: '/form',
    children: [
      {
        name: '基础表单',
        path: '/form/basic-form',
      },
      {
        name: '分步表单',
        path: '/form/step-form',
      },
      {
        name: '高级表单',
        path: '/form/advanced-form',
      },
    ],
  },
  {
    name: '详情页',
    path: '/profile',
    children: [
      {
        name: '基础详情页',
        path: '/profile/basic',
      },
      {
        name: '高级详情页',
        path: '/profile/advanced',
      },
    ],
  },
  {
    name: '权限管理',
    path: '/permission',
    children: [
      {
        name: '角色管理',
        path: '/permission/role',
      },
    ],
  },
  {
    name: '表格',
    path: '/table',
    children: [
      {
        name: '综合表格',
        path: '/table/complex-table',
      },
      {
        name: '编辑表格',
        path: '/table/edit-table',
      },
    ],
  },
];

export { sideMenuConfig };

export default sideMenuConfig;
