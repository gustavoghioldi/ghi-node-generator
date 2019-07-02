const camelCase = require('lodash/camelCase');

function getMiddlewares(middlewareNames) {
  const arrayOfMiddleware = [];
  middlewareNames.forEach((name) => {
    const middleware = require(`./../middlewares/${name}`)[camelCase(name)]; // eslint-disable-line
    arrayOfMiddleware.push(middleware);
  });
  return arrayOfMiddleware;
}

module.exports.getMiddlewares = getMiddlewares;
