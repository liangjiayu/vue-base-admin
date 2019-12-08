import axios from 'axios';
import { showLoading, showToast } from './utils';

const instanceAxios = axios.create({
  baseURL: '/mock/dev-api',
  withCredentials: true,
});

instanceAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 20000) {
      return res;
    } else {
      showToast({
        message: res.message || '服务器错误',
        type: 'error',
      });
      return Promise.reject(res);
    }
  },
  (error) => {
    showToast({
      message: error,
      type: 'error',
    });
    return Promise.reject(error);
  }
);

const request = (option = {}) => {
  let optionDefalut = {
    url: '',
    data: {},
    method: 'post',
    success: (res) => {},
    fail: (error) => {},
  };
  let _option = Object.assign({}, optionDefalut, option);

  let loading = showLoading();

  return new Promise((resolve, reject) => {
    instanceAxios({
      url: _option.url,
      method: _option.method,
      data: _option.data,
    })
      .then((res) => {
        loading.close();
        _option.success(res);
        resolve(res);
      })
      .catch((error) => {
        loading.close();
        _option.fail(error);
        reject(error);
      });
  });
};

export default request;
