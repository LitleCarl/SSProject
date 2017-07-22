var express = require('express');
var router = express.Router();
var util = require('util');
var _ = require('lodash');
var models = require('../models')
var userAuth = require('./filters/user_auth')
/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users/index', { name: 'John' });
});

router.get('/me' , userAuth,  async function(req, res) {
  let locals = await res.renderWithValidation(req, async function () {
    let regions = await models['region'].findAll();
    let regionsOwned = await req.user.getRegions();
    return [[regions, 'as regions'], [regionsOwned, 'as regionsOwned']]
  });
  res.render('users/profile', locals)
});

router.get('/signin', async function(req, res) {
  if (req.session['userId']) {
    res.redirect('./me')
  }
  else {
    let locals = await res.renderWithValidation(req);

    res.render('users/signin', locals)
  }
});

router.post('/signin', async function(req, res) {
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().len(6, 8);

  var userFound;
  let locals = await res.renderWithValidation(req, async function () {
      let user = await models['user'].signIn(req.body.email, req.body.password);

      if (!user) {
        throw "Wrong email or password!"
      }
      else {
        userFound = user;
        req.session.userId = user.id;
      }
  });

  if (userFound) {
    res.redirect('./me')
  }
  else {
    res.render('users/signin', locals)
  }
});
module.exports = router;
