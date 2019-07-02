const setResponseWithError = require('../util/common-response').setResponseWithError;
const context = require('../config').context;

module.exports.checkCountryMiddleware = (req, res, next) => {
  if (req.headers['x-flow-country'] === context.country) {
    return next();
  }
  return setResponseWithError(res, 400, 'the country is not correct');
};
