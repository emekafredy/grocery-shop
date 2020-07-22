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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    vendorId: {
      type: DataTypes.UUID,
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
  };

  return Grocery;
};
