'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('account', [
        {
        companyName: 'default',
        createdAt:new Date(),
        updatedAt:new Date()
        }
    ], {});
      await queryInterface.bulkInsert('invoiceItemType', [
        {
          name: "default",
          number: 0,
          accountId:1
        }
    ], {});
      await queryInterface.bulkInsert('role', [
        {
        name: 'admin',
        accountId:1,
        },
        {
        name: 'adminAccount',
        accountId:1,
        },
        {
          name: 'user',
          accountId:1,
        }
    ], {});
      await queryInterface.bulkInsert('users', [
        {
          name: "admin",
          roleId: 1,
          email: "co@co.com",
          password: "1234",
          accountId:1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          name: "user",
          roleId: 2,
          email: "co@co2.com",
          password: "1234",
          accountId:1,
          createdAt:new Date(),
          updatedAt:new Date()
        }
    ], {});
     return await queryInterface.bulkInsert('tickets', [
      {
        ticket_pedido: "ticket admin",
        userId:1,
        status:"Created",
        createdAt:new Date(),
        updatedAt:new Date(),
        accountId:1
      },
      {
        ticket_pedido: "ticket user",
        userId:2,
        status:"Created",
        accountId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        ticket_pedido: "ticket user",
        status:"Created",
        userId:1,
        accountId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   
  }
};
