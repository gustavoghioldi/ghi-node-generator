const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('createClientMiddleware', () => {

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

    describe('createClientMiddleware middleware', () => {

      it('should return the response correctly', async function () {
        let request = {};
        request.body = {};
        let mockResponse = {
          setResponseRaw: () => {
          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseRaw');
        mockery.registerMock('../util/common-response', mockResponse);

        mockery.registerMock('../controllers/create-client-controller', function () {
          this.create = () => {
            response= "ok";
            return Promise.resolve(response);
          }
        });

        let middleware = require("./create-client-middleware").createClientMiddleware;
        await middleware(request, null, null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(200);
        expect(responseSpy.args[0][2]).to.be.equal('ok');
      });

      it('should return an error when  an exception is caught', async function () {
        let request = {};
        let mockResponse = {
          setResponseWithError: () =>{

          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
        mockery.registerMock('../util/common-response',mockResponse);
        mockery.registerMock('../controllers/create-client-controller', function () {
          this.create = () => {
            throw new Error('internal error');
          }
        });

        let middleware = require("./create-client-middleware").createClientMiddleware;
        await middleware(request, null, null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(500);
        expect(responseSpy.args[0][2]).to.be.equal('internal error');
      });

    });
});
