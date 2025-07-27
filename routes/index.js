const express = require('express');
const routes = express.Router();

console.log('done');

routes.use("/", require("./registration.js"));
routes.use("/admin", require("./admin.js"));
routes.use("/pratinidhi", require("./gamPratinidhiRoutes.js"));
routes.use("/user", require("./user.js"));
routes.use("/villages", require("./village.js"));

module.exports = routes;