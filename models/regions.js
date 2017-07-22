var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('region', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: Sequelize.STRING
    });
}