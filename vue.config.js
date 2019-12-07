// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  devServer: {
    after: require('./mock/mock-server'),
  },
};
