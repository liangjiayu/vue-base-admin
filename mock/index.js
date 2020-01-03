import Mock from 'mockjs';
import user from './user';

const mocks = [...user];

const fakeResponse = (url, type, response) => {
  return {
    url: `/mock/dev-api${url}`,
    type: type || 'post',
    response: (req, res) => {
      // 异步延迟模拟
      setTimeout(() => {
        res.json(response(req, res));
      }, 1000);
    },
  };
};

export default mocks.map((item) => {
  return fakeResponse(item.url, item.type, item.response);
});
