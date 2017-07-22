'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
        'servers',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          host: {
            type: Sequelize.STRING,
            allowNull: false
          },
          port: {
            type: Sequelize.STRING,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          extra: {
            type: Sequelize.STRING,
          },
          regionId: {
            type: Sequelize.INTEGER
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('servers')
  }
};
