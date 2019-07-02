const setResponseWithError = require('../util/common-response').setResponseWithError;
const context = require('../config').context;

module.exports.checkCommerceMiddleware = (req, res, next) => {
  if (req.headers['x-flow-commerce'] === context.commerce) {
    return next();
  }
  return setResponseWithError(res, 400, 'the commerce is not correct');
};
