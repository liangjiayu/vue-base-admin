import { requestPost } from './request';

export function fetchGoods(data) {
  return requestPost({
    url: '/goods/list',
    data: data,
  });
}
