// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  devServer: {
    // proxy: "http://192.168.50.124:8080",
    after: require('./mock/mock-server'),
  },
};
