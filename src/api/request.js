import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: '',
  // withCredentials: true,
  timeout: 5000, // request timeout
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

    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });

      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
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
