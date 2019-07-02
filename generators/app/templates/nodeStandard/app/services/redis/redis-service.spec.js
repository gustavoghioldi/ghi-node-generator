const mockery = require('mockery');
const chai = require('chai');
const expect = chai.expect;
var sinon = require('sinon');

xdescribe('RedisService', () => {

  let client = null;

  beforeEach(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('../../config/index', {
      services: {
        apiLoginManager: 'uri'
      },
      msConfig: {
        timeout: 15000
      },
      redisConfig: {
        port: 1000,
        server: '127.0.0.1',
        pass: ''
      }
    });
    mockery.registerMock('fif-common-node3-flow-info', {
      logger: {
        debug: function () { },
        info: function () { },
        error: function () { },
        warn: function () { }
      }

    });

  });

  afterEach(function () {
    mockery.disable();
    mockery.deregisterAll();
  });

  it("Should be an instance of RedisService", () => {
    const RedisService = require('./redis-service');
    const redis = new RedisService();
    expect(redis instanceof RedisService).to.be.true;
  });

  describe("setData method", () => {

    it("should return an error", async () => {
      mockery.registerMock('./redis-connection', {
        getConnection: () => {
          return {
            set: (id, info, cb) => {
              cb("error");
            },
            expire: (id, ttl) => {

            }
          }
        }
      });
      const RedisService = require('./redis-service');
      const redis = new RedisService();
      try {
        const setDataResponse = await redis.setData("id", "info", "1000");
      } catch (e) {
        expect(e).to.be.equal("error");
      }
    });

    it("should return an erron when the cach is called", async () => {
      mockery.registerMock('./redis-connection', {
        getConnection: () => {
          throw new Error("error")
        }
      });
      const RedisService = require('./redis-service');
      const redis = new RedisService();
      try {
        const setDataResponse = await redis.setData("id", "info", "1000");
      } catch (e) {
        expect(e.message).to.be.equal("error");
      }
    });

    it("should call expire", async () => {
      mockery.registerMock('./redis-connection', {
        getConnection: () => {
          return {
            set: (id, info, cb) => {
              cb();
            },
            expire: (id, ttl) => {
              return id;
            }
          }
        }
      });

      const RedisService = require('./redis-service');
      const redis = new RedisService();
      const setDataResponse = await redis.setData("id", "info", "1000");
      expect(setDataResponse).to.be.equal('id');
    });

  });

  describe("getData method", () => {

    it("should return an error", async () => {
      mockery.registerMock('./redis-connection', {
        getConnection: () => {
          return {
            get: (id, cb) => {
              cb("error", "value");
            }
          }
        }
      });

      const RedisService = require('./redis-service');
      const redis = new RedisService();
      try {
        const getDataResponse = await redis.getData("id");
      } catch (e) {
        expect(e).to.be.equal("error");
      }
    });

    it("should return an id", async () => {
      mockery.registerMock('./redis-connection', {
        getConnection: () => {
          return {
            get: (id, cb) => {
              cb();
            }
          }
        }
      });

      const RedisService = require('./redis-service');
      const redis = new RedisService();
      try {
        const getDataResponse = await redis.getData("id");
        expect(getDataResponse).to.be.equal('ok');
      } catch (e) {

      }

    });

  });
});
