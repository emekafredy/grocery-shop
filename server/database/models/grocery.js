export default (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    image2: {
      type: DataTypes.STRING
    }
  });

  Grocery.associate = (models) => {
    Grocery.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId'
    });

    Grocery.belongsTo(models.User, {
      as: 'vendor',
      foreignKey: 'vendorId'
    });

    Grocery.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'groceryId'
    });
  };

  return Grocery;
};
