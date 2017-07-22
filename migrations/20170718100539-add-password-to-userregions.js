'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
        'user_regions',
        'password',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '12345678'
        }
    )

      queryInterface.changeColumn(
          'user_regions',
          'currentPorts',
          {
              type: Sequelize.INTEGER,
              allowNull: false
          }
      )

    queryInterface.removeColumn(
        'user_regions',
        'deviceCount'
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
