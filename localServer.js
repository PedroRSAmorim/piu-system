const express = require('express');
const cors = require('cors');
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const routesRestful = require('./config/routes-restful');
const routesViews = require('./config/routes-views');

const app = express();
const port = 1337;

let localServer = {
  _server: null,
  init: function () {
    
    try {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cors());
      
      app.use(expressLayouts);
      app.set("layout", "ng/layout");
      app.use(express.static(path.join(__dirname, "public")));

      console.log(`Serving functions ...`);

      Object.keys(routesRestful).forEach((value) => {
        console.log(`Added RESTful function on /api/${value}`);
        app.use(`/api/${value}`, routesRestful[value]);
      });

      app.set("view engine", "ejs");
      Object.keys(routesViews).forEach((value) => {
        console.log(`Added View function on /${value}`);
        app.use(`/${value}`, routesViews[value]);
      });

      app.get('/src/controllers/:controllerName', (req, res) => {
        const controllerPath = path.join(__dirname, 'src/controllers', `${req.params.controllerName}.js`);
        res.sendFile(controllerPath);
      });

      app.get('/', (req, res) => {
        res.redirect('/dashboard');
      });
    } catch (err) {
      console.error(`Error during init server: ${err.message}`);
      throw err;
    }
  },
  start: function () {
    try {
      this._server = app.listen(port, () => {
        console.log(`Your functions are running on port ${port}`);
        console.log(`Serving functions OK!`);
      });
    } catch (err) {
      console.error(`Error during start server: ${err.message}`);
      throw err;
    }
  },
  stop: function () {
    try {
      if (this._server) {
        this._server.close(() => {
          console.log('Server stopped');
        });
      }
    } catch (err) {
      console.error(`Error during stop server: ${err.message}`);
      throw err;
    }
  }
};

module.exports = localServer;
