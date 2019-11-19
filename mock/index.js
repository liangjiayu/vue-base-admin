import Mock from 'mockjs';

Mock.mock('http://localhost:8080/goods/list', (params) => {
  return Mock.mock({
    'data|2': [
      //生成100条数据 数组
      {
        'shopId|+1': 1, //生成商品id，自增1
        shopMsg: '@ctitle(10)', //生成商品信息，长度为10个汉字
        shopName: '@cname', //生成商品名 ， 都是中国人的名字
        shopTel: /^1(5|3|7|8)[0-9]{9}$/, //生成随机电话号
        shopAddress: '@county(true)', //随机生成地址
        'shopStar|1-5': '', //随机生成1-5个星星
        'salesVolume|30-1000': 30, //随机生成商品价格 在30-1000之间
        shopLogo: '@Image(‘100x40‘,‘#c33‘, ‘#ffffff‘,‘小北鼻‘)', //生成随机图片，大小/背景色/字体颜色/文字信息
        'food|7': [
          //每个商品中再随机生成七个food
          {
            foodName: '@cname', //food的名字
            foodPic: '@Image(‘100x40‘,‘#c33‘, ‘#ffffff‘,‘小可爱‘)', //生成随机图片，大小/背景色/字体颜色/文字信息
            'foodPrice|1-100': 20, //生成1-100的随机数
            'aname|14': [
              {
                aname: '@cname',
                'aprice|30-60': 20,
              },
            ],
          },
        ],
      },
    ],
  });
});

let newsListMock = Mock.mock({
  'record|100': [
    {
      'id|+1': 1,
      title: '@ctitle(10,20)',
      author: '@cname()',
      date: '@date()',
    },
  ],
}).record;

Mock.mock('http://localhost:8080/news/list', (params) => {
  let query = JSON.parse(params.body);

  let { pageSize = 10, pageNum = 1 } = query;

  let newsList = newsListMock.filter((item, index) => {
    if (query.id && query.id !== item.id) {
      return false;
    }
    if (query.date && query.date !== item.date) {
      return false;
    }
    if (query.author && query.author !== item.author) {
      return false;
    }
    return true;
  });

  let pageList = newsList.filter((item, index) => {
    if ((pageNum - 1) * pageSize <= index && pageNum * pageSize > index) {
      return true;
    }
  });

  return {
    code: 20000,
    data: {
      record: pageList,
      total: newsList.length,
    },
  };
});

Mock.mock('http://localhost:8080/news/add', (params) => {
  let query = JSON.parse(params.body);
  let id = newsListMock.length + 1;

  newsListMock.unshift({
    id: id,
    ...query,
  });

  return {
    code: 20000,
    data: {},
  };
});
