const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('validateBodyMiddleware', () => {

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

    describe('validateBodyMiddleware middleware', () => {

      it('should return next() when  the body is correct', function () {
        let request = {};
        request.body = {
          id: '11111',
          name: 'name',
          mail: "aa@aa.com"
        };
        const nextSpy = sinon.spy();

        let middleware= require("./validate-body-middleware").validateBodyMiddleware;
        middleware(request,null,nextSpy);

        expect(nextSpy.called).to.be.true;
      });

      it('should return an error when the body(mail) is not correct', function () {
        let request = {};
        request.body = {
          id: '11111',
          name: 'name',
          mail: "aaaa.com"
        };
        let mockResponse = {
          setResponseWithError: () =>{

          }
        }
        const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
        mockery.registerMock('../util/common-response',mockResponse);

        let middleware= require("./validate-body-middleware").validateBodyMiddleware;
        middleware(request,null,null);

        expect(responseSpy.called).to.be.true;
        expect(responseSpy.args[0][0]).to.be.null;
        expect(responseSpy.args[0][1]).to.be.equal(400);
        expect(responseSpy.args[0][2]).to.be.equal('the body is not correct');
      });

    });
});
