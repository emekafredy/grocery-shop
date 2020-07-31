const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: process.env.ADMIN_ID,
      name: process.env.ADMIN_NAME,
      image: 'https://www.argo-engineering.co.uk/wp-content/uploads//2019/06/male-placeholder-image.jpeg',
      role: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
