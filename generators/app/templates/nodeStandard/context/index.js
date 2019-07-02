const fs = require('fs');

const context = process.env.NODE_ENV_CONTEXT || 'default';
const contextPath = `${__dirname}/definitions/${context}.js`;
if (!fs.existsSync(contextPath)) {
  throw new Error(`the context file ${contextPath} was not found, set correctly in the context folder`);
}
const contextConfiguration = require(contextPath); // eslint-disable-line
contextConfiguration.context = context;
module.exports = Object.freeze(contextConfiguration);
