module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('ShoppingCarts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    cartId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    groceryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
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
  down: async (queryInterface) => queryInterface.dropTable('ShoppingCarts')
};
