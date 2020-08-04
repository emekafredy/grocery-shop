export default (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    cartId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  });

  ShoppingCart.associate = (models) => {
    ShoppingCart.belongsTo(models.Grocery, {
      foreignKey: 'groceryId',
      onDelete: 'CASCADE'
    });
  };

  return ShoppingCart;
};
