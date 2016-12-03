'use strict';

require('babel-register');

const app = require('./server/app').app;
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Listening on Port: '+port);
});
