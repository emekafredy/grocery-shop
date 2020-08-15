module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    totalCost: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: false
    },
    groceryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    groceryName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unitCost: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    shippedOn: {
      type: Sequelize.DATE
    },
    delivered: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: async (queryInterface) => queryInterface.dropTable('Orders'),
};
