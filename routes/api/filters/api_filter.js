var models = require('../../../models');
var jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    if (!req.headers['x-token']) {
        res.json({code: 0, err:['auth failure, x-token required']})
    }
    else {
        jwt.verify(req.headers['x-token'], '58133240', async function(err, decoded) {
            if (err || decoded['userId'] == null) {
                res.json({code: 0, err:['auth failure']})
            }
            else {
                req.user = await models['user'].findOne({where: {id: decoded.userId}});
                if (req.user) {
                    next()
                }
                else {
                    res.json({code: 0, err:['User not found']})
                }
            }
        });
    }
};