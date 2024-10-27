const localServer = require('./localServer');
const config = require('./src/Config');
require('dotenv').config();

try {
  localServer.init();
  localServer.start();
}
catch(err) {
  // console.log(err)
  localServer.stop();
}
