// import mocks from "./index";
// const { default: mocks } = require("./index.js");

module.exports = app => {
  require("@babel/register");
  let mocks = require("./index").default;
  mocks.map(item => {
    app[item.type](item.url, item.response);
  });
};
