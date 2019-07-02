const setResponseWithError = require('../util/common-response').setResponseWithError;
const context = require('../config').context;

module.exports.checkChannelMiddleware = (req, res, next) => {
  if (req.headers['x-flow-channel'] === context.channel) {
    return next();
  }
  return setResponseWithError(res, 400, 'the channel is not correct');
};
