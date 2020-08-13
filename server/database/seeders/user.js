const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: process.env.ADMIN_ID,
      name: process.env.ADMIN_NAME,
      image: 'https://secureservercdn.net/198.71.188.149/cac.572.myftpupload.com/wp-content/uploads/2019/10/Placeholder-Team-Image.jpg?time=1589616095',
      role: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12),
      phone: process.env.ADMIN_PHONE,
      address: process.env.ADMIN_ADDRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
