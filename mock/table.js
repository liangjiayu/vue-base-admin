import Mock from 'mockjs';

let mockList = [];

for (let index = 0; index < 100; index++) {
  mockList.push(
    Mock.mock({
      id: index + 1,
      time: '@date',
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      rank: '@integer(1, 3)',
      'type|1': ['CHINA', 'USA', 'JAPAN'],
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
        if (query.date && query.date !== item.date) {
          return false;
        }
        if (query.author && !item.author.includes(query.author)) {
          return false;
        }
        if (query.rank && query.rank !== item.rank) {
          return false;
        }
        if (query.type && query.type !== item.type) {
          return false;
        }
        if (query.status && query.status !== item.status) {
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
          total: newsList.length,
        },
      };
    },
  },
  {
    url: '/table/create',
    type: 'post',
    response: (req, res) => {
      let body = req.body;
      mockList.unshift({
        id: mockList.length + 1,
        ...body,
      });
      return {
        code: 20000,
        data: body,
      };
    },
  },
  {
    url: '/table/delete',
    type: 'post',
    response: (req, res) => {
      let id = req.body.id;
      if (!id) {
        return;
      }
      mockList = mockList.filter((item) => {
        if (item.id !== id) {
          return true;
        }
      });
      return {
        code: 20000,
        data: {},
      };
    },
  },
  {
    url: '/table/update',
    type: 'post',
    response: (req, res) => {
      let id = req.body.id;
      if (!id) {
        return;
      }
      mockList.map((item, index) => {
        if (item.id === id) {
          mockList[index] = {
            ...req.body,
          };
        }
      });
      return {
        code: 20000,
        data: {},
      };
    },
  },
];
