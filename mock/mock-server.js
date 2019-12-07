module.exports = (app) => {
  require('@babel/register');

  let mocks = require('./index').default;

  mocks.map((item) => {
    app[item.type](item.url, item.response);
  });
};
