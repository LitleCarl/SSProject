'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
        'user_regions',
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
          userId: {
            type: Sequelize.INTEGER,
          },
          regionId: {
            type: Sequelize.INTEGER,
          },
          startAt: {
            type: Sequelize.DATE,
          },
          endAt: {
            type: Sequelize.DATE,
          },
          deviceCount: {
            type: Sequelize.INTEGER,
          },
          currentPorts: {
            type: Sequelize.STRING,
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('user_regions')

  }
};
