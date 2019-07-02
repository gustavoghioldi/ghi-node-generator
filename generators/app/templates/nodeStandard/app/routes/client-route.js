const Router = require('express').Router;
const context = require('../config').context;
const getMiddlewares = require('../util/get-middleware').getMiddlewares;

const router = Router();
router.post('/', getMiddlewares(context.middlewares.createClient));
router.get('/:id', getMiddlewares(context.middlewares.getClient));
router.delete('/:id', getMiddlewares(context.middlewares.deleteClient));

module.exports = router;
