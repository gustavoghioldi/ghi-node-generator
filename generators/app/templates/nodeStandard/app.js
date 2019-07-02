const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const context = require('./app/config/').context;

const clientRoute = require('./app/routes/client-route');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

// health check MS
app.get(`/api/onboarding/${context.version}/client/health/`, (req, res) => {
  res.send(`${context.name} up and running`);
});

app.use(`/api/onboarding/${context.version}/client`, clientRoute);

app.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).send({ code: 'error', message: 'internal error not handled' });
});

// init check dependencies
(() => {
  // if one of the dependencies does not response the ms can not start
  require('./app/services/redis/init-redis-connection'); // eslint-disable-line
})();

module.exports = app;
