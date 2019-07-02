const DeleteClientController = require('../controllers/delete-client-controller');
const setResponseWithError = require('../util/common-response').setResponseWithError;
const setResponseRaw = require('../util/common-response').setResponseRaw;

module.exports.deleteClientMiddleware = async (req, res) => {
  try {
    const id = req.params.id;
    const controller = new DeleteClientController();
    const response = await controller.delete(id);
    return setResponseRaw(res, 200, response);
  } catch (e) {
    return setResponseWithError(res, 500, e.message);
  }
};
