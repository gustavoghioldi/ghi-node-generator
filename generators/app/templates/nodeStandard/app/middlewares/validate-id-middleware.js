const setResponseWithError = require('../util/common-response').setResponseWithError;

module.exports.validateIdMiddleware = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return setResponseWithError(res, 400, 'the id was not found');
  }
  return next();
};
