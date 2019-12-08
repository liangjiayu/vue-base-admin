import Schema from 'async-validator';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';

// https://element.eleme.cn/#/zh-CN/component/message#options
const showToast = (option = {}) => {
  let optionDefalut = {
    message: '提示',
    type: 'info', //success/warning/info/error
  };
  let _option = Object.assign({}, optionDefalut, option);

  return Message(_option);
};

// https://element.eleme.cn/#/zh-CN/component/loading#options
const showLoading = (option = {}) => {
  let optionDefalut = {
    text: '加载中',
    lock: true,
  };
  let _option = Object.assign({}, optionDefalut, option);

  let loadingInstance = Loading.service(_option);

  return loadingInstance;
};

// https://github.com/yiminghe/async-validator
const validator = (source = {}, rules = {}, callback = () => {}) => {
  let schemaInstance = new Schema(rules);
  return schemaInstance.validate(source, callback);
};

export { showToast, showLoading, validator };
