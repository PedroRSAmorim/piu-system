const localServer = require('./localServer');
require('dotenv').config();

try {
  localServer.init();
  localServer.start();
}
catch(err) {
  localServer.stop();
}
