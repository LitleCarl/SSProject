var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var UserRegion = sequelize.define('userRegion', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: Sequelize.INTEGER},
        regionId: {type: Sequelize.INTEGER},
        startAt: {type: Sequelize.DATE, allowNull: false},
        endAt: {type: Sequelize.DATE, allowNull: false},
        password: {type: Sequelize.STRING},
        currentPorts: {type: Sequelize.INTEGER}
    },
        {
            tableName: 'user_regions'
        });
    UserRegion.associate = function(models) {
        UserRegion.belongsTo(models['user']);
        UserRegion.belongsTo(models['region']);
    };


    //var ur = UserRegion.build();
    //ur.userId = 1
    //ur.regionId = 1
    //ur.startAt = new Date();
    //ur.endAt = new Date();
    //ur.password = '58133240'
    //ur.currentPorts = 50000
    //
    //ur.save()

    return UserRegion
}