const RedisService = require('../services/redis/redis-service');

module.exports = function () {
  this.get = async (id) => {
    try {
      const redis = new RedisService();
      const response = await redis.getData(id);
      return this.createResponse(JSON.parse(response));
    } catch (e) {
      throw e;
    }
  };
  this.createResponse = (response) => {
    if (response) {
      return {
        code: 'ok',
        message: response
      };
    }
    return {
      code: 'not found',
      message: {}
    };
  };
};
