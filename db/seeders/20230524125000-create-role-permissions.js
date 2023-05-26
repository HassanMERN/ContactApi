'use strict';
const Constants = require('../../src/utils/constants');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'role-permission',
      [
        // Super_Admin Role-Permissions
        {
          roleId: 1,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Admin Role-Permission
        {
          roleId: 2,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        //User Permissions

        {
          roleId: 3,
          permissionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role-permission', null, {});
  },
};
