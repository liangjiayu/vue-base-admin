const chokidar = require('chokidar');
const path = require('path');

const mockDir = path.join(process.cwd(), 'mock');

function initRoutes(app) {
  let mockLastIndex;
  let mocks = require('./index').default;

  mocks.map((item) => {
    app[item.type](item.url, item.response);
  });
  mockLastIndex = app._router.stack.length;

  let mockRoutesLength = Object.keys(mocks).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

module.exports = (app) => {
  require('@babel/register');

  let mockRoutes = initRoutes(app);

  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;
  
  chokidar
    .watch(mockDir, {
      ignored: '/mock-server/',
      persistent: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          unregisterRoutes();

          mockRoutes = initRoutes(app);
        } catch (error) {
          console.log(error);
        }
      }
    });
};
