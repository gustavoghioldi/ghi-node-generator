const Facade = require("../util/common-moongose-facade");
const crudExampleSchema = require("../schemas/crud-example-schema");

class CrudExampleFacade extends Facade {}

module.exports = new CrudExampleFacade("Example", crudExampleSchema);
