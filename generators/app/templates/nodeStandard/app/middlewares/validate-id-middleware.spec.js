const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('validateIdMiddleware', () => {

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

    describe('validateIdMiddleware middleware', () => {

      it('should return next() when  the id is present', function () {
        let request = {};
        request.params = {};
        request.params['id'] = '11111';
        const nextSpy = sinon.spy();

        let middleware= require("./validate-id-middleware").validateIdMiddleware;
        middleware(request,null,nextSpy);

        expect(nextSpy.called).to.be.true;
      });

      it('should return an error when the id is not present', function () {
        let request = {};
        request.params = {};
        let mockResponse = {
          setResponseWithError: () =>{

          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
        mockery.registerMock('../util/common-response',mockResponse);

        let middleware= require("./validate-id-middleware").validateIdMiddleware;
        middleware(request,null,null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(400);
        expect(responseSpy.args[0][2]).to.be.equal('the id was not found');
      });

    });
});
