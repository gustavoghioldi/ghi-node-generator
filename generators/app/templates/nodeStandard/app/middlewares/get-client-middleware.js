const GetClientController = require('../controllers/get-client-controller');
const setResponseWithError = require('../util/common-response').setResponseWithError;
const setResponseRaw = require('../util/common-response').setResponseRaw;

module.exports.getClientMiddleware = async (req, res) => {
  try {
    const id = req.params.id;
    const controller = new GetClientController();
    const response = await controller.get(id);
    return setResponseRaw(res, 200, response);
  } catch (e) {
    return setResponseWithError(res, 500, e.message);
  }
};
