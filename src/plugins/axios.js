import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import CONFIG from '../configs/index';

const configs = {
  baseURL: CONFIG.API_URL,
  withCredentials: true,
};

const _axios = axios.create(configs);

function throwError(code = '9999', msg = '网络异常', data, config) {
  let error = Object.assign({}, { code, msg, data, config });
  handleError(error);

  throw error;
}

function assertError(result, code, msg, data, config) {
  if (!result) {
    return throwError(code, msg, data, config);
  }
}

function handleError(error) {
  if (!error.config.hideError) {
    Message.error(error.msg);
  }
}

_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  () => {}
);

_axios.interceptors.response.use(
  (response) => {
    let res = response.data;
    assertError(
      res && res.code,
      '9999',
      '服务端未返回 code 字段！',
      res,
      response.config
    );
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
