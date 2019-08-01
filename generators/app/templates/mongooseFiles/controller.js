const Controller = require("../util/common-mongoose-controller");
const crudExampleFacade = require("../facades/crud-example-facade");

class CrudExampleController extends Controller {}

module.exports = new CrudExampleController(crudExampleFacade);
