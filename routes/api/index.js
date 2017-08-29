var express = require('express');

var apiRouter = express.Router();
// you need to set mergeParams: true on the router,


var users = require('./users');

apiRouter.use('/users', users)
module.exports = apiRouter;