const schema = require('../schemas/client').client;
const Joi = require('joi');
const setResponseWithError = require('../util/common-response').setResponseWithError;

module.exports.validateBodyMiddleware = (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return setResponseWithError(res, 400, 'the body is not correct');
  }
  return next();
};
