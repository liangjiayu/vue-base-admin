import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';

const service = axios.create({
  baseURL: 'http://localhost:8080',
  // withCredentials: true,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export function requestPost(option = {}) {
  return service({
    method: 'post',
    url: option.url,
    // data: qs.stringify(option.params),
    data: option.params,
  });
}

export default service;
