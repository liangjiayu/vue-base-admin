import axios from 'axios';
import { CONFIG } from '../configs/index';
import { showLoading, showToast, validator } from './utils';

const instanceAxios = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
});

// errors type  1000验证  2000后端程序错误  4000网络错误
instanceAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject({ type: 4000, data: error });
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
      return Promise.reject({ type: 2000, data: res });
    }
  },
  (error) => {
    showToast({
      message: error,
      type: 'error',
    });
    return Promise.reject({ type: 4000, data: error });
  }
);

const request = async (option = {}) => {
  let optionDefalut = {
    url: '',
    data: {},
    method: 'post',
    hideLoading: false,
    success: () => {},
    fail: () => {},
    validator: {},
  };
  let _option = Object.assign({}, optionDefalut, option);

  let loading = {};
  if (!_option.hideLoading) {
    loading = showLoading();
  }

  let canEmit = true;

  if (Object.keys(_option.validator).length > 0) {
    await validator(_option.data, _option.validator)
      .then(() => {
        canEmit = true;
      })
      .catch(({ errors, fields }) => {
        if (!_option.hideLoading) {
          loading.close();
        }
        canEmit = false;
        showToast({
          message: errors[0].message,
          type: 'error',
        });
        return Promise.reject({ type: 1000, data: { errors, fields } });
      });
  }

  if (canEmit) {
    return new Promise((resolve, reject) => {
      instanceAxios({
        url: _option.url,
        method: _option.method,
        data: _option.data,
      })
        .then((res) => {
          if (!_option.hideLoading) {
            loading.close();
          }
          _option.success(res);
          resolve(res);
        })
        .catch((error) => {
          if (!_option.hideLoading) {
            loading.close();
          }
          _option.fail(error);
          reject(error);
        });
    });
  }
};

export default request;
