const chai   = require('chai');
const expect = chai.expect;

describe('common-response', () => {

    describe('setResponseWithError function', () => {

      it("should send an error ", function (done) {
        const func = require("./common-response").setResponseWithError;
        let responseMock = {
          status: (status) => {
            return {
              send: (data) =>{
                expect(status).to.be.equal(500);
                expect(data.code).to.be.equal('error');
                expect(data.message).to.be.equal('error message');
                done();
              }
            }
          }
        };
        func(responseMock, 500, 'error message');
      });

    });

    describe('setResponseWithOk function', () => {

            it("should send an  Ok message ", function (done) {
              const func = require("./common-response").setResponseWithOk;
              let responseMock = {
                status: (status) => {
                  return {
                    send: (data) =>{
                      expect(status).to.be.equal(200);
                      expect(data.code).to.be.equal('ok');
                      expect(data.message).to.be.equal('ok message');
                      done();
                    }
                  }
                }
              };
              func(responseMock, 200, 'ok message');
            });

          });

});
