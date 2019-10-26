import { requestPost } from './request';

export function fetchGoods(params) {
  return requestPost({
    url: '/goods/list',
    params: params,
  });
}
