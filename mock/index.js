import Mock from 'mockjs';

const mocks = [
  {
    url: '/goods/list',
    type: 'post',
    response: (req, res) => {
      return {
        code: 30000,
        data: ['aaa', 'bbb'],
      };
    },
  },
  {
    url: '/goods/detail',
    type: 'post',
    response: (req, res) => {
      return {
        code: 20000,
        data: ['cccc', 'dddd'],
      };
    },
  },
];

const fakeResponse = (url, type, response) => {
  return {
    url: `/mock/dev-api${url}`,
    type: type || 'post',
    response: (req, res) => {
      res.json(response(req, res));
    },
  };
};

export default mocks.map((item) => {
  return fakeResponse(item.url, item.type, item.response);
});
