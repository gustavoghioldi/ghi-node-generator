const Redis = require('ioredis');
const config = require('../../config').config;

let redisConnection = null;
let state = null;

const Conn = {
  getConnection: async () => {
    try {
      if (state) {
        return redisConnection;
      }
      throw new Error('error connecting with redis');
    } catch (e) {
      throw e;
    }
  },
  checkInitConnection: () => {
    Conn.createConnection();
    return new Promise((resolve, reject) => {
      redisConnection.on('connect', () => {
        console.debug('Redis connection OK');
        state = true;
        resolve('ok');
      });
      redisConnection.on('error', (err) => {
        console.error('Error connecting to redis', err);
        state = false;
        reject(err);
      });
      redisConnection.on('ready', () => {
        console.info('Ready connect to redis');
        state = true;
      });
    });
  },
  createConnection: () => {
    if (!redisConnection) {
      redisConnection = new Redis({
        port: config.redisConfig.port,
        host: config.redisConfig.server,
        password: config.redisConfig.pass,
        retryStraty(times) {
          return Math.min(times * 50, 2000);
        }
      });
    }
  },
  setConnection: (value) => {
    redisConnection = value;
  },
  setState: (value) => {
    state = value;
  }
};

module.exports = Conn;
