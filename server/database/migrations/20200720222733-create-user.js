module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vendorName: {
      type: Sequelize.STRING,
      unique: true,
    },
    image: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM('user', 'vendor', 'delivery', 'admin'),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
