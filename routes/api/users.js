var express = require('express');
var userRouter = express.Router();
var util = require('util');
var _ = require('lodash');
var models = require('../../models')
var jwt = require('jsonwebtoken');
var apiFilter = require('./filters/api_filter.js')
userRouter.post('/signin', async function(req, res) {
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().len(6, 8);

    let locals = await res.apiValidation(req, async function () {
        let user = await models['user'].signIn(req.body.email, req.body.password);

        if (!user) {
            throw "Wrong email or password!";
        }
        else {
            var token = jwt.sign({ userId: user.id }, '58133240');

            return [[user, 'as user'], [token, 'as token']];
        }
    });
    res.json(locals)
});

userRouter.get('/servers', apiFilter, async function (req, res){
    let locals = await res.apiValidation(req, async function () {
        let user = req.user;
        let regions = await user.getRegions();
        let userRegions = await user.getUserRegions()

        var regionIds = []
        if (regions.length > 0) {
            regionIds = _.map(regions, (region)=>{
                return region.id
            });
            let servers = await models['server'].findAll({
                                where: {
                                    regionId: {
                                        '$in': regionIds
                                    }
                                },
                                attributes: {exclude: ['port', 'password']}
                            });

            return [[servers, 'as servers'], [userRegions, 'as userRegions'], [regions, 'as regions']]
        }
        else {
            return [[], 'as servers']
        }
    });
    res.json(locals)
});
module.exports = userRouter;
