// src/database/seeders/XXXXXXXXXXXXXX-create-admin-user.js

const bcrypt = require('bcrypt')

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10)

    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Admin',
        last_name: 'User',
        phone: '555-5555',
        birth: '2004-07-03',
        email: 'admin@email.com',
        password: hashedPassword,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, { where: { email: 'admin@email.com' } })
  }
};