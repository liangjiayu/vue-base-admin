const sideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'table',
    children: [
      {
        name: '基础表格',
        path: '/table/base',
      },
      {
        name: '通用表格',
        path: '/table/general',
      },
    ],
  },
  {
    name: '列表页',
    path: '/list',
    icon: 'list',
    children: [
      {
        name: '基础列表',
        path: '/list/base',
      },
      {
        name: '基础列表',
        path: '/list/general',
      },
    ],
  },
  {
    name: '新闻',
    path: '/news',
    icon: 'news',
  },
  {
    name: 'example',
    path: '/example',
    children: [
      {
        name: 'exampleCreate',
        path: '/example/create',
      },
      {
        name: 'exampleList',
        path: '/example/list',
      },
    ],
  },
];

export { sideMenuConfig };
