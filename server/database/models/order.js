export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comments: {
      allowNull: false,
      type: DataTypes.STRING
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reference: {
      allowNull: false,
      type: DataTypes.STRING
    },
    groceryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    groceryName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    unitCost: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    shippedOn: {
      type: DataTypes.DATE
    },
    delivered: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('Ordered', 'Shipped', 'Delivered'),
      defaultValue: 'Ordered',
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: 'customer',
      foreignKey: 'customerId'
    });

    Order.belongsTo(models.Grocery, {
      as: 'grocery',
      foreignKey: 'groceryId'
    });
  };

  return Order;
};
