var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Flow = sequelize.define('flow', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        serverId: {type: Sequelize.INTEGER, allowNull: false},
        userId: {type: Sequelize.INTEGER, allowNull: false},
        time: {type: Sequelize.BIGINT, allowNull: false},
        flow: {type: Sequelize.BIGINT, allowNull: false}
    });

    Flow.associate = function(models) {
        Flow.belongsTo(models['server']);
        Flow.belongsTo(models['user']);
    };

    return Flow;
};