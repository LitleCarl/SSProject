var models = require('../../models');
module.exports = async function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('./signin')
    }
    else {
        req.user = await models['user'].findOne({where: {id: req.session.userId}});
        if (req.user) {
            next()
        }
        else {
            res.redirect('./signin')
        }
    }
};