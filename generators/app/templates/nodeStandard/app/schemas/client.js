const Joi = require('joi');

module.exports.client = {
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  mail: Joi.string().email()
};
