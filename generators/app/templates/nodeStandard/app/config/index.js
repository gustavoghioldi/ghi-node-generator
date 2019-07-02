const fs = require('fs');

let config = null;
let context = null;

const getConfiguration = () => {
  const env = process.env.NODE_ENV;
  if (!fs.existsSync(`${__dirname}/config.${env}.js`)) {
    throw new Error(`the config file ${__dirname}/config.${env}.js was not found, set correctly the env variable NODE_ENV`);
  }
  const cfg = require(`./config.${env}`); // eslint-disable-line
  config = cfg;
  config.env = env;
  return config;
};

const getContext = () => {
  context = require('../../context'); // eslint-disable-line
  return context;
};
module.exports.config = config || getConfiguration();
module.exports.context = context || getContext();

