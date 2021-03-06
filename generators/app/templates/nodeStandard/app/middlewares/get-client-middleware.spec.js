const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('getClientMiddleware', () => {

    beforeEach(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

    });

    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
    });

    describe('getClientMiddleware middleware', () => {

      it('should return the response correctly', async function () {
        let request = {};
        request.params = {};
        request.params.id = 111;
        let mockResponse = {
          setResponseRaw: () => {
          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseRaw');
        mockery.registerMock('../util/common-response', mockResponse);

        mockery.registerMock('../controllers/get-client-controller', function () {
          this.get = () => {
            response= "ok";
            return Promise.resolve(response);
          }
        });

        let middleware = require("./get-client-middleware").getClientMiddleware;
        await middleware(request, null, null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(200);
        expect(responseSpy.args[0][2]).to.be.equal('ok');
      });

      it('should return an error when  an exception is caught', async function () {
        let request = {};
        request.params = {};
        request.params.id = 111;
        let mockResponse = {
          setResponseWithError: () =>{

          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
        mockery.registerMock('../util/common-response',mockResponse);
        mockery.registerMock('../controllers/get-client-controller', function () {
          this.get = () => {
            throw new Error('internal error');
          }
        });

        let middleware = require("./get-client-middleware").getClientMiddleware;
        await middleware(request, null, null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(500);
        expect(responseSpy.args[0][2]).to.be.equal('internal error');
      });

    });
});
