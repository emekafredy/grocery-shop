export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Grocery, {
      as: 'groceries',
      foreignKey: 'categoryId'
    });
  };

  return Category;
};
