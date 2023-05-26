'use strict';
const Constants = require('../../src/utils/constants');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'permission',
      [
        { name: Constants.PERMISSION_VIEW_ADMIN_DASHBOARD },
        { name: Constants.PERMISSION_VIEW_ALL_USERS },
        { name: Constants.PERMISSION_VIEW_A_USER },
        { name: Constants.PERMISSION_ADD_A_USER },
        { name: Constants.PERMISSION_UPDATE_A_USER },
        { name: Constants.PERMISSION_DELETE_A_USER },
        { name: Constants.PERMISSION_VIEW_ALL_CONTACTS },
        { name: Constants.PERMISSION_ADD_A_CONTACT },
        { name: Constants.PERMISSION_UPDATE_A_CONTACT },
        { name: Constants.PERMISSION_DELETE_A_CONTACT },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permission', null, {});
  },
};
