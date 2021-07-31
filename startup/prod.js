const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
require('express-async-errors');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'production') require('dotenv').config();
  app.use(compression());
  app.use(helmet());
  app.use(cors());
};
