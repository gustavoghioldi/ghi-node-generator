const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('clientRoute', () => {

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

    describe('checking the actions', () => {

        it('should allow calls by using POST, GET and DELETE ', function () {
            const actionsMock = {
              post: function (path, middlewares) {
              },
              get: function (path, middlewares) {
              },
              delete: function (path, middlewares) {
              }
            };
            const postSpy = sinon.spy(actionsMock, 'post');
            const getSpy = sinon.spy(actionsMock, 'get');
            const deleteSpy = sinon.spy(actionsMock, 'delete');
            let expressMock = {
                Router: function () {
                    return actionsMock;
                }
            }
            mockery.registerMock('express', expressMock);
            mockery.registerMock('../config',{
              context: {
                middlewares:{
                  createClient: ["middleware"]
                }
              }
            });

            const getMiddlewaresMock = {
              getMiddlewares: function (middlewares) {
                    return middlewares;
                }
            };

            mockery.registerMock('../util/get-middleware', getMiddlewaresMock);
            require("./client-route");

            expect(postSpy.called).to.be.true;
            expect(postSpy.args[0][0]).to.be.equal("/");
            expect(getSpy.called).to.be.true;
            expect(getSpy.args[0][0]).to.be.equal("/:id");
            expect(deleteSpy.called).to.be.true;
            expect(deleteSpy.args[0][0]).to.be.equal("/:id");


        });

    });

});
