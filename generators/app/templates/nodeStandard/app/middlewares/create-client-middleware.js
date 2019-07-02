const CreateClientController = require('../controllers/create-client-controller');
const setResponseWithError = require('../util/common-response').setResponseWithError;
const setResponseRaw = require('../util/common-response').setResponseRaw;

module.exports.createClientMiddleware = async (req, res) => {
  try {
    const controller = new CreateClientController();
    const response = await controller.create(req.body);
    return setResponseRaw(res, 200, response);
  } catch (e) {
    return setResponseWithError(res, 500, e.message);
  }
};
