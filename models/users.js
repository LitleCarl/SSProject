var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('user', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        password: Sequelize.STRING,
    });
    User.associate = function(models) {
        User.hasMany(models['userRegion'])
        User.belongsToMany(models['region'], {
            through: {
                model: models['userRegion'],
                unique: false
            }})
    };

    User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }

    // 登录
    User.signIn = async (email, password)=>{
        return await User.findOne({where: {
            email: email,
            password: password
        }})
    };
    return User;
};