module.exports = {
  redisConfig: {
    port: process.env.NODE_REDIS_PORT || 6379,
    server: process.env.NODE_REDIS_SERVER || '127.0.0.1',
    pass: process.env.NODE_REDIS_PASS || '',
    ttl: process.env.NODE_REDIS_TTL || 86400
  }
};
