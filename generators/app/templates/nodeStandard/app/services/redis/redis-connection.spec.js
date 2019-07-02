const mockery = require('mockery');
const chai = require('chai');
const expect = chai.expect;
var sinon = require('sinon');

xdescribe('RedisConnection', () => {

  let client = null;
  let redisConnection = 'ok';
  let state = null;

  beforeEach(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('../../config', {
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
    client = null;
    redisConnection = null;
    state = null;
    mockery.disable();
    mockery.deregisterAll();
  });

  describe("getConnection Method", () => {
    it("should response with error", async () => {
      const r = require('./redis-connection');
      try {
        await r.getConnection();
      } catch (e) {
        expect(e.message).to.be.equal("error connecting with redis")
      }
    });

    it("should response redisConnection", async () => {
      const Conn = require('./redis-connection');
      try {
        Conn.setConnection("ok");
        Conn.setState(true);
        const response = await Conn.getConnection();
        expect(response).to.be.equal('ok');
      } catch (e) {
        // expect(e.message).to.be.equal("error connecting with redis")
      }
    });
  });

  describe("checkInitConnection method", () => {

    it("should call the redis events connect", async () => {
      const connect = {
        on: (method, cb) => {
          if (method === "connect") {
            cb("data");
          }
          if (method === "error") {

          }
          if (method === "ready") {

          }
        }
      }
      const redis = function (jsonData) {
        return connect;
      };
      mockery.registerMock('ioredis', redis);
      const spyConnect = sinon.spy(connect, "on");

      const Conn = require('./redis-connection');
      const response = await Conn.checkInitConnection();
      expect(response).to.be.equal("ok");

    });

    it("should call the redis events error", async () => {
      const connect = {
        on: (method, cb) => {
          if (method === "connect") {

          }
          if (method === "error") {
            cb("error");
          }
          if (method === "ready") {

          }
        }
      }
      const redis = function (jsonData) {
        return connect;
      };
      mockery.registerMock('ioredis', redis);
      const spyConnect = sinon.spy(connect, "on");

      const Conn = require('./redis-connection');
      try {
        await Conn.checkInitConnection();
      } catch(e){
        expect(e).to.be.equal("error");
      }
    });


    it("should call the redis events ready", async (done) => {
      const connect = {
        on: (method, cb) => {
          if (method === "connect") {

          }
          if (method === "error") {

          }
          if (method === "ready") {
            cb();
            done();
          }
        }
      }
      const redis = function (jsonData) {
        return connect;
      };
      mockery.registerMock('ioredis', redis);
      const spyConnect = sinon.spy(connect, "on");
      const Conn = require('./redis-connection');
      try {
        await Conn.checkInitConnection();
      } catch(e){
        expect(e).to.be.equal("error");
      }
    });
  });

  describe("createConnection Method", () => {
    it("should return undefined if redisConnection is not null", () => {
      const Conn = require('./redis-connection');
      Conn.setConnection('ok');
      const response = Conn.createConnection();
      expect(response).to.be.undefined;
    });
    it("should return redisConnection exist", (done) => {
      const redis = function (jsonData) {
        expect(jsonData.port).to.be.equals(1000);
        expect(jsonData.host).to.be.equals('127.0.0.1');
        expect(jsonData.pass).to.be.undefined;
        done();
      };
      mockery.registerMock('ioredis', redis);
      const spyRedis = sinon.spy(redis);
      const Conn = require('./redis-connection');
      const responseConnection = Conn.createConnection();
    });
    it("should the function retryStraty", (done) => {
      const redis = function (jsonData) {
        const fun = jsonData.retryStraty;
        const val =  fun(2);
        expect(val).to.be.equal(100)
        done();
      };
      mockery.registerMock('ioredis', redis);
      const spyRedis = sinon.spy(redis);
      const Conn = require('./redis-connection');
      const responseConnection = Conn.createConnection();
    });
  });

  describe("setConnection Method", () => {
    it("should set redisConnection", () => {
      const Conn = require('./redis-connection');
      const result = Conn.setConnection('ok');
      expect(result).to.be.equal(undefined);
    });
  });

  describe("setState Method", () => {
    it("should set state", () => {
      const Conn = require('./redis-connection');
      const result = Conn.setState(true);
      expect(result).to.be.equal(undefined);
    });
  });
});
