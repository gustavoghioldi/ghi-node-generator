const RedisService = require('../services/redis/redis-service');

module.exports = function () {
  this.delete = async (id) => {
    try {
      const redis = new RedisService();
      const response = await redis.deleteData(id);
      return this.createResponse(response);
    } catch (e) {
      throw e;
    }
  };
  this.createResponse = (response) => {
    if (response) {
      return {
        code: 'ok'
      };
    }
    return {
      code: 'not found'
    };
  };
};
