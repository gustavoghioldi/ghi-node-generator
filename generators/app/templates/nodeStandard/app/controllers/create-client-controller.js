const RedisService = require('../services/redis/redis-service');
const config = require('../config').config;

module.exports = function () {
  this.create = async (client) => {
    try {
      const clientExist = await this.clientExist(client.id);
      if (clientExist) {
        return this.createResponse(clientExist);
      }
      const { id, info } = this.createClient(client);
      const redis = new RedisService();
      await redis.setData(id, info, config.redisConfig.ttl);
      return this.createResponse(null, JSON.parse(info));
    } catch (e) {
      throw e;
    }
  };

  this.createResponse = (response, message) => {
    if (response) {
      return {
        code: 'exists',
        message: null
      };
    }
    return {
      code: 'ok',
      message
    };
  };

  this.clientExist = async (id) => {
    try {
      const redis = new RedisService();
      return await redis.getData(id);
    } catch (e) {
      throw e;
    }
  };

  this.createClient = (client) => {
    const newClient = client;
    newClient.createdAt = new Date();
    return { id: newClient.id, info: JSON.stringify(newClient) };
  };
};
