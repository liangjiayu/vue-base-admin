import Mock from 'mockjs';

const mockList = [];

for (let index = 0; index < 100; index++) {
  mockList.push(
    Mock.mock({
      id: '@id',
      time: '@date',
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      rank: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft', 'deleted'],
    })
  );
}

export default [
  {
    url: '/table/list',
    type: 'post',
    response: (req, res) => {
      let query = req.body;
      let { pageSize = 10, pageNum = 1 } = query;

      let newsList = mockList.filter((item, index) => {
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
          list: pageList,
          total: mockList.length,
        },
      };
    },
  },
];
