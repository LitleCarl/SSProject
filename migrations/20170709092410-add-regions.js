'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
        'regions',
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
          name: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('regions')
  }
};
