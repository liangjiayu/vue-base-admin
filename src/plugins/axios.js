import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import CONFIG from '../configs/index';

const configs = {
  baseURL: CONFIG.API_URL,
  withCredentials: true,
};

const _axios = axios.create(configs);

// 统一封装报错字段 code msg data
function throwError(code = '9999', msg = '网络异常', data, config) {
  let error = Object.assign({}, { code, msg, data, config });
  handleError(error);

  throw error;
}

// 报错断言
function assertError(result, code, msg, data, config) {
  if (!result) {
    return throwError(code, msg, data, config);
  }
}

// 报错处理
function handleError(error) {
  if (!error.config.hideError) {
    Message.error(error.msg);
  }
}

// 网络请求前 拦截器
_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  () => {}
);

// 网络请求返回 拦截器
_axios.interceptors.response.use(
  (response) => {
    let res = response.data;
    // 服务器没有code字段返回的情况
    assertError(
      res && res.code,
      '9999',
      '服务端未返回 code 字段！',
      res,
      response.config
    );
    // 服务器 code字段 不正确
    assertError(
      [20000].includes(res.code),
      res.code,
      res.msg || '服务端程序异常',
      res,
      response.config
    );
    return res.data;
  },
  (error) => {
    return throwError('9999', error.message || '网络异常', error, error.config);
  }
);

Vue.prototype.axios = _axios;

export default _axios;
