const sideMenuConfig = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '新闻',
    path: '/news',
    children: [
      {
        name: '新闻-列表',
        path: '/news/list',
      },
      {
        name: '新闻-新建',
        path: '/news/create',
      },
    ],
  },
];

export { sideMenuConfig };
