'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable(
        'flows',
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
          serverId: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          time: {
            type: Sequelize.BIGINT,
            allowNull: false
          },
          flow: {
            type: Sequelize.BIGINT,
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('flows')

  }
};
