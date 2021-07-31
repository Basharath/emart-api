const express = require('express');

const app = express();

require('./startup/validation')();
require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/db')();

module.exports = app;
