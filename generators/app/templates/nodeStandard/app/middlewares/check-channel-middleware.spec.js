const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('checkChannelMiddleware', () => {

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

    describe('checkChannelMiddleware middleware', () => {

      it('should return next() when  the x-flow-channel is correct', function () {
        let request = {};
        request.headers = {};
        request.headers['x-flow-channel'] = 'web';
        const nextSpy = sinon.spy();
        mockery.registerMock('../config',{
          context: { channel:'web' }
        });
        let middleware= require("./check-channel-middleware").checkChannelMiddleware;
        middleware(request,null,nextSpy);

        expect(nextSpy.called).to.be.true;
      });

      it('should return an error when the header is wrong ', function () {
        let request = {};
        request.headers = {};
        request.headers['x-flow-channel'] = 'web';
        let mockResponse = {
          setResponseWithError: () =>{

          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
        mockery.registerMock('../util/common-response',mockResponse);
        mockery.registerMock('../config',{
          context: { channel:'other' }
        });

        let middleware= require("./check-channel-middleware").checkChannelMiddleware;
        middleware(request,null,null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(400);
        expect(responseSpy.args[0][2]).to.be.equal('the channel is not correct');
      });

    });
});
